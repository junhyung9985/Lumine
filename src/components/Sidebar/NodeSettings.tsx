import styled from "@emotion/styled"
import { NodeModel } from "@projectstorm/react-diagrams";
import { ChangeEventHandler } from "react";
import { VariableNodeModel } from "../../node/VariableNodeModel";
import { LayerNodeModel } from "../../node/LayerNodeModel";
import LayerNodeSettings from "./NodeSettings/LayerNodeSettings";
import VariableNodeSettings from "./NodeSettings/VariableNodeSettings";
import { Wrap } from "./Settings";

interface NodeSettingsProps {
  node?: NodeModel;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}


export default function NodeSettings(props:NodeSettingsProps) {
  const {node, name, setName} = props;
  
  const handleNameChange:ChangeEventHandler<HTMLInputElement> = (e) => {
    if(!node) return;
    (node as VariableNodeModel).name = e.target.value;
    setName(e.target.value);
  }
  
  return !node ? "" : <>
    <title>
      Node Attributes
    </title>
    <Wrap>
      {node.getType()}
      {
        !node ? "" : <div>
        <title>
          Name
        </title>
        <input type="text" name="setName" id="setname" value={name} onFocus={() => (node.setLocked(true))} onBlur={() => (node.setLocked(false))} onChange={handleNameChange} />
      </div>
      }
      {
        node?.getType() !== LayerNodeModel.type ? "" :
        <LayerNodeSettings node={node as LayerNodeModel}/>
      }
      {
        node?.getType() !== VariableNodeModel.type ? "" :
        <VariableNodeSettings node={node as VariableNodeModel}/>
      }
    </Wrap>
  </>
}