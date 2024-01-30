import { DiamondNodeWidget } from './CustomNodeWidget';
import { DiamondNodeModel } from './CustomNodeModel';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams';

export class DiamondNodeFactory extends AbstractReactFactory<DiamondNodeModel, DiagramEngine> {
	constructor() {
		super('diamonda');
	}

	generateReactWidget(event:any): JSX.Element {
		return <DiamondNodeWidget engine={this.engine} size={50} node={event.model} />;
	}

	generateModel(event:any) {
		return new DiamondNodeModel();
	}
}