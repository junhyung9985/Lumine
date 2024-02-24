import { ChangeEventHandler, useEffect, useState } from "react";
import { useCanvasStore } from "../../store/CanvasStore";
import styled from "@emotion/styled";
import { VariableNodeModel } from "../../node/VariableNodeModel";

interface VariableNodeSidebarProps {
  node: VariableNodeModel
}

export default function VaraibleNodeSidebar(param: VariableNodeSidebarProps) {
  const engine = useCanvasStore((state) => (state.engine)).getEngine();
  const [size, setSize] = useState<number>(0);

  const { node } = param;

  useEffect(() => {
    engine.repaintCanvas();
  }, [size]);

  useEffect(() => {
    setSize(node.size);
  }, [node]);

  const handleSizeChange:ChangeEventHandler<HTMLInputElement> = (e) => {
    node.size = e.target.valueAsNumber;
    setSize(e.target.valueAsNumber);
  }

  return (
    <div>
      <title>
        Variable Size
      </title>
      <input type="number" value={size} onChange={handleSizeChange}/>
    </div>
  );
}