import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams";
import { LayerNodeModel, ActivationType } from "./LayerNodeModel";
import styled from "@emotion/styled";

export interface LayerNodeWidgetProps {
  node: LayerNodeModel;
  engine: DiagramEngine;
}

const ActivationColor: Record<ActivationType, string> = {
  [ActivationType.UNDEFINED]: "#ffffff",
  [ActivationType.SIGMOID]: "#ffffff",
  [ActivationType.RELU]: "#ffffff",
  [ActivationType.SOFTMAX]: "#ffffff",
};

const ActivationBackground: Record<ActivationType, string> = {
  [ActivationType.UNDEFINED]: "#000000",
  [ActivationType.SIGMOID]: "#7F27FF",
  [ActivationType.RELU]: "#D04848",
  [ActivationType.SOFTMAX]: "#40A2E3",
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  
  min-width:140px;
  align-items: stretch;
`;

const Port = styled.div<{ isInput: boolean }>`
  border-radius: ${(prop) => (prop.isInput ? "0 50% 50% 0" : "50% 0 0 50%")};
  background: ${(prop) => (prop.isInput ? "#c7c7c7" : "#7d7d7d")};
  width: 15px;
  height: 15px;
  align-self: center;
`;

const Body = styled.div<{ activated: boolean; activation: ActivationType }>`
  display: flex;
  align-self: stretch;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  background: ${(props) => ActivationBackground[props.activation]};
  color: ${(props) => ActivationColor[props.activation]};
  
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
    min-height:50px;
    padding: 10px;
  }
`;

export function LayerNodeWidget(props: LayerNodeWidgetProps) {
  const inputPort = props.node.getInputPort();
  const outputPort = props.node.getOutputPort();

  return (
    <Wrap>
      <Body
        activated={props.node.isSelected()}
        activation={props.node.activation}
      >
        <div className="title">
          <PortWidget port={inputPort} engine={new DiagramEngine()}>
            <Port isInput={true} />
          </PortWidget>
          <div>
            {props.node.inputNum}
          </div>
          
          {props.node.activation}
          <div>
            {props.node.outputNum}
          </div>
          
          <PortWidget port={outputPort} engine={new DiagramEngine()}>
            <Port isInput={false} />
          </PortWidget>
        </div>
        <div className="name">{props.node.name}</div>
      </Body>
    </Wrap>
  );
}
