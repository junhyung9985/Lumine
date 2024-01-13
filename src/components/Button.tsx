import styles from "./Button.module.css";

export default function Button(params:ButtonParams) {
  
  return <div className={`${params.className ?? styles.className}`}>
    Button
  </div>
}

interface ButtonParams {
  className?:string
}