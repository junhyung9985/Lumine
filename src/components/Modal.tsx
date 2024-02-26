import styled from "@emotion/styled"
import { useModalStore } from "../store/ModalStore"

const ModalWindow = styled.div<{show:boolean}>`
  width:100%;
  height:100%;
  transition: none;
  display:${props => (props.show ? "flex" : "none")};
  position:fixed;
  background:rgb(0, 0, 0, 70%);
  z-index:3;
`

export default function Modal() {
  const isShown = useModalStore((state) => state.isShown);
  const setShow = useModalStore((state) => state.setShow);
  const handleModalClick = () => {
    setShow(false);
  }
  return <ModalWindow onClick={handleModalClick} show={isShown}>
    Hello world!
  </ModalWindow>
}