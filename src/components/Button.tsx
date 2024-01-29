import styles from "./Button.module.css";

export default function Button(params:ButtonParams) {
  return <div className={`${params.className} ${styles.btn}`}>
    {params.children}
  </div>
}

interface ButtonParams {
  className?:string,
  children:React.ReactNode
}