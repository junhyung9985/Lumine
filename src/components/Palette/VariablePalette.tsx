import styled from "@emotion/styled";
import { VariableNodeModel } from "../../node/VariableNodeModel";
import { useCanvasStore } from "../../store/CanvasStore";
import { ItemWrap } from "./ItemWrap";

const VariableItemWrap = styled(ItemWrap)`
  font-size: 30px;
  position: relative;
  top: -3px;
`;

export default function VariablePalette() {
  const addNode = useCanvasStore((state) => state.addNode);
  const engine = useCanvasStore((state) => (state.engine));

  const handleClick = () => {
    addNode(new VariableNodeModel("Variable", 1));
    engine.getEngine().repaintCanvas();
  }

  return <VariableItemWrap onClick={handleClick}>
    𝑥
  </VariableItemWrap>;
}