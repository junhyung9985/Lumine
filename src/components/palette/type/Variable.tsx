import styled from "@emotion/styled";
import { ItemWrap } from "../ItemWrap";
import { VariableNodeModel } from "../../../node/VariableNodeModel";
import { useCanvasStore } from "../../../store/CanvasStore";

const VariableItemWrap = styled(ItemWrap)`
  font-size: 30px;
  position: relative;
  top: -3px;
`;

interface VariableProp {
  onClick:Function;
}

export default function Variable(prop:VariableProp) {
  const engine = useCanvasStore((state) => (state.engine));
  return <VariableItemWrap onClick={() => {
    prop.onClick(new VariableNodeModel("Variable", true));
    engine.getEngine().repaintCanvas();
  }}>
    𝑥
  </VariableItemWrap>;
}