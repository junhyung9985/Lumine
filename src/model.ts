// return DiagramEngine and Model
import createEngine, {
  DiagramEngine,
  DiagramModel,
  NodeModel,
  PortModel,
  AbstractModelFactory
} from "@projectstorm/react-diagrams";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { useState } from "react";

class GraphCodeModel {
  /**
   * gonna add multi model management system, later on
   * 
   * 
   * GraphCodeModel might have features written below.
   * 
   * 1. do automatically add all factories where the factories are.
   */
  currentModel: DiagramModel;
  constructor(model?: DiagramModel) {
    if (model) this.currentModel = model;
    else this.currentModel = new DiagramModel();
    
    this.currentModel.clearListeners();
  }
  getModel() {
    return this.currentModel;
  }
  addNode(node:NodeModel, pos?:{x:number, y:number}) {
    if(pos) {
      node.setPosition(pos.x, pos.y);
    }
    this.currentModel.addNode(node);
  }
}

export function useSelectedNode() {
  const [selectedNode, setSelectedNode] = useState<NodeModel[]>([]);

  return [selectedNode, setSelectedNode];
}

export class GraphCodeCanvas {
  private static engine: DiagramEngine | null = null;
  constructor() {}

  getEngine() {
    if (!GraphCodeCanvas.engine) GraphCodeCanvas.engine = createEngine();
    return GraphCodeCanvas.engine;
  }

  setModel(model: GraphCodeModel) {
    this.getEngine().setModel(model.currentModel);
  }

  getModel() {
    if(!this.getEngine().getModel()) {
      this.setModel(new GraphCodeModel());
    }
    return this.getEngine().getModel();
  }
  
  createModel():GraphCodeModel {
    return new GraphCodeModel(new DiagramModel());
  }

  assignFactory(
    nodeFactory: AbstractReactFactory<NodeModel, DiagramEngine>,
    portFactory: AbstractModelFactory<PortModel, DiagramEngine>
  ) {
    // do automatically assign fatotries.
    this.getEngine().getNodeFactories().registerFactory(nodeFactory);
    this.getEngine().getPortFactories().registerFactory(portFactory);
  }

  serialize() {
    // parse json models.
    return this.getEngine().getModel().serialize();
  }

  deserialize(jsonData:string) {
    this.getEngine().getModel().deserializeModel(JSON.parse(jsonData), this.getEngine());
    this.getModel().getModels().forEach((value) => {
      value.registerListener({
        selectionChanged() {
          console.log("test");
        }
      })
    })
  }
}
