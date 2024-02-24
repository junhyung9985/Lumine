import styled from "@emotion/styled";
import Variable from "./type/Variable";
import Layer from "./type/Layer";
import { useCanvasStore } from "../../store/CanvasStore";

const Wrap = styled.div`
  padding: 0px 40px;
  display: flex;
  border: solid 1px 0px #404040;
  gap: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export default function Palette() {
  const addNode = useCanvasStore((state) => (state.addNode));
  
  return (
    <Wrap>
      <Layer onClick={addNode} />
      <Variable onClick={addNode}/>
    </Wrap>
  );
}
