import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { LayerNodeModel } from './LayerNodeModel';
import { LayerNodeWidget } from './LayerNodeWidget';

export class LayerNodeFactory extends AbstractReactFactory<LayerNodeModel, DiagramEngine> {
	constructor() {
		super("layer");
	}

	generateReactWidget(event:GenerateWidgetEvent<LayerNodeModel>): JSX.Element {
		return <LayerNodeWidget node={event.model} engine={this.engine} />;
	}

	generateModel(event:any) {
		return new LayerNodeModel();
	}
}