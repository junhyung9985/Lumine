import { DeserializeEvent, NodeModel } from '@projectstorm/react-diagrams';
import { CustomPortModel } from '../port/CustomPortModel';
// import { DiamondPortModel } from './CustomPortModel';

export enum VariablePortType {
  INPUT = "input",
  OUTPUT = "output"
}

export class VariableNodeModel extends NodeModel {
  name?: string;
  isInput: boolean;

	constructor(name?: string, isInput?: boolean) {
		super({
			type: "variable",
		});

    const rerender = isInput == undefined;

    if(name) this.name = name;

    if(isInput != undefined) this.isInput = isInput;
    else this.isInput = true;

    if(!rerender) {
      let port = new CustomPortModel(isInput ? VariablePortType.INPUT : VariablePortType.OUTPUT);
      port.setMaximumLinks(1);
      this.addPort(port);
      this.addPort(port);
    }
    
	}

	serialize() {
		return {
			...super.serialize(),
      name:this.name,
      isInput:this.isInput,
		}
	}
	
  deserialize(event: DeserializeEvent<this>): void {
    super.deserialize(event);
    this.name = event.data.name;
    this.isInput = event.data.isInput;
  }
}