// DefaultNodeWidget 을 갖다 쓰려면 그쪽에서 정의한 InPort OutPort 까지 전부 갖다 써야함
// 상당히 귀찮은 점이 되기 때문에 어쩔 수 없이 새로 구현해야한다.

import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';
import { VariableNodeModel } from './VariableNodeModel';
import styled from "@emotion/styled";

export interface VariableNodeProps {
  node: VariableNodeModel;
	engine: DiagramEngine;
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  
  min-width:100px;
  align-items: stretch;
`;

const Port = styled.div<{ isInput: boolean }>`
  border-radius: ${(prop) => (prop.isInput ? "0 50% 50% 0" : "50% 0 0 50%")};
  background: ${(prop) => (prop.isInput ? "#c7c7c7" : "#7d7d7d")};
  width: 15px;
  height: 15px;
  align-self: center;
`;

const Body = styled.div<{ activated: boolean; }>`
  display: flex;
  align-self: stretch;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  background: gray;
  color: white;
  
  border: 2px solid ${(props) => (props.activated ? "white" : "black")};
  border-radius: 5px;

  & > .title {
    background-color: rgb(0 0 0 / 30%);
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
  }

  & > .name {
    display:flex;
    align-items:center;
    justify-content:center;
    min-height:30px;
    padding: 10px;
  }
`;


export function VariableNodeWidget(props:VariableNodeProps) {
  const inputPort = props.node.getInputPort();
  const outputPort = props.node.getOutputPort();
  return <Wrap>
    <Body
      activated={props.node.isSelected()}
    >
      <div className="title">
        <PortWidget port={inputPort} engine={new DiagramEngine()}>
          <Port isInput={true} />
        </PortWidget>
        <div>
          {props.node.size}
        </div>
        
        <PortWidget port={outputPort} engine={new DiagramEngine()}>
          <Port isInput={false} />
        </PortWidget>
      </div>
      <div className="name">{props.node.name}</div>
    </Body>
  </Wrap>
}