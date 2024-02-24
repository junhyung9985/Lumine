import { DeserializeEvent, NodeModel, PortModel } from '@projectstorm/react-diagrams';
import { CustomPortModel } from '../port/CustomPortModel';

export enum LayerPortType {
  INPUT = "input",
  OUTPUT = "output"
}

export enum ActivationType {
  UNDEFINED = "undefined",
  SIGMOID = "sigmoid",
  RELU = "relu",
  SOFTMAX = "softmax"
}

export enum LayerType {
  UNDEFINED = "undefined",
  LINEAR = "linear",
}

export interface LayerNodeModelProp {
  name: string,
  type: LayerType,
  inputNum: number,
  outputNum : number,
  activation: ActivationType
}

export class LayerNodeModel extends NodeModel {
  name: string;
  static type = "layer";
  layerType: LayerType;
  inputNum: number;
  outputNum: number;
  activation:ActivationType;

  getInputPort():PortModel {
    const port = this.getPort(LayerPortType.INPUT);
    if(!port) {
      throw new Error("LayerNodeModel : No Input Port.");
    }
    else {
      return port;
    }
  }

  getOutputPort():PortModel {
    const port = this.getPort(LayerPortType.OUTPUT);
    if(!port) {
      throw new Error("LayerNodeModel : No Output Port.");
    }
    else {
      return port;
    }
  }

  parseIndex(id:string) {
    return parseInt(id);
  }

	constructor(param?:LayerNodeModelProp) {
		super({
			type: LayerNodeModel.type,
		});

    if(param == undefined) {
      this.name = "undefined";
      this.layerType = LayerType.UNDEFINED;
      this.inputNum = 0;
      this.outputNum = 0;
      this.activation = ActivationType.UNDEFINED;
      return;
    }
    if(param.inputNum < 0 || param.outputNum < 0) {
      throw Error("inputNum or outputNum should be over 0.");
    } 

    this.name = param.name;
    this.layerType = param.type;
    this.inputNum = param.inputNum;
    this.outputNum = param.outputNum;
    this.activation = param.activation;
    this.addPort(new CustomPortModel(LayerPortType.INPUT));
    this.addPort(new CustomPortModel(LayerPortType.OUTPUT));

	}

	serialize() {
		return {
			...super.serialize(),
      name:this.name,
      layerType:this.layerType,
      inputNum:this.inputNum,
      outputNum: this.outputNum,
      activation : this.activation
		}
	}
	
  deserialize(event: DeserializeEvent<this>): void {
    super.deserialize(event);
    this.name = event.data.name;
    this.layerType = event.data.layerType;
    this.inputNum = event.data.inputNum;
    this.outputNum = event.data.outputNum;
    this.activation = event.data.activation;
  }
}