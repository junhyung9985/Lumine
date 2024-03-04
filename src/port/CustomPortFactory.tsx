import { DiagramEngine, PortModel } from '@projectstorm/react-diagrams';
import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { CustomPortModel } from './CustomPortModel';

export class CustomPortFactory extends AbstractModelFactory<PortModel, DiagramEngine> {
	cb: (initialConfig?: any) => PortModel;

	constructor() {
		super("custom_port");
		this.cb = () => new CustomPortModel("default");
	}

	generateModel(event:any): PortModel {
		return this.cb(event.initialConfig);
	}
}