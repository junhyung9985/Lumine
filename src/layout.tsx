import styles from './layout.module.css';
import Button from './components/Button';
import Canvas from './components/Canvas';
import Sidebar from './components/Sidebar';
import "./python/run-python";

export default function App() {
  const canvasWrap = <div className={styles.canvasWrap}>
    <div className={styles.canvas}>
      <Canvas />
    </div>
    <Button className={styles.button}>
      Generate Code!
    </Button>
  </div>;

  return <main>
    <nav className={styles.nav}>
      <div className={styles.navMenu}>
        <div className={styles.title}>
          Graph 2 Code
        </div>
        <div>
          Palette
        </div>
      </div>
      
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

