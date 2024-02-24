import styled from "@emotion/styled";
import CollapseSVG from "/collapse.svg";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import Button from "./Button";

import { NodeModel } from "@projectstorm/react-diagrams";
import RunPython from "../python/run-python-test";

import { useCanvasStore } from "../store/CanvasStore";
import { LayerNodeModel } from "../node/LayerNodeModel";
import { VariableNodeModel } from "../node/VariableNodeModel";
import LayerNodeSidebar from "./sidebar/LayerNodeSidebar";
import VariableNodeSidebar from "./sidebar/VariableNodeSidebar";

export default function Sidebar() {
  const ctx = useCanvasStore((state) => (state.engine)).getEngine();
  const node = useCanvasStore((state) => (state.selectedNode));
  const model = useCanvasStore((state) => (state.engine)).getModel();
  const [collapse, setCollapse] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  

  function toggleCollapse() {
    setCollapse(!collapse);
  }

  const handleNameChange:ChangeEventHandler<HTMLInputElement> = (e) => {
    if(!node) return;
    (node as VariableNodeModel).name = e.target.value;
    setName(e.target.value);
  }

  

  useEffect(() => {
    ctx.repaintCanvas();
  }, [name]);

  useEffect(() => {
    if(node) {
      setName((node as LayerNodeModel).name);
      node.setLocked(false);
    }
  }, [node]);

  return <>

    <GenerateCodeButton toggle={collapse} onClick={() => (RunPython(model.serialize()))}>
      Generate Code!
    </GenerateCodeButton>

    <Wrap toggle={collapse}>
      <div>
        <CollapseButton onClick={toggleCollapse} toggle={collapse} src={CollapseSVG} />
      </div>
      {
        !node ? null : <>
          <title>
            Node Attributes
          </title>
          <NodeSettings>
            {node.getType()}
            {
              !node ? "" : <div>
              <title>
                Name
              </title>
              <input type="text" name="setName" id="setname" value={name} onFocus={() => (node.setLocked(true))} onBlur={() => (node.setLocked(false))} onChange={handleNameChange} />
            </div>
            }
            {
              node?.getType() !== LayerNodeModel.type ? "" :
              <LayerNodeSidebar node={node as LayerNodeModel}/>
            }
            {
              node?.getType() !== VariableNodeModel.type ? "" :
              <VariableNodeSidebar node={node as VariableNodeModel}/>
            }
          </NodeSettings>
        </>
      }
      <div>
        <title>
          Project Settings
        </title>
      </div>
    </Wrap>
  </>
}

const Wrap = styled.div<{toggle:boolean}>`
  position:fixed;
  right:${props => props.toggle ? "0px" : "-360px"};
  background: #171919;
  height:100%;
  min-width:var(--sidebar-width);
  & > * { 
    padding: 0 20px;
    padding-top: 20px;
  }
  title {
    display:block;
    font-size:20px;
  }
  subtitle {
    display:block;
    font-size:18px;
  }
  input, select {
    background:transparent;
    border:none;
    border-bottom:1px solid #505050;
  }
  input:focus-visible, select:focus-visible {
    outline:none;
    border:none;
    border-bottom:1px solid #75dfb8;
  }
`;

const CollapseButton = styled.img<{toggle:boolean}>`
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

const GenerateCodeButton = styled(Button)<{toggle:boolean}>`
  position:absolute;
  right:${props => (props.toggle ? "310px" : "10px")};
  bottom:10px;
`

const NodeSettings = styled.div`
  & > * {
    padding-top:5px;
    padding-bottom:5px;
  }
  title {
    font-size:18px !important;
    margin-top: 10px;
  }
`