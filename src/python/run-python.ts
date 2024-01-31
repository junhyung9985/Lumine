import { loadPyodide } from "pyodide";
import src from "./prototype.py?raw";

async function main() {
  const pyodide = await loadPyodide({
    indexURL:"https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
  });
  pyodide.runPythonAsync(src);
  console.log("Loaded Pyodide");
}
main();