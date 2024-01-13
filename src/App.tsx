import styles from './App.module.css';
import Sidebar from './Sidebar';

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
        <canvas></canvas>
        <div className={styles.button}>
          Generate Code!
        </div>
      </div>
      <Sidebar />
    </div>
  </main>
}

export default App
