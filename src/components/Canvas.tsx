import { CanvasWidget } from "@projectstorm/react-canvas-core";
// import CustomNodeExample from "../node-example";
import styled from "@emotion/styled";
import { LayerNodeFactory } from "../node/LayerNodeFactory";
import { CustomPortFactory } from "../port/CustomPortFactory";
import { ActivationType, LayerNodeModel, LayerType } from "../node/LayerNodeModel";
import { VariableNodeFactory } from "../node/VariableNodeFactory";
import { VariableNodeModel } from "../node/VariableNodeModel";
import { useCanvasStore } from "../store/CanvasStore";

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

export default function Canvas() {
  // the canvas would NOT defined here, 
  // as the model are changed and should be affected by the react state.
  const engine = useCanvasStore((state) => (state.engine));
  const addNode = useCanvasStore((state) => (state.addNode));
  const deserialize = useCanvasStore((state) => (state.deserialize));
  // furthermore all of this registration of factories should be defined in global context
  // because the model is defined in global context as I mentioned before.
  engine.assignFactory(
    new LayerNodeFactory(),
    new CustomPortFactory()
  );
    
  engine.assignFactory(
    new VariableNodeFactory(),
    new CustomPortFactory()
  );

  const a = new LayerNodeModel({
    "activation":ActivationType.RELU,
    "inputNum":3,
    "outputNum":3,
    "name":"ANG",
    "type":LayerType.LINEAR
  });
  
  const b = new VariableNodeModel("test", 3);

  addNode(a);
  addNode(b);
  // deserialize 할 때 eventlistner 가 증발해버린다.
  // deserialize(JSON.stringify(ctx.serialize()));

  return <CanvasWrap engine={engine.getEngine()} />;
}
