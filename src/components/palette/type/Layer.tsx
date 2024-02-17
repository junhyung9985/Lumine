import { GraphCodeCanvas } from "../../../model";
import { ItemWrap } from "../ItemWrap";

const NodeSVG = (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 25V1H25V25H1Z" stroke="#D9D9D9" />
  </svg>
);

interface LayerProp {
  canvas:GraphCodeCanvas
}

export default function Layer(prop:LayerProp) {
  return <ItemWrap>
    {NodeSVG}
  </ItemWrap>
}