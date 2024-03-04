// 일단 그냥 쓰진 않고, 포트에 특정 정보가 필요하게 된다면 그때 사용하도록 한다.

import { LinkModel, PortModel, DefaultLinkModel, PortModelAlignment, PortModelGenerics } from '@projectstorm/react-diagrams';



export class CustomPortModel extends PortModel {
	constructor(name:string) {
		super({
			type:"custom_port",
			name,
			alignment:PortModelAlignment.TOP,
			maximumLinks:1,
		});
		
	}
	
	canLinkToPort(port: PortModel<PortModelGenerics>): boolean {
		// 연결하고자하는 두포트가 같은 노드일 경우
		if(port.getNode().getID() == this.getNode().getID()) return false;

		// 한 포트에 두개 이상의 연결점이 들어가는 경우
		if(Object.keys(this.getLinks()).length > 1 || Object.keys(port.getLinks()).length > 0) {
			
			return false;
		}
		else return true;
	}

	createLinkModel(): LinkModel {
		return new DefaultLinkModel({
			color:"#48d19f",
			curvyness:10,
			width:3,
		});
	}
}