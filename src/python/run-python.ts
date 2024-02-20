import { loadPyodide } from "pyodide";
import src from "./prototype.py?raw";

async function main() {
  const pyodide = await loadPyodide({
    indexURL:"https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
  });
  // await pyodide.loadPackage("micropip");
  // const micropip = pyodide.pyimport("micropip"); 
  // 일단 모듈화 없이도 현재 진행해도 무방하여 제외시키긴 함. (graph2code에 들어가있는 내용물도 실질적으로 필요없는 기능들만 들어가 있어서...)
  // Parsing 되는 것 확인 후에 모듈화 진행 후, 다시 이 부분을 손보는 걸로...
  pyodide.runPythonAsync(src);
  console.log("Loaded Pyodide");
}
main();