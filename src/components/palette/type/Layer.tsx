import { ActivationType, LayerNodeModel, LayerType } from "../../../node/LayerNodeModel";
import { useCanvasStore } from "../../../store/CanvasStore";
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
  onClick:Function;
}

export default function Layer(prop:LayerProp) {
  const engine = useCanvasStore((state) => (state.engine));
  return <ItemWrap onClick={() => {
    prop.onClick(new LayerNodeModel({
      "activation":ActivationType.SIGMOID,
      "inputNum":3,
      "outputNum":3,
      "type":LayerType.LINEAR,
      "name":"Layer"
    }));
    engine.getEngine().repaintCanvas();
  }}>
    {NodeSVG}
  </ItemWrap>
}