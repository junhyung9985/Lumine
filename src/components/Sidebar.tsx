import styled from "@emotion/styled";
import CollapseSVG from "/collapse.svg";
import { useState } from "react";
import Button from "./Button";

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
    & title {
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
  const [collapse, setCollapse] = useState<boolean>(false);
  function toggleCollapse() {
    setCollapse(!collapse);
  }
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
        {/* Attribute 설정 구현 */}
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