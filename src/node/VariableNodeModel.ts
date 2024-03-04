import { DeserializeEvent, NodeModel } from '@projectstorm/react-diagrams';
import { CustomPortModel } from '../port/CustomPortModel';
// import { DiamondPortModel } from './CustomPortModel';

export enum VariablePortType {
  INPUT = "input",
  OUTPUT = "output"
}

export class VariableNodeModel extends NodeModel {
  static type = "variable";
  name?: string;
  size:number;

	constructor(name?: string, size?:number) {
		super({
			type: VariableNodeModel.type,
		});

    this.name = name || "";
    this.size = size || 1;

    let inPort = new CustomPortModel(VariablePortType.INPUT);
    let outPort = new CustomPortModel(VariablePortType.OUTPUT);
    
    this.addPort(inPort);
    this.addPort(outPort);
	}

  private getPortByType(type:VariablePortType) {
    const port = this.getPort(type);
    if(!port) {
      throw new Error(`Cannot find ${type} port from variable node : ${this}`);
    }
    return port;
  }

  getOutputPort() {
    return this.getPortByType(VariablePortType.OUTPUT);
  }

  getInputPort() {
    return this.getPortByType(VariablePortType.INPUT);
  }

	serialize() {
		return {
			...super.serialize(),
      name:this.name,
      size:this.size
		}
	}

  changeSize(size:number) {
    for(let i=0; i<this.size; ++i) {
      const inPort = this.getPort(`${VariablePortType.INPUT}_${i}`);
      const outPort = this.getPort(`${VariablePortType.INPUT}_${i}`);
      if(!inPort || !outPort) {
        throw new Error(`Cannot change variable node size because port is not found in Variable Port : ${this}`);
      }
      this.removePort(inPort);
      this.removePort(outPort);
    }
    this.size = size;
    for(let i=0; i<this.size; ++i) {
      let inPort = new CustomPortModel(`${VariablePortType.INPUT}_${i}`);
      let outPort = new CustomPortModel(`${VariablePortType.OUTPUT}_${i}`);
      this.addPort(inPort);
      this.addPort(outPort);
    }
  }
	
  deserialize(event: DeserializeEvent<this>): void {
    super.deserialize(event);
    this.name = event.data.name;
    this.size = event.data.size;
  }
}