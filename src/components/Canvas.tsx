import styles from "./Canvas.module.css";

import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";

import { CanvasWidget } from "@projectstorm/react-canvas-core";

import CustomNodeExample from "../node-example";

export default function Canvas() {
  const engine = createEngine();
  // node 1
  const node1 = new DefaultNodeModel({
    name: "Node 1",
    color: "rgb(0,192,255)",
    extras:{
      "activateFunction":"ReLU"
    }
  });
  node1.setPosition(100, 100);
  let port1 = node1.addOutPort("Out");
  // node 2
  const node2 = new DefaultNodeModel({
    name: "Node 2",
    color: "rgb(0,192,255)",
  });
  node2.setPosition(100, 100);
  let port2 = node2.addOutPort("Out");
  // link them and add a label to the link
  const link = port1.link<DefaultLinkModel>(port2);
  link.addLabel("Hello World!");
  const model = new DiagramModel();
  model.addAll(node1, node2, link);

  console.log(model.getNodes());
  console.log("Links");
  console.log(model.getLinks());
  engine.setModel(model);
  // return <CanvasWidget className={styles.canvas} engine={engine} />;
  return <CustomNodeExample className={styles.canvas}/>
}