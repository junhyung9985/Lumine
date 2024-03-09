import styled from "@emotion/styled";
import Palette from "./Palette";

const Wrap = styled.nav`
  width: 100%;
  height: 50px;
  background: #2d3131;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Menu = styled.div`
  &:hover {
    background:#404646;
  }
  display: flex;
  align-items: center;
  width:100%;
`

const ModelTitle = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  min-width:var(--sidebar-width);
  background:#1F2222;
`

const HomeTitle = styled.div`
  color: #fff;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 60px;
  margin-right: 60px;
`

export default function NavMenu() {
  return <Wrap>
    <Menu>
      <HomeTitle>
        Lumine
      </HomeTitle>
      <Palette />
    </Menu>
    <ModelTitle>
      model 1
    </ModelTitle>
  </Wrap>
}
