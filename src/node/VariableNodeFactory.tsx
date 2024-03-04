import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { VariableNodeModel } from './VariableNodeModel';
import { VariableNodeWidget } from './VariableNodeWidget';

export class VariableNodeFactory extends AbstractReactFactory<VariableNodeModel, DiagramEngine> {
	constructor() {
		super("variable");
	}

	generateReactWidget(event:GenerateWidgetEvent<VariableNodeModel>): JSX.Element {
		return <VariableNodeWidget node={event.model} engine={this.engine} />;
	}

	generateModel(event:any) {
		return new VariableNodeModel();
	}
}