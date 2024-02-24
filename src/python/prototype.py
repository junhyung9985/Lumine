# import micropip
# await micropip.install('graph2code') 
# import graph2code.test

import sys
import json
from typing import List

####################################### CLASS DEFINITION ####################################################
class Layer:
    def __init__(self, name:str, layerType: str, input : int, output : int, activation : str | None = None , **kwargs):
        '''
            Class to store about the information of the layer + activation function that follows.

            Args :
                name : name of the layer
                layerType : the name of the layer that Node covers -> ['linear', 'convolution']
                input : the size of the input variable
                output : the size of the output variable
                activation : the name of the activation function after the layer -> ['sigmoid', 'relu']
                kwargs : more arguments if needed for example
                    - if the layer is Convolution Layer, then the size of channel will be needed.

        '''
        self.name = name
        self.layerType = layerType
        self.input = input
        self.output = output
        self.activation = activation
        self.kwargs = kwargs # channel 등등의 정보

class Variable:
    def __init__(self, name : str, connected_to : List[int] | None = None, connected_from : List[int] | None = None):
        '''
            !!! There will be significant changes on this class definition "Input" -> "Variable"

            Class to store about the information of the input variables

            Args:
                name : name of the input variable
                connected_to : list of indexes of which layer does this variable is an input.
                connected_from : list of indexes of which layer does this variable is an output. 
        '''
        self.name = name
        # self.connected_to = connected_to
        # self.connected_from = connected_from
        # 의외로 필요 없을 것 같아서 일단 comment 처리해둠.
####################################### CLASS DEFINITION ####################################################




####################################### PARSING LOGIC #######################################################

def JsonParse(json_str : str):
    '''
        Function to parse JSON string into dictionary + deserialize into structure, nodes, input and output variables.

        Args :
            json_str : JSON string containing all of information on the canvas.

    '''
    dic = json.loads(json_str)
    # print(dic['layers'][0])
    # print(dic['layers'][1]['models'])

    node_idx = {}
    nodes = []
    cnt = 0
    inputs = []
    outputs = []
    structure = []
    structure2 = []
    ind = []
    oud = []
    for node_id in dic['layers'][1]['models']:
        
        infos = dic['layers'][1]['models'][node_id]
        node_idx[node_id] = cnt
        structure.append([])
        structure2.append([])
        ind.append(0)
        oud.append(0)

        cnt += 1

        if(dic['layers'][1]['models'][node_id]['type'] == 'layer'):
            nodes.append(Layer(infos['name'],infos['layerType'],infos['inputNum'], infos['outputNum'], infos['activation']))
        elif(dic['layers'][1]['models'][node_id]['type'] == 'variable'):
            nodes.append(Variable(infos['name']))
        else :
            print("ERROR : {} type is not supported".format(dic['layers'][1]['models'][node_id]['type']))
            exit(-1)

    for port in dic['layers'][0]['models']:
        structure[node_idx[dic['layers'][0]['models'][port]['source']]].append(node_idx[dic['layers'][0]['models'][port]['target']])
        structure2[node_idx[dic['layers'][0]['models'][port]['target']]].append(node_idx[dic['layers'][0]['models'][port]['source']])
        ind[node_idx[dic['layers'][0]['models'][port]['target']]] += 1
        oud[node_idx[dic['layers'][0]['models'][port]['source']]] += 1
        print("{} : {} -> from {} to {}".format(port,dic['layers'][0]['models'][port], node_idx[dic['layers'][0]['models'][port]['source']], node_idx[dic['layers'][0]['models'][port]['target']]))

    for idx in range(cnt):
        if(ind[idx] == 0) : inputs.append(idx)
        if(oud[idx] == 0) : outputs.append(idx)

    return nodes, node_idx, structure, structure2, ind, inputs, outputs

def specify(layer : Layer) -> str:
    '''
        Function for translating the layer information to PyTorch code.

        Args :
            node : Node object to specify which layer does it covers.
    '''
    s = ""
    if(layer.name =='linear'): s+="nn.Linear"
    s +='(' + str(layer.input)+','+str(layer.output)+')'
    return s

def specify_act(name : str) -> str:
    '''
        Function for translating activation function to PyTorch code.

        Args :
            name : string of the which activation function will come after the layer
    '''
    if(name == 'sigmoid'): return "nn.Sigmoid()"
    if(name == 'relu'): return "nn.ReLU()"
    if(name == 'softmax'): return "nn.Softmax()"

####################################### PARSING LOGIC #######################################################



