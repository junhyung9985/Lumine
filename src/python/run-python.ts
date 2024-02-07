import { loadPyodide } from "pyodide";
import src from "./prototype.py?raw";

async function main() {
  const pyodide = await loadPyodide({
    indexURL:"https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
  });
  // let zipResponse = await fetch("./wheel.zip");
  // let zipBinary = await zipResponse.arrayBuffer();
  // pyodide.unpackArchive(zipBinary, "zip");
  await pyodide.loadPackage("micropip");
  const micropip = pyodide.pyimport("micropip");
  // let zipResponse = await fetch("./graph2code-0.0.1-py3-none-any.whl")
  // let zipBinary = await zipResponse.arrayBuffer();
  // pyodide.unpackArchive();
  pyodide.runPythonAsync(src);
  console.log("Loaded Pyodide");
}
main();