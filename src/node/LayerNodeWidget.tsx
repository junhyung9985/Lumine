import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams";
import {
  LayerNodeModel,
  LayerPortType,
  ActivationType,
} from "./LayerNodeModel";
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
  flex-direction: row;
  align-items: stretch;
`;

const PortWrapper = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-self:center;
  padding: 10px 0;
`;

const Port = styled.div`
  background: rgb(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 15px;
  height: 15px;
  align-self:center;
`;

const Body = styled.div<{ activated: boolean; activation: ActivationType }>`
  display: flex;
  align-self:stretch;
  align-items:center;
  justify-contents:center;
  background: ${(props) => ActivationBackground[props.activation]};
  color: ${(props) => ActivationColor[props.activation]};
  min-width: 70px;
  max-width: 100px;
  border: 2px solid ${(props) => (props.activated ? "white" : "black")};
  border-radius: 10px;
  padding: 5px;
`;

export function LayerNodeWidget(props: LayerNodeWidgetProps) {
  const inputPorts = props.node.getPortArray(LayerPortType.INPUT);
  const outputPorts = props.node.getPortArray(LayerPortType.OUTPUT);

  return (
    <Wrap>
      <PortWrapper>
        {inputPorts.map((value, idx) => (
          <PortWidget key={idx} port={value} engine={new DiagramEngine()}>
            <Port />
          </PortWidget>
        ))}
      </PortWrapper>
      <Body
        activated={props.node.isSelected()}
        activation={props.node.activation}
      >
        {props.node.name}
      </Body>
      <PortWrapper>
        {outputPorts.map((value, idx) => (
          <PortWidget key={idx} port={value} engine={new DiagramEngine()}>
            <Port />
          </PortWidget>
        ))}
      </PortWrapper>
    </Wrap>
  );
}
