import styled from "@emotion/styled";
import CollapseSVG from "/collapse.svg";
import { useState } from "react";
import RunPython from "../python/run-python-test";
import { useCanvasStore } from "../store/CanvasStore";
import useNodeNameState from "../hooks/useNodeNameState";
import NodeSettings from "./Sidebar/NodeSettings";
import ProjectSettings from "./Sidebar/ProjectSettings";

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

const GenerateCodeButton = styled.div<{toggle:boolean}>`
  cursor:pointer;
  border-radius:5px;
  padding:10px 10px;
  background-color:#3B4E47;
  position:absolute;
  right:${props => (props.toggle ? "310px" : "10px")};
  bottom:10px;

  &:hover {
    background-color:#161b19;
  }
`;

export default function Sidebar() {
  const node = useCanvasStore((state) => (state.selectedNode));
  const model = useCanvasStore((state) => (state.engine)).getModel();
  const [collapse, setCollapse] = useState<boolean>(false);

  const {name, setName} = useNodeNameState();

  const handleCollapseToggle = () => {
    setCollapse(!collapse);
  }

  return <>
    <GenerateCodeButton toggle={collapse} onClick={() => (RunPython(model.serialize()))}>
      Generate Code!
    </GenerateCodeButton>

    <Wrap toggle={collapse}>
      <div>
        <CollapseButton onClick={handleCollapseToggle} toggle={collapse} src={CollapseSVG} />
      </div>
      <NodeSettings node={node} name={name} setName={setName} />
      <ProjectSettings />
    </Wrap>
  </>
}

