import styled from "@emotion/styled";
import CollapseSVG from "/collapse.svg";
import { useState } from "react";
import RunPython from "../python/run-python";
import { useCanvasStore } from "../store/CanvasStore";
import useNodeNameState from "../hooks/useNodeNameState";
import NodeSettings from "./Sidebar/NodeSettings";
import ProjectSettings from "./Sidebar/ProjectSettings";
import { Button } from "./Button";
import { useModalStore, ModalState } from "../store/ModalStore";

const Wrap = styled.div<{toggle:boolean}>`
  position:fixed;
  right:${props => props.toggle ? "0px" : "-360px"};
  background: #171919;
  height:100%;
  min-width:var(--sidebar-width);
  & > * { 
    width:260px;
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
`;

export default function Sidebar() {
  const node = useCanvasStore((state) => (state.selectedNode));
  const engine = useCanvasStore((state) => (state.engine));
  const setShow = useModalStore((state) => (state.setShow));
  const setModalContent = useModalStore((state)=>state.setModalContent);
  const setModalState = useModalStore((state) => (state.setModalState));

  const [collapse, setCollapse] = useState<boolean>(true);

  const {name, setName} = useNodeNameState();

  const handleCollapseToggle = () => {
    setCollapse(!collapse);
  }

  const handleGenerateButtonClick = async () => {
    setModalState(ModalState.PENDING);
    setShow(true);

    try {
      setModalContent(await RunPython(engine.getModel().serialize()));
    }
    catch (e) {
      console.error(e);
      setModalState(ModalState.ERROR);
      setModalContent(e as string);
      throw new Error(e as string);
    }

    setModalState(ModalState.SUCCESS);
  }

  return <>
    <GenerateCodeButton toggle={collapse} onClick={handleGenerateButtonClick}>
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

