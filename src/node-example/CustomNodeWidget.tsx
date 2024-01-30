import { DiamondNodeModel } from './CustomNodeModel';
import { DiagramEngine, PortModelAlignment, PortWidget, PortModel, PortModelGenerics } from '@projectstorm/react-diagrams';
// import styled from '@emotion/styled';

export interface DiamondNodeWidgetProps {
	node: DiamondNodeModel;
	engine: DiagramEngine;
	size: number;
}

// namespace S {
// 	export const Port = styled.div`
// 		width: 16px;
// 		height: 16px;
// 		z-index: 10;
// 		background: rgba(0, 0, 0, 0.5);
// 		border-radius: 8px;
// 		cursor: pointer;

// 		&:hover {
// 			background: rgba(0, 0, 0, 1);
// 		}
// 	`;
// }

/**
 * @author Dylan Vorster
 */
export function DiamondNodeWidget(props:DiamondNodeWidgetProps) {
  return <div
    className={'diamond-node'}
    style={{
      position: 'relative',
      width: props.size,
      height: props.size
    }}
  >
    <svg
      width={props.size}
      height={props.size}
      dangerouslySetInnerHTML={{
        __html:
          `
      <g id="Layer_1">
      </g>
      <g id="Layer_2">
        <polygon fill="mediumpurple" stroke="${
          props.node.isSelected() ? 'white' : '#000000'
        }" stroke-width="3" stroke-miterlimit="10" points="10,` +
          props.size / 2 +
          ` ` +
          props.size / 2 +
          `,10 ` +
          (props.size - 10) +
          `,` +
          props.size / 2 +
          ` ` +
          props.size / 2 +
          `,` +
          (props.size - 10) +
          ` "/>
      </g>
    `
      }}
    />
    <PortWidget
      style={{
        top: props.size / 2 - 8,
        left: -8,
        position: 'absolute'
      }}
      port={props.node.getPort(PortModelAlignment.LEFT) as PortModel<PortModelGenerics>}
      engine={props.engine}
    >
      <div />
    </PortWidget>
    <PortWidget
      style={{
        left: props.size / 2 - 8,
        top: -8,
        position: 'absolute'
      }}
      port={props.node.getPort(PortModelAlignment.TOP) as PortModel<PortModelGenerics>}
      engine={props.engine}
    >
      <div />
    </PortWidget>
    <PortWidget
      style={{
        left: props.size - 8,
        top: props.size / 2 - 8,
        position: 'absolute'
      }}
      port={props.node.getPort(PortModelAlignment.RIGHT) as PortModel<PortModelGenerics>}
      engine={props.engine}
    >
      <div />
    </PortWidget>
    <PortWidget
      style={{
        left: props.size / 2 - 8,
        top: props.size - 8,
        position: 'absolute'
      }}
      port={props.node.getPort(PortModelAlignment.BOTTOM) as PortModel<PortModelGenerics>}
      engine={props.engine}
    >
      <div />
    </PortWidget>
  </div>
}