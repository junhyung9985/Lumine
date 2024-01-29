import styles from './App.module.css';
import Button from './components/Button';
import Canvas from './components/Canvas';
import Sidebar from './components/Sidebar';

function App() {
  return <main>
    <nav className={styles.navbar}>
      <div className={styles.title}>
        Graph 2 Code
      </div>
      <div>
        Palette
      </div>
    </nav>
    <div className={styles.body}>
      <div className={styles.canvasWrap}>
        <div className={styles.canvas}>
          <Canvas />
        </div>
        <Button className={styles.button}>
          Generate Code!
        </Button>
      </div>
      <Sidebar />
    </div>
  </main>
}

export default App
