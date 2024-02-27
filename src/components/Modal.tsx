import styled from "@emotion/styled"
import { useModalStore } from "../store/ModalStore"
import CodeEditor from "@uiw/react-textarea-code-editor";

const ModalWindow = styled.div<{show:boolean}>`
  width:100%;
  height:100%;
  transition: none;
  display:${props => (props.show ? "flex" : "none")};
  justify-content:center;
  align-items:center;
  position:fixed;
  background:rgb(0, 0, 0, 70%);
  z-index:3;
`

const ModalContentWrapper = styled.div`
  display:flex;
  flex-direction:column;
  gap:10px;
  background:#2a2d2d;
  padding:20px;
  width:800px;
  height:600px;
  title {
    display:block;
    font-size:18px;
    font-weight:600;
  }
`;

const CodeEditorStyle = {
  fontFamily:'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
  borderRadius:"10px",
  fontSize:"15px",
  background:"#191f1f",
  width:"100%",
  height:"100%",
}

export default function Modal() {
  const isShown = useModalStore((state) => state.isShown);
  const setShow = useModalStore((state) => state.setShow);
  const modalContent = useModalStore((state) => state.modalContent);

  const handleModalBackgroundClick = () => {
    setShow(false);
  }
  const handleModalWindowClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  }
  return <ModalWindow onClick={handleModalBackgroundClick} show={isShown}>
   <ModalContentWrapper onClick={handleModalWindowClick}>
      <title>
        Generated Code
      </title>
      <div>
        ctrl(cmd) + a and copy the code!
      </div>
      <CodeEditor 
        value={modalContent}
        language="python"
        padding={15}
        style={CodeEditorStyle}
      />
    </ModalContentWrapper>
  </ModalWindow>
}