import styled from "@emotion/styled";
import { ItemWrap } from "../ItemWrap";
import { GraphCodeCanvas } from "../../../model";
import { VariableNodeModel } from "../../../node/VariableNodeModel";

const VariableItemWrap = styled(ItemWrap)`
  font-size: 30px;
  position: relative;
  top: -3px;
`;

interface VariableProp {
  canvas:GraphCodeCanvas;
}

export default function Variable(prop:VariableProp) {
  const clickEventHandler = () => {
    prop.canvas.getModel().addNode(new VariableNodeModel("variable", true));
  };
  return <VariableItemWrap onClick={clickEventHandler}>𝑥</VariableItemWrap>;
}
