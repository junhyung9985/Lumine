import { loadPyodide } from "pyodide";
import src from "./prototype.py?raw";

export default async function RunPython(json : object){
  const pyodide = await loadPyodide({
    indexURL:"https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
    args:['src_file_name???', JSON.stringify(json)]
  });
  return pyodide.runPythonAsync(src);
}