####################################### WRITING LOGIC #######################################################

def WritePyTorch(nodes : List[Layer | Variable],  structure : List[List[int]], structure2 : List[List[int]], inputs : List[int], outputs : List[int], indegree : List [int]) -> str:
    '''
        Function for writing PyTorch model class code with given nodes and edges.

        Args:
            nodes : List of Layer or Variable objects.
            structure : Adjacency List for connectivities between nodes. 
            structure2 : Adjacency List for connectivities between nodes. Reverse of structure.
            inputs : List of indexes for input variables.
            outputs : List of indexes for output variables.
            indegree : List of indegrees for each node. Used for Topological Sorting Algorithm.
    '''

    # 기본적으로 출력해야 할 것들
    s = ""
    s += "import torch\nimport torch.nn as nn\n\n"
    s += "class Model(nn.Module):\n"
    s += "\tdef __init__(self):\n"
    s += "\t\tsuper().__init__()\n"

    # 각 Layer별로 Constructor에 올려둠.
    for node in  nodes:
        if type(node) == Layer : 
            s += "\t\tself."+node.name+" = "+specify(node)+"\n"
            if(node.activation != None):
                s += "\t\tself."+node.name+"_act = "+specify_act(node.activation)+"\n"
        
    # Forward 메소드 작성 시작, 여기에 Input variables들도 넣어둠.
    s += "\n\tdef forward(self"
    for idx in inputs:
        s += ", "
        s += nodes[idx].name
    s += "):\n"

    queue = inputs # Queue for storing nodes.

    ret = 0
    while(len(queue) != 0):
        idx = queue[0]
        ret = idx
        del(queue[0])
        if(type(nodes[idx]) == Layer):
            for bef_node in structure2[idx]:
                if type(nodes[bef_node]) == Layer:
                    s+= "\t\tout_{} = self.{}(out_{})\n".format(nodes[idx].name, nodes[idx].name, nodes[bef_node].name)
                elif type(nodes[bef_node]) == Variable:
                    s+= "\t\tout_{} = self.{}({})\n".format(nodes[idx].name, nodes[idx].name, nodes[bef_node].name)
                else:
                    print("ERROR : UNAVAILABLE INPUT")
                    exit(-1)
        elif(type(nodes[idx]) == Variable):
            for bef_node in structure2[idx]:
                if type(nodes[bef_node]) == Layer:
                    s+= "\t\t{} = out_{}\n".format(nodes[idx].name, nodes[bef_node].name)
                elif type(nodes[bef_node]) == Variable:
                    s+= "\t\t{} = {}\n".format(nodes[idx].name, nodes[bef_node].name)
                else:
                    print("ERROR : UNAVAILABLE INPUT")
                    exit(-1)
        else :
            print("ERROR : UNAVAILABLE INPUT")
        
        for next_node in structure[idx]:
            ind[next_node] -= 1
            if(ind[next_node] == 0):
                queue.append(next_node)

    s += "\t\treturn "
    for i, idx in enumerate(outputs) :
        if(type(nodes[idx]) == Variable):
            s += nodes[idx].name
        else :
            s += "out_"+nodes[idx].name
        if(i < len(outputs)-1):
            s += ", "
    
    return s # 일단은 아무 필요 없어는 보여서 이렇게 주기는 했는데, 서버측에서 성공적으로 실행되었는지를 알아보려면 Response 값 등을 리턴하는 것도 좋아는 보임.

    # Topological Sort to produce Forward Method.

####################################### WRITING LOGIC #######################################################



# Test : Simple MLP consisted of 3 layers, Linear(5,4) -> ReLU -> Linear(4,3) -> Softmax -> Linear(3,1) -> Sigmoid
if __name__ == '__main__':
    print(len(sys.argv))

    if(len(sys.argv) > 1):
        nodes, node_idx, structure, structure2, ind, inputs, outputs = JsonParse(sys.argv[1])
        result = WritePyTorch(nodes, structure, structure2, inputs, outputs, ind)
        print(result)

    else :
        print("ERROR : Cannot find JSON string.")
    # mock_structure = [[0,1,0],[0,0,1],[0,0,0]]
    # mock_nodes = [Layer('m1','linear',5,4,'relu'), Layer('m2', 'linear',4,3,'softmax'), Layer('m3','linear',3,1,'sigmoid')]
    # path = "./"
    # input = [Variable('x',[0],[])]
    # output = [Variable('y',[2],[])]
    # print(WritePyTorch(mock_structure, mock_nodes, path, input,output))
    