import { ChangeEvent, useEffect, useState } from "react";
import { ActivationType, LayerNodeModel } from "../../../node/LayerNodeModel";
import { useCanvasStore } from "../../../store/CanvasStore";
import styled from "@emotion/styled";

interface LayerNodeSidebarProps {
  node: LayerNodeModel;
}

const ActivationTypeView = [
  {
    name: "Sigmoid",
    value: ActivationType.SIGMOID,
  },
  {
    name: "Relu",
    value: ActivationType.RELU,
  },
  {
    name: "Soft-max",
    value: ActivationType.SOFTMAX,
  },
];

export default function LayerNodeSidebar(param: LayerNodeSidebarProps) {
  const engine = useCanvasStore((state) => state.engine).getEngine();
  const { node } = param;
  const [type, setType] = useState<ActivationType>(node.activation);
  const [inputSize, setInputSize] = useState<number>(0);
  const [outputSize, setOutputSize] = useState<number>(0);

  const handleSizeChange = (
    type: "input" | "output",
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (type == "input") {
      node.inputNum = e.target.valueAsNumber;
      setInputSize(e.target.valueAsNumber);
    } else {
      node.outputNum = e.target.valueAsNumber;
      setOutputSize(e.target.valueAsNumber);
    }
  };

  useEffect(() => {
    node.activation = type;
    engine.repaintCanvas();
  }, [type]);

  useEffect(() => {
    engine.repaintCanvas();
  }, [inputSize, outputSize]);

  useEffect(() => {
    setInputSize(node.inputNum);
    setOutputSize(node.outputNum);
  }, [node]);

  return (
    <Wrap>
      <div>
        <title>
          Input Size
        </title>
        <input
          type="number"
          name="setInputSize"
          id="setinputsize"
          onFocus={() => node.setLocked(true)}
          onBlur={() => node.setLocked(false)}
          value={inputSize}
          onChange={(e) => handleSizeChange("input", e)}
        />
      </div>
      <div>
        <title>
          Output Size
        </title>
        <input
          type="number"
          name="setOutputSize"
          id="setoutputsize"
          onFocus={() => node.setLocked(true)}
          onBlur={() => node.setLocked(false)}
          value={outputSize}
          onChange={(e) => handleSizeChange("output", e)}
        />
      </div>
      <div>
        <title>
          Node Type
        </title>
        <select
          name="activation-type"
          id="activation-type"
          onChange={(e) => setType(e.target.value as ActivationType)}
          defaultValue={node.activation}
        >
          {ActivationTypeView.map((value) => {
            return (
              <option
                value={value.value}
                key={value.name}
              >
                {value.name}
              </option>
            );
          })}
        </select>
      </div>
      
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
