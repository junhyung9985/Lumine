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
  layerType: LayerType;
  inputNum: number;
  outputNum: number;
  activation:ActivationType;

  getPortArray(type:LayerPortType):PortModel[] {
    const arr:PortModel[] = [];
    let length;
    
    if(type == LayerPortType.INPUT) length = this.inputNum;
    else if(type == LayerPortType.OUTPUT) length = this.outputNum;
    else length = 1;

    for(let i=0; i < length; ++i) {
      let port = this.getPort(`${i}_${type}`);
      if(port == undefined) {
        return [];
      }
      arr.push(port);
    }

    return arr;
  }

  parseIndex(id:string) {
    return parseInt(id);
  }

	constructor(param?:LayerNodeModelProp) {
		super({
			type: `layer`,
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

    for(let i=0; i<param.inputNum; ++i) {
      let port = new CustomPortModel(`${i}_${LayerPortType.INPUT}`);
      port.setMaximumLinks(1);
      this.addPort(port);
    }
    
    for(let i=0; i<param.outputNum; ++i) {
      let port = new CustomPortModel(`${i}_${LayerPortType.OUTPUT}`);
      port.setMaximumLinks(1);
      this.addPort(port);
    }

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