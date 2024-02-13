import styled from "@emotion/styled";

const Wrap = styled.div`
  padding: 0px 40px;
  display: flex;
  border: solid 1px 0px #404040;
  gap: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const ItemWrap = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NodeSVG = (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 25V1H25V25H1Z" stroke="#D9D9D9" />
  </svg>
);

export default function Palette() {
  return (
    <Wrap>
      <ItemWrap>{NodeSVG}</ItemWrap>
    </Wrap>
  );
}
