import styles from './layout.module.css';
import Button from './components/Button';
import Canvas from './components/Canvas';
import Sidebar from './components/Sidebar';
import "./python/run-python";
import Palette from './components/palette/Palette';
import styled from "@emotion/styled";

namespace S {
  export const navMenu = styled.div`
    &:hover {
      background:#404646;
    }
    display: flex;
    align-items: center;
    width:100%;
  `
}

export default function App() {
  const canvasWrap = <div className={styles.canvasWrap}>
    <div className={styles.canvas}>
      <Canvas />
    </div>
  </div>;

  return <main>
    <nav className={styles.nav}>
      <S.navMenu>
        <div className={styles.title}>
          Graph 2 Code
        </div>
        <div>
          <Palette />
        </div>
      </S.navMenu>
      
      <div className={styles.modelWrap}>
        model 1
      </div>
    </nav>
    <div className={styles.body}>
      {canvasWrap}
      <Sidebar />
    </div>
  </main>
}

