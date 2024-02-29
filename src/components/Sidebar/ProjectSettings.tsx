import styled from "@emotion/styled";
import { Button } from "../Button";
import { Wrap } from "./Settings";
import { useCanvasStore } from "../../store/CanvasStore";
import { DiagramModel } from "@projectstorm/react-diagrams";

const ProjectSettingsWrap = styled(Wrap)`
  input#file {
    display:none;
  }
  * > {
    padding:10px;
  }
`

const ImportButton = styled(Button)`
  display:flex;
  justify-content:center;
  align-items:center;
  * {
    cursor: pointer;
  }
  input[type="file"] {
    display:none;
  }
`;

export default function ProjectSettings() {
  const engine = useCanvasStore((state) => (state.engine));
  const deserialize = useCanvasStore((state) => state.deserialize);
  const selectNode = useCanvasStore((state) => (state.selectNode));
  const handleImport:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if(!e.target.files) return;
    console.log(e.target.files);

    const reader = new FileReader();

    try {
      reader.readAsText(e.target.files[0]);
      reader.onloadend = () => {
        deserialize(reader.result as string);
        selectNode(undefined);
        engine.getEngine().repaintCanvas();
      }
    } catch (e) {
      throw new Error("Cannot load model from uploaded data.");
      
    }
  }
  const handleExport = () => {
    const aTag = document.createElement('a');
    const data = new Blob([JSON.stringify(engine.getModel().serialize())], {
      type:"application/json"
    });
    aTag.target = "_blank";
    aTag.href = URL.createObjectURL(data);
    aTag.download = "model.json";
    aTag.click();
  }
  return (
    <>
      <title>Project Settings</title>
      <ProjectSettingsWrap>
        <label htmlFor="file">
          <ImportButton >
            Import
          </ImportButton>
        </label>
        <input type="file" id="file" onChange={handleImport}/>
        <br />

        <ImportButton onClick={handleExport}>Export</ImportButton>
      </ProjectSettingsWrap>
    </>
  );
}
