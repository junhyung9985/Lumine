import Canvas from './components/Canvas';
import Sidebar from './components/Sidebar';
import NavMenu from './components/NavMenu';
import styled from '@emotion/styled';
import Modal from './components/Modal';

const Body = styled.div`
  display:flex;
  flex-direction: row;
  width:100%;
  height: calc(100vh - 50px);
`

export default function App() {
  return <main>
    <Modal />
    <NavMenu />
    <Body>
      <Canvas />
      <Sidebar />
    </Body>
  </main>
}

