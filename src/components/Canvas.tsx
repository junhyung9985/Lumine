import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { useCanvasStore } from "../store/CanvasStore";
import styled from "@emotion/styled";

const CanvasWrap = styled(CanvasWidget)`
  height: 100%;
  width: 100%;
  background-size: 50px 50px;
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      rgba(255, 255, 255, 0.05) 25%,
      rgba(255, 255, 255, 0.05) 26%,
      transparent 27%,
      transparent 74%,
      rgba(255, 255, 255, 0.05) 75%,
      rgba(255, 255, 255, 0.05) 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      rgba(255, 255, 255, 0.05) 25%,
      rgba(255, 255, 255, 0.05) 26%,
      transparent 27%,
      transparent 74%,
      rgba(255, 255, 255, 0.05) 75%,
      rgba(255, 255, 255, 0.05) 76%,
      transparent 77%,
      transparent
    );
`;

const Wrap = styled.div`
  position:relative;
  height:100%;
  width:100%;
  min-width:0;

  & * {
    transition:none;
  }

  & > div {
    position:absolute;
    display: flex;
    width: 100%;
    height: 100%;
  }
`

export default function Canvas() {
  // the canvas would NOT defined here, 
  // as the model are changed and should be affected by the react state.
  const engine = useCanvasStore((state) => (state.engine));
  // furthermore all of this registration of factories should be defined in global context
  // because the model is defined in global context as I mentioned before.

  // deserialize 할 때 eventlistner 가 증발해버린다.
  // deserialize(JSON.stringify(ctx.serialize()));
  return <Wrap>
    <div>
      <CanvasWrap engine={engine.getEngine()} />
    </div>
  </Wrap>
}
