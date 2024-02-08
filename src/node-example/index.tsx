import createEngine, { DefaultNodeModel, DiagramModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import * as React from 'react';
// import the custom models
import { DiamondNodeModel } from './CustomNodeModel';
import { DiamondNodeFactory } from './CustomNodeFactory';
import { SimplePortFactory } from './SimplePortFactory';
import { DiamondPortModel } from './CustomPortModel';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { VariableNodeModel } from '../node/VariableNodeModel';
import { VariableNodeFactory } from '../node/VariableNodeFactory';
import { CustomPortModel } from '../port/CustomPortModel';
import { CustomPortFactory } from '../port/CustomPortFactory';
import { LayerNodeFactory } from '../node/LayerNodeFactory';
import { ActivationType, LayerNodeModel, LayerType } from '../node/LayerNodeModel';

interface CustomCanvasProp {
	className?:string;
}

export default function CustomNodeExample(props:CustomCanvasProp) {
	//1) setup the diagram engine
	var engine = createEngine();

	// register some other factories as well
	engine
		.getPortFactories()
		.registerFactory(new SimplePortFactory('diamond', () => new DiamondPortModel(PortModelAlignment.LEFT)));
	engine.getNodeFactories().registerFactory(new DiamondNodeFactory());

	engine.getPortFactories().registerFactory(new CustomPortFactory("custom_port", ()=> new CustomPortModel("default")));
	engine.getNodeFactories().registerFactory(new VariableNodeFactory());
	engine.getNodeFactories().registerFactory(new LayerNodeFactory());

	//2) setup the diagram model
	var model = new DiagramModel();

	//3-A) create a default node
	var node1 = new DefaultNodeModel('Node 1', 'rgb(0,192,255)');
	node1.setPosition(100, 200);
	//3-B) create our new custom node

	//3-C) link the 2 nodes together


	// 잠그기도 가능.
	// link1?.setLocked(true);
	// link2?.setLocked(true);
	// link3?.setLocked(true);
	// link4?.setLocked(true);
	//4) add the models to the root graph

	let node_1 = new VariableNodeModel("test in", true);

	let node_2 = new VariableNodeModel("test out", false);
	// if(link1 && link2 && link3 && link4) 
	// 	model.addAll(node1, node2, node3, node4, link3, link4, node5, node_1, node_2, new VariableNodeModel("test out2", true));

	model.addAll(node_1, node_2, new VariableNodeModel("test2", false), new LayerNodeModel({name:"Layer 3", type:LayerType.LINEAR, activation:ActivationType.RELU, inputNum:2, outputNum:5}));
	//5) load model into engine
	// engine.setModel(model);
	let testData = JSON.stringify(model.serialize());
	console.log("모델의 링크 갯수")
	console.log("before serialize");
	console.log(model.serialize());
	model.deserializeModel(JSON.parse(testData), engine);
	console.log("after serialize");
	console.log(model.serialize());
	engine.setModel(model);
	//6) render the diagram!
	
	return (
		<CanvasWidget className={props.className} engine={engine} />
	)
}