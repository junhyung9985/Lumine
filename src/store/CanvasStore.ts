import { create } from "zustand";
import createEngine, {
  NodeModel,
  DiagramModel,
  DiagramEngine,
  AbstractReactFactory,
  AbstractModelFactory,
  PortModel,
  DeleteItemsAction,
} from "@projectstorm/react-diagrams";
import { LayerNodeFactory } from "../node/LayerNodeFactory";
import { CustomPortFactory } from "../port/CustomPortFactory";
import { VariableNodeFactory } from "../node/VariableNodeFactory";

// class GraphCodeModel {
//   /**
//    * gonna add multi model management system, later on
//    *
//    *
//    * GraphCodeModel might have features written below.
//    *
//    * 1. do automatically add all factories where the factories are.
//    */
//   currentModel: DiagramModel;
//   constructor(model?: DiagramModel) {
//     if (model) this.currentModel = model;
//     else this.currentModel = new DiagramModel();

//     this.currentModel.clearListeners();
//   }
//   getModel() {
//     return this.currentModel;
//   }
//   addNode(node: NodeModel, pos?: { x: number; y: number }) {
//     if (pos) {
//       node.setPosition(pos.x, pos.y);
//     }
//     this.currentModel.addNode(node);
//   }
// }

export class GraphCodeCanvas {
  private static engine: DiagramEngine | null = null;
  constructor() {
    this.getEngine();
  }

  getEngine() {
    if (!GraphCodeCanvas.engine) {
      GraphCodeCanvas.engine = createEngine();
      // q키를 눌러 삭제
      GraphCodeCanvas.engine.getActionEventBus().registerAction(new DeleteItemsAction({ keyCodes: [81] }));
      GraphCodeCanvas.engine.getActionEventBus().deregisterAction(new DeleteItemsAction());
      GraphCodeCanvas.engine.setModel(new DiagramModel());
    }
    return GraphCodeCanvas.engine;
  }

  getModel() {
    return this.getEngine().getModel();
  }

  setModel(model:DiagramModel) {
    this.getEngine().setModel(model);
  }

  assignFactory(
    nodeFactory: AbstractReactFactory<NodeModel, DiagramEngine>,
    portFactory: AbstractModelFactory<PortModel, DiagramEngine>
  ) {
    // do automatically assign fatotries.
    this.getEngine().getNodeFactories().registerFactory(nodeFactory);
    this.getEngine().getPortFactories().registerFactory(portFactory);
  }
}

// defining store persuming that we manage only one model.
type CanvasStore = {
  engine: GraphCodeCanvas;
  selectedNode?: NodeModel;
  setModel: (model: DiagramModel) => void;
  selectNode: (node?:NodeModel) => void;
  addNode: (node: NodeModel) => void;
  deserialize: (dataStr: string) => void;
};

function initEngine() {
  const engine = new GraphCodeCanvas();
  
  engine.assignFactory(
    new LayerNodeFactory(),
    new CustomPortFactory()
  );
    
  engine.assignFactory(
    new VariableNodeFactory(),
    new CustomPortFactory()
  );

  return engine;
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  engine: initEngine(),
  setModel: (model) =>
    set((state) => {
      state.engine.setModel(model);  
      return {...state}
    }),
  
  selectNode: (node) => {
    set(() => ({selectedNode:node}))
  },

  addNode: (node) => {
    node.registerListener({
      selectionChanged() {
        set(() => ({
          selectedNode: node,
        }));
      },
    });
    set((state) => {
      state.engine.getModel().addNode(node);
      return { ...state };
    });
  },
  deserialize: (dataStr) => {
    const data = JSON.parse(dataStr);
    set((state) => {
      const model = new DiagramModel();
      model.deserializeModel(data, state.engine.getEngine());
      model.getNodes().forEach((value) => {
        value.registerListener({
          selectionChanged() {
            set(() => ({
              selectedNode: value,
            }));
          },
        });
      });
      state.engine.setModel(model);
      return { ...state };
    });
  },
}));
