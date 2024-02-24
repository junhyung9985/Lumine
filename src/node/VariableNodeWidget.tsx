// DefaultNodeWidget 을 갖다 쓰려면 그쪽에서 정의한 InPort OutPort 까지 전부 갖다 써야함
// 상당히 귀찮은 점이 되기 때문에 어쩔 수 없이 새로 구현해야한다.

import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';
import { VariableNodeModel } from './VariableNodeModel';
import styled from "@emotion/styled";

export interface VariableNodeProps {
  node: VariableNodeModel;
	engine: DiagramEngine;
}

const Wrap = styled.div<{
  activated:boolean
}>`
  display:flex;
  flex-direction:column;
  justify-content:center;
  border:2px solid ${props => props.activated ? "white" : "black"};
  border-radius:10px;
`;

const PortWrap = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 7px;
  margin-bottom: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Port = styled.div<{ isInput: boolean }>`
  border-radius: ${(prop) => (prop.isInput ? "0 50% 50% 0" : "50% 0 0 50%")};
  background: ${(prop) => (prop.isInput ? "#c7c7c7" : "#7d7d7d")};
  width: 15px;
  height: 15px;
  align-self: center;
`;

const Head = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:black;
  border-top-right-radius:8px;
  border-top-left-radius:8px;
`

const Body = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  background:#595959;
  gap:10px;
  color:white;
  min-width:70px;
  min-height:40px;
  border-radius: 0px 0px 10px 10px;
`

export function VariableNodeWidget(props:VariableNodeProps) {
  const inputPort = props.node.getInputPort();
  const outputPort = props.node.getOutputPort();

  return <Wrap activated={props.node.isSelected()}>
    <Head>
      {props.node.size}
    </Head>
    <Body >
      <PortWrap>
        <PortWidget port={inputPort} engine={props.engine}>
          <Port isInput={true} />
        </PortWidget>
      </PortWrap>
      
      {props.node.name}

      <PortWrap>
        <PortWidget port={outputPort} engine={props.engine}>
          <Port isInput={false} />
        </PortWidget>
      </PortWrap>
    </Body>
  </Wrap>
}