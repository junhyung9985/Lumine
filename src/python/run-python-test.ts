import { loadPyodide } from "pyodide";
import src from "./prototype.py?raw";

export default async function RunPython(json : object){
  const pyodide = await loadPyodide({
    indexURL:"https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
    args:['src_file_name???', JSON.stringify(json)]
  });
  pyodide.runPythonAsync(src);
  console.log("Loaded Pyodide");
}

// RunPython({
//   "id": "ad291c70-1283-4d2b-9b33-e4a7413a99b0",
//   "offsetX": 0,
//   "offsetY": 0,
//   "zoom": 100,
//   "gridSize": 0,
//   "layers": [
//       {
//           "id": "a76d35d9-4869-4962-b9ec-f04a4dd87e8a",
//           "type": "diagram-links",
//           "isSvg": true,
//           "transformed": true,
//           "models": {}
//       },
//       {
//           "id": "5c831814-7baf-4eb7-8edd-4648096cc15a",
//           "type": "diagram-nodes",
//           "isSvg": false,
//           "transformed": true,
//           "models": {
//               "5af51060-0e8f-4569-9c7d-b016aec0f525": {
//                   "id": "5af51060-0e8f-4569-9c7d-b016aec0f525",
//                   "type": "layer",
//                   "x": 0,
//                   "y": 0,
//                   "ports": [
//                       {
//                           "id": "0cafe59e-78e7-4640-b5b8-eea1825ff6c0",
//                           "type": "custom_port",
//                           "x": 0,
//                           "y": 10,
//                           "name": "0_input",
//                           "alignment": "top",
//                           "parentNode": "5af51060-0e8f-4569-9c7d-b016aec0f525",
//                           "links": []
//                       },
//                       {
//                           "id": "08a75daf-c591-47c8-99f4-8e5be7a41f6a",
//                           "type": "custom_port",
//                           "x": 0,
//                           "y": 30,
//                           "name": "1_input",
//                           "alignment": "top",
//                           "parentNode": "5af51060-0e8f-4569-9c7d-b016aec0f525",
//                           "links": []
//                       },
//                       {
//                           "id": "f36461c8-fafa-4ec8-8e68-65afa01ada21",
//                           "type": "custom_port",
//                           "x": 0,
//                           "y": 50,
//                           "name": "2_input",
//                           "alignment": "top",
//                           "parentNode": "5af51060-0e8f-4569-9c7d-b016aec0f525",
//                           "links": []
//                       },
//                       {
//                           "id": "25653467-3345-42eb-9c0a-0412f081348f",
//                           "type": "custom_port",
//                           "x": 99,
//                           "y": 10,
//                           "name": "0_output",
//                           "alignment": "top",
//                           "parentNode": "5af51060-0e8f-4569-9c7d-b016aec0f525",
//                           "links": []
//                       },
//                       {
//                           "id": "bfc78c31-4934-440a-bbfd-2d08418fe55a",
//                           "type": "custom_port",
//                           "x": 99,
//                           "y": 30,
//                           "name": "1_output",
//                           "alignment": "top",
//                           "parentNode": "5af51060-0e8f-4569-9c7d-b016aec0f525",
//                           "links": []
//                       },
//                       {
//                           "id": "5cbf8ae8-13b8-443c-9495-caef33fcc836",
//                           "type": "custom_port",
//                           "x": 99,
//                           "y": 50,
//                           "name": "2_output",
//                           "alignment": "top",
//                           "parentNode": "5af51060-0e8f-4569-9c7d-b016aec0f525",
//                           "links": []
//                       }
//                   ],
//                   "name": "ANG",
//                   "layerType": "linear",
//                   "inputNum": 3,
//                   "outputNum": 3,
//                   "activation": "relu"
//               },
//               "d4880940-7594-403d-a894-3aff83e0698f": {
//                   "id": "d4880940-7594-403d-a894-3aff83e0698f",
//                   "type": "layer",
//                   "x": 0,
//                   "y": 0,
//                   "ports": [
//                       {
//                           "id": "a9c79505-beeb-47ee-b896-69d4dbe4ff69",
//                           "type": "custom_port",
//                           "x": 0,
//                           "y": 10,
//                           "name": "0_input",
//                           "alignment": "top",
//                           "parentNode": "d4880940-7594-403d-a894-3aff83e0698f",
//                           "links": []
//                       },
//                       {
//                           "id": "f3320f83-75a6-49ed-a33d-c573fd9b9ea7",
//                           "type": "custom_port",
//                           "x": 0,
//                           "y": 30,
//                           "name": "1_input",
//                           "alignment": "top",
//                           "parentNode": "d4880940-7594-403d-a894-3aff83e0698f",
//                           "links": []
//                       },
//                       {
//                           "id": "b6e90149-3733-49cd-afb3-aef352e3d880",
//                           "type": "custom_port",
//                           "x": 0,
//                           "y": 50,
//                           "name": "2_input",
//                           "alignment": "top",
//                           "parentNode": "d4880940-7594-403d-a894-3aff83e0698f",
//                           "links": []
//                       },
//                       {
//                           "id": "697ff4a0-0870-401d-a565-568f12da4a02",
//                           "type": "custom_port",
//                           "x": 99,
//                           "y": 10,
//                           "name": "0_output",
//                           "alignment": "top",
//                           "parentNode": "d4880940-7594-403d-a894-3aff83e0698f",
//                           "links": []
//                       },
//                       {
//                           "id": "40f089f5-7df4-4844-9c8e-23e4011df150",
//                           "type": "custom_port",
//                           "x": 99,
//                           "y": 30,
//                           "name": "1_output",
//                           "alignment": "top",
//                           "parentNode": "d4880940-7594-403d-a894-3aff83e0698f",
//                           "links": []
//                       },
//                       {
//                           "id": "df02120e-674c-4c6c-af6d-e2e6d14f68f7",
//                           "type": "custom_port",
//                           "x": 99,
//                           "y": 50,
//                           "name": "2_output",
//                           "alignment": "top",
//                           "parentNode": "d4880940-7594-403d-a894-3aff83e0698f",
//                           "links": []
//                       }
//                   ],
//                   "name": "ANG",
//                   "layerType": "linear",
//                   "inputNum": 3,
//                   "outputNum": 3,
//                   "activation": "relu"
//               },
//               "dfa1087c-2864-4a74-9e82-bed270e01adf": {
//                   "id": "dfa1087c-2864-4a74-9e82-bed270e01adf",
//                   "type": "layer",
//                   "x": 0,
//                   "y": 0,
//                   "ports": [
//                       {
//                           "id": "ec583079-85e6-453d-908c-e5686f11a138",
//                           "type": "custom_port",
//                           "x": 0,
//                           "y": 10,
//                           "name": "0_input",
//                           "alignment": "top",
//                           "parentNode": "dfa1087c-2864-4a74-9e82-bed270e01adf",
//                           "links": []
//                       },
//                       {
//                           "id": "fa993f01-e506-44d4-b23e-4c4dc4c1160b",
//                           "type": "custom_port",
//                           "x": 0,
//                           "y": 30,
//                           "name": "1_input",
//                           "alignment": "top",
//                           "parentNode": "dfa1087c-2864-4a74-9e82-bed270e01adf",
//                           "links": []
//                       },
//                       {
//                           "id": "442a0ca9-2d5d-4d70-ac85-722c36a1a098",
//                           "type": "custom_port",
//                           "x": 0,
//                           "y": 50,
//                           "name": "2_input",
//                           "alignment": "top",
//                           "parentNode": "dfa1087c-2864-4a74-9e82-bed270e01adf",
//                           "links": []
//                       },
//                       {
//                           "id": "e980878a-48e3-42f2-bf7d-e588ae55ac34",
//                           "type": "custom_port",
//                           "x": 99,
//                           "y": 10,
//                           "name": "0_output",
//                           "alignment": "top",
//                           "parentNode": "dfa1087c-2864-4a74-9e82-bed270e01adf",
//                           "links": []
//                       },
//                       {
//                           "id": "4df543d6-55f7-4f91-9598-707dd15f4141",
//                           "type": "custom_port",
//                           "x": 99,
//                           "y": 30,
//                           "name": "1_output",
//                           "alignment": "top",
//                           "parentNode": "dfa1087c-2864-4a74-9e82-bed270e01adf",
//                           "links": []
//                       },
//                       {
//                           "id": "61a3eb5f-119b-45a9-b34e-ca8dbc2b074d",
//                           "type": "custom_port",
//                           "x": 99,
//                           "y": 50,
//                           "name": "2_output",
//                           "alignment": "top",
//                           "parentNode": "dfa1087c-2864-4a74-9e82-bed270e01adf",
//                           "links": []
//                       }
//                   ],
//                   "name": "ANG",
//                   "layerType": "linear",
//                   "inputNum": 3,
//                   "outputNum": 3,
//                   "activation": "relu"
//               },
//               "c9243a4e-1f64-4beb-b850-237e77123711": {
//                   "id": "c9243a4e-1f64-4beb-b850-237e77123711",
//                   "type": "layer",
//                   "x": 0,
//                   "y": 0,
//                   "ports": [
//                       {
//                           "id": "bb0dea50-905b-4f6a-a386-08354ae02a10",
//                           "type": "custom_port",
//                           "x": 0,
//                           "y": 10,
//                           "name": "0_input",
//                           "alignment": "top",
//                           "parentNode": "c9243a4e-1f64-4beb-b850-237e77123711",
//                           "links": []
//                       },
//                       {
//                           "id": "a4a7c101-ce80-4996-8ce5-e108b3fbce96",
//                           "type": "custom_port",
//                           "x": 0,
//                           "y": 30,
//                           "name": "1_input",
//                           "alignment": "top",
//                           "parentNode": "c9243a4e-1f64-4beb-b850-237e77123711",
//                           "links": []
//                       },
//                       {
//                           "id": "f6e78c38-efa3-4260-b4b9-9c0f8e80e735",
//                           "type": "custom_port",
//                           "x": 0,
//                           "y": 50,
//                           "name": "2_input",
//                           "alignment": "top",
//                           "parentNode": "c9243a4e-1f64-4beb-b850-237e77123711",
//                           "links": []
//                       },
//                       {
//                           "id": "11e7faf2-2fe7-4dac-bd74-e5264697f24e",
//                           "type": "custom_port",
//                           "x": 99,
//                           "y": 10,
//                           "name": "0_output",
//                           "alignment": "top",
//                           "parentNode": "c9243a4e-1f64-4beb-b850-237e77123711",
//                           "links": []
//                       },
//                       {
//                           "id": "4990a191-a484-4160-b164-7cd1bd69bbc0",
//                           "type": "custom_port",
//                           "x": 99,
//                           "y": 30,
//                           "name": "1_output",
//                           "alignment": "top",
//                           "parentNode": "c9243a4e-1f64-4beb-b850-237e77123711",
//                           "links": []
//                       },
//                       {
//                           "id": "704d14d8-fb4a-4c1a-b81a-af19cac07243",
//                           "type": "custom_port",
//                           "x": 99,
//                           "y": 50,
//                           "name": "2_output",
//                           "alignment": "top",
//                           "parentNode": "c9243a4e-1f64-4beb-b850-237e77123711",
//                           "links": []
//                       }
//                   ],
//                   "name": "ANG",
//                   "layerType": "linear",
//                   "inputNum": 3,
//                   "outputNum": 3,
//                   "activation": "relu"
//               },
//               "c232de86-3cd2-4681-8fb0-188ae20b0e06": {
//                   "id": "c232de86-3cd2-4681-8fb0-188ae20b0e06",
//                   "type": "layer",
//                   "x": 0,
//                   "y": 0,
//                   "ports": [
//                       {
//                           "id": "0c294b63-0804-407e-81a3-e2088169995c",
//                           "type": "custom_port",
//                           "x": 0,
//                           "y": 10,
//                           "name": "0_input",
//                           "alignment": "top",
//                           "parentNode": "c232de86-3cd2-4681-8fb0-188ae20b0e06",
//                           "links": []
//                       },
//                       {
//                           "id": "6a676cb3-696e-43a1-b2c3-035418c2cd74",
//                           "type": "custom_port",
//                           "x": 0,
//                           "y": 30,
//                           "name": "1_input",
//                           "alignment": "top",
//                           "parentNode": "c232de86-3cd2-4681-8fb0-188ae20b0e06",
//                           "links": []
//                       },
//                       {
//                           "id": "0ceff0e1-2fc2-41f8-85db-daf7641c46bf",
//                           "type": "custom_port",
//                           "x": 0,
//                           "y": 50,
//                           "name": "2_input",
//                           "alignment": "top",
//                           "parentNode": "c232de86-3cd2-4681-8fb0-188ae20b0e06",
//                           "links": []
//                       },
//                       {
//                           "id": "93265263-98f2-425b-a35c-6464b6e67deb",
//                           "type": "custom_port",
//                           "x": 99,
//                           "y": 10,
//                           "name": "0_output",
//                           "alignment": "top",
//                           "parentNode": "c232de86-3cd2-4681-8fb0-188ae20b0e06",
//                           "links": []
//                       },
//                       {
//                           "id": "7139a2f9-b0ab-430d-a800-7c2fec1f21f2",
//                           "type": "custom_port",
//                           "x": 99,
//                           "y": 30,
//                           "name": "1_output",
//                           "alignment": "top",
//                           "parentNode": "c232de86-3cd2-4681-8fb0-188ae20b0e06",
//                           "links": []
//                       },
//                       {
//                           "id": "45ca545e-59da-4991-9a8a-e83a34f868ac",
//                           "type": "custom_port",
//                           "x": 99,
//                           "y": 50,
//                           "name": "2_output",
//                           "alignment": "top",
//                           "parentNode": "c232de86-3cd2-4681-8fb0-188ae20b0e06",
//                           "links": []
//                       }
//                   ],
//                   "name": "ANG",
//                   "layerType": "linear",
//                   "inputNum": 3,
//                   "outputNum": 3,
//                   "activation": "relu"
//               }
//           }
//       }
//   ]
// });
