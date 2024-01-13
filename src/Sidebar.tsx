
import Collapse from "/collapse.svg";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return <div className={styles.wrap}>
    <div>
      <img src={Collapse} />
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
  </div>;
}