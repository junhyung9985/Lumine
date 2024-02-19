import styled from "@emotion/styled";
import CollapseSVG from "/collapse.svg";
import { ChangeEventHandler, useEffect, useState } from "react";
import Button from "./Button";
import { NodeModel } from "@projectstorm/react-diagrams";
import { useCanvasStore } from "../store/CanvasStore";
import { ActivationType, LayerNodeModel, LayerType } from "../node/LayerNodeModel";
import { VariableNodeModel } from "../node/VariableNodeModel";

namespace S {
  export const wrap = styled.div<{toggle:boolean}>`
    position:fixed;
    right:${props => props.toggle ? "0px" : "-360px"};
    background: #171919;
    height:100%;
    min-width:var(--sidebar-width);
    & > * { 
      padding-left:20px;
      padding-top:20px;
    }
    title {
      display:block;
      font-size:20px;
    }
  `;

  export const collapseBtn = styled.img<{toggle:boolean}>`
    cursor:pointer;
    width:16px;
    transition:all ease-in-out 300ms;
    position:relative;
    right:0px;
    ${props => (
      props.toggle ? "" :
      {
        right:"120px",
        transform:"rotate(180deg)"
      }
    )}
    &:hover {
      filter: brightness(2);
    }
  `;
  
  export const button = styled(Button)<{toggle:boolean}>`
    position:absolute;
    right:${props => (props.toggle ? "310px" : "10px")};
    bottom:10px;
  `
}

export default function Sidebar() {
  const ctx = useCanvasStore((state) => (state.engine)).getEngine();
  const selectedNode = useCanvasStore((state) => (state.selectedNode));
  const model = useCanvasStore((state) => (state.engine)).getModel();
  const [collapse, setCollapse] = useState<boolean>(false);
  
  function toggleCollapse() {
    setCollapse(!collapse);
  }

  const handleNameChange:ChangeEventHandler<HTMLInputElement> = (e) => {
    if(!selectedNode) return;
    console.log(e.target.value);
    (selectedNode as VariableNodeModel).name = "_" + "aa";
    ctx.repaintCanvas();
  }

  return <>
    <S.button toggle={collapse} onClick={() => (console.log(model.serialize()))}>
      Generate Code!
    </S.button>
    <S.wrap toggle={collapse}>
      <div>
        <S.collapseBtn onClick={toggleCollapse} toggle={collapse} src={CollapseSVG} />
      </div>
      <div>
        <title>
          {selectedNode ? selectedNode.getType() : "none"}
        </title>
        <div>
          setName :
          <input type="text" name="setName" id="setname" onChange={handleNameChange} />
        </div>
      </div>
      <div>
        <title>
          Project Settings
        </title>
        {!selectedNode ? "" :
          (selectedNode as LayerNodeModel).layerType
        }
        <div onClick={() => {(selectedNode as LayerNodeModel).activation = ActivationType.SOFTMAX; ctx.repaintCanvas();}}>
          Change to SOFTMAX!
        </div>
        <div onClick={() => {(selectedNode as LayerNodeModel).activation = ActivationType.SIGMOID; ctx.repaintCanvas();}}>
          Change to SIGMOID!
        </div>
        <div onClick={() => {(selectedNode as LayerNodeModel).activation = ActivationType.RELU; ctx.repaintCanvas();}}>
          Change to RELU!
        </div>
        <div onClick={() => {(selectedNode as VariableNodeModel).isInput = !(selectedNode as VariableNodeModel).isInput; ctx.repaintCanvas();}}>
          switch INPUT / OUTPUT!
        </div>
      </div>
    </S.wrap>
  </>
}