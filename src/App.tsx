import styles from './layout.module.css';
import Canvas from './components/Canvas';
import Sidebar from './components/Sidebar';
import NavMenu from './components/NavMenu';
import styled from '@emotion/styled';

const Body = styled.div`
  display:flex;
  flex-direction: row;
  width:100%;
  height: calc(100vh - 50px);
`

export default function App() {
  return <main>
    <NavMenu />
    <Body>
      <Canvas />
      <Sidebar />
    </Body>
  </main>
}

