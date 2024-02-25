import { useEffect, useState } from "react";
import { useCanvasStore } from "../store/CanvasStore";
import { LayerNodeModel } from "../node/LayerNodeModel";

export default function useNodeNameState() {
  const [name, setName] = useState<string>("");

  const engine = useCanvasStore((state) => (state.engine)).getEngine();
  const node = useCanvasStore((state) => (state.selectedNode));

  useEffect(() => {
    engine.repaintCanvas();
  }, [name]);

  useEffect(() => {
    if(node) {
      setName((node as LayerNodeModel).name);
      node.setLocked(false);
    }
  }, [node]);

  return {name, setName};
}