# import micropip
# await micropip.install('graph2code') 
# import graph2code.test

import sys
import json

####################################### CLASS DEFINITION ####################################################
class Node:
    def __init__(self, name : str, input : int, output : int, activation : str | None = None , **kwargs):
        '''
            Class to store about the information of the layer + activation function that follows.

            Args :
                name : the name of the layer that Node covers -> ['linear', 'convolution']
                input : the size of the input variable
                output : the size of the output variable
                activation : the name of the activation function after the layer -> ['sigmoid', 'relu']
                kwargs : more arguments if needed for example
                    - if the layer is Convolution Layer, then the size of channel will be needed.

        '''
        self.name = name
        self.input = input
        self.output = output
        self.activation = activation
        self.kwargs = kwargs # channel 등등의 정보

class Variable:
    def __init__(self, name : str, connected_to : int, is_input : bool):
        '''
            !!! There will be significant changes on this class definition "Input" -> "Variable"

            Class to store about the information of the input variables

            Args:
                name : name of the input variable
                connected_to : index of which layer does this variable gives as an input
        '''
        self.name = name
        self.connected_to = connected_to
        self.is_input = is_input
####################################### CLASS DEFINITION ####################################################

####################################### PARSING LOGIC #######################################################

def JsonParse(json_str : str):
    '''
        Function to parse JSON string into dictionary + deserialize into structure, nodes, input and output variables.

        Args :
            json_str : JSON string containing all of information on the canvas.

    '''
    dic = json.loads(json_str)
    print(dic['layers'][0])
    print(dic['layers'][1]['models'])

    node_idx = {}
    nodes = []
    cnt = 0
    inputs = []
    outputs = []
    for node_id, infos in dic['layers'][1]['models']:
        print(infos)
        if(dic['layers'][1]['models'][node_id]['type'] == 'layer'):
            infos = dic['layers'][1]['models'][node_id]
            node_idx[node_id] = cnt
            nodes.append(Node(infos['linear'],infos['inputNum'], infos['outputNum'], infos['activation']))
            cnt += 1


    

    print(node_idx)

    return dic

def specify(node : Node) -> str:
    '''
        Function for translating the layer information to PyTorch code.

        Args :
            node : Node object to specify which layer does it covers.
    '''
    s = ""
    if(node.name =='linear'): s+="nn.Linear"
    s +='(' + str(node.input)+','+str(node.output)+')'
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

def WritePyTorch(structure:[[]], nodes : [Node],  path : str, inputs : [Variable], outputs : [Variable]) -> str:
    '''
        Function for writing PyTorch model class code with given nodes, input variables, and connectivities between them.

        Args:
            structure : Adjacency Matrix for connectivities between nodes. structure[i][j] = 1 if there is a path i -> j, else 0.
            nodes : List of Node objects
            path : path of directory that user wants to save.
            inputs : List of Input objects

    '''

    # 각 노드별로 순서에 따라서 네이밍.
    nodes_name = ['m'+str(i) for i in range(len(nodes))]
    #print(nodes_name)

    # 기본적으로 출력해야 할 것들
    s = ""
    s += "import torch\nimport torch.nn as nn\n\n"
    s += "class Model(nn.Module):\n"
    s += "\tdef __init__(self):\n"
    s += "\t\tsuper().__init__()\n"

    # 각 노드별로 Constructor에 올려둠.
    for name,node in zip(nodes_name, nodes):
        s += "\t\tself."+name+" = "+specify(node)+"\n"
        if(node.activation != None):
            s += "\t\tself."+name+"_act = "+specify_act(node.activation)+"\n"

    # Forward 메소드 작성 시작, 여기에 Input variables들도 넣어둠.
    s += "\n\tdef forward(self"
    for x in inputs:
        s += ", "
        s += x.name
    s += "):\n"

    start_nodes = [] # Queue for storing nodes.

    for x in inputs:
        idx = x.connected_to
        s += "\t\to{} = self.{}({})\n".format(idx, nodes_name[idx], x.name)
        if(nodes[idx].activation != None):
            s += "\t\to{} = self.{}_act(o{})\n".format(idx, nodes_name[idx], idx)
        start_nodes.append(idx)

    ret = 0
    while(len(start_nodes) != 0):
        idx = start_nodes[0]
        ret = idx
        del(start_nodes[0])
        for next, connected in enumerate(structure[idx]):
            if(connected == 1):
                s += "\t\to{} = self.{}(o{})\n".format(next, nodes_name[next], idx)
                if(nodes[next].activation != None):
                    s += "\t\to{} = self.{}_act(o{})\n".format(next, nodes_name[next], next)
                start_nodes.append(next)

    s += "\t\treturn o{}".format(ret)

    return s # 일단은 아무 필요 없어는 보여서 이렇게 주기는 했는데, 서버측에서 성공적으로 실행되었는지를 알아보려면 Response 값 등을 리턴하는 것도 좋아는 보임.

    # BFS since we do not think about residual connections.
    # Since we do not consider residual connection right now, every nodes indegree will be 1.
    # So just doing BFS would be fine. We will change the algorithm to Topological Sorting if needed.


####################################### WRITING LOGIC #######################################################















# Test : Simple MLP consisted of 3 layers, Linear(5,4) -> ReLU -> Linear(4,3) -> Softmax -> Linear(3,1) -> Sigmoid
if __name__ == '__main__':
    print(len(sys.argv))

    if(len(sys.argv) > 1):
        dic = JsonParse(sys.argv[1])
        print(type(dic))

    mock_structure = [[0,1,0],[0,0,1],[0,0,0]]
    mock_nodes = [Node('linear',5,4,'relu'), Node('linear',4,3,'softmax'), Node('linear',3,1,'sigmoid')]
    path = "./"
    input = [Variable('x',0,True)]
    output = [Variable('y',2,True)]
    print(WritePyTorch(mock_structure, mock_nodes, path, input,output))
    