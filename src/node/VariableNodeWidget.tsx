// DefaultNodeWidget 을 갖다 쓰려면 그쪽에서 정의한 InPort OutPort 까지 전부 갖다 써야함
// 상당히 귀찮은 점이 되기 때문에 어쩔 수 없이 새로 구현해야한다.

import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';
import { VariableNodeModel, VariablePortType } from './VariableNodeModel';
import styled from "@emotion/styled";

export interface VariableNodeProps {
  node: VariableNodeModel;
	engine: DiagramEngine;
}

const Wrap = styled.div`
  display:flex;
  flex-direction:row;
  align-items:stretch;
`;

const PortWrapper = styled.div`
  display:flex;
  gap:5px;
  flex-direction:column;
  padding:10px 0;
`

const Port = styled.div`
  background:rgb(0, 0, 0, 0.5);
  border-radius:50%;
  width:15px;
  height:15px;
  align-self:center;
`

const Body = styled.div<{
  activated:boolean,
  isInput:boolean
}>`
  display:flex;
  background:${props => props.isInput ? "#C9D6DF" : "#1E2022"};
  color:${props => props.isInput ? "black" : "white"};
  min-width:70px;
  max-width:100px;
  border:2px solid ${props => props.activated ? "white" : "black"};
  border-radius:10px;
  padding:5px;
`

export function VariableNodeWidget(props:VariableNodeProps) {
  const inputPort = props.node.getPort(VariablePortType.INPUT);
  const outputPort = props.node.getPort(VariablePortType.OUTPUT);

  return <Wrap>
    <PortWrapper>
      {
        outputPort ?
        <PortWidget port={outputPort} engine={props.engine}>
          <Port />
        </PortWidget>
        : ""
      }
    </PortWrapper>
    
    <Body isInput={props.node.isInput} activated={props.node.isSelected()}>
      {props.node.isInput ? "Input" : "Output"}
    </Body>

    <PortWrapper>
      {
        inputPort ?
        <PortWidget port={inputPort} engine={props.engine}>
          <Port />
        </PortWidget>
        : ""
      }
    </PortWrapper>
  </Wrap>
}