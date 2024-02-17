import styled from "@emotion/styled";
import CollapseSVG from "/collapse.svg";
import { useEffect, useState } from "react";
import Button from "./Button";
import { GraphCodeCanvas } from "../model";
import { NodeModel } from "@projectstorm/react-diagrams";

namespace S {
  export const wrap = styled.div<{toggle:boolean}>`
    position:fixed;
    right:${props => props.toggle ? "0px" : "-360px"};
    background: #171919;
    height:100%;
    min-width:var(--sidebar-width);
    & > * { 
      padding-left:20px;
      padding-top:20px;
    }
    title {
      display:block;
      font-size:20px;
    }
  `;

  export const collapseBtn = styled.img<{toggle:boolean}>`
    cursor:pointer;
    width:16px;
    transition:all ease-in-out 300ms;
    position:relative;
    right:0px;
    ${props => (
      props.toggle ? "" :
      {
        right:"120px",
        transform:"rotate(180deg)"
      }
    )}
    &:hover {
      filter: brightness(2);
    }
  `;
  
  export const button = styled(Button)<{toggle:boolean}>`
    position:absolute;
    right:${props => (props.toggle ? "310px" : "10px")};
    bottom:10px;
  `
}

export default function Sidebar() {
  const cvs = new GraphCodeCanvas();

  const [collapse, setCollapse] = useState<boolean>(false);
  
  function toggleCollapse() {
    setCollapse(!collapse);
  }
  
  const [selectedNode, setSelectedNode] = useState<NodeModel | null>(null);
  
  useEffect(() => {
    cvs.getModel().getModels().forEach((value) => {
      value.registerListener({
        selectionChanged() {
          console.log("test");
          setSelectedNode(value as NodeModel);
        }
      })
    })
    // 나중에 캔버스가 바뀌는지도 리코일을 이용해서 체킹한다음에, 해당 캔버스가 바뀔때마다 이 구문을 호출하도록 하자.
  }, []);

  return <>
    <S.button toggle={collapse}>
      Generate Code!
    </S.button>
    <S.wrap toggle={collapse}>
      <div>
        <S.collapseBtn onClick={toggleCollapse} toggle={collapse} src={CollapseSVG} />
      </div>
      <div>
        <title>
          Attributes
        </title>
        {selectedNode?.getType()}
      </div>
      <div>
        <title>
          Project Settings
        </title>
        {/* Project 설정 구현 */}
      </div>
    </S.wrap>
  </>
}