import sys
import json
from typing import List, Tuple

####################################### CLASS DEFINITION ####################################################
class Layer:
    def __init__(self, name:str, layer_type: str, input_size : int, output_size : int, activation : str, **kwargs):
        '''
            Class to store about the information of the layer + activation function that follows.

            Args :
                name : name of the layer
                layer_type : the name of the layer that Node covers -> ['linear']
                input_size : the size of the input variable
                output_size : the size of the output variable
                activation : the name of the activation function after the layer -> ['sigmoid', 'relu', 'softmax', 'none']
                kwargs : more arguments if needed for example
                    - if the layer is Convolution Layer, then the size of channel will be needed.

        '''
        self.name = name
        self.layer_type = layer_type
        self.input = input_size
        self.output = output_size
        self.activation = activation
        self.kwargs = kwargs # channel 등등의 정보

class Variable:
    def __init__(self, name : str):
        '''
            Class to store about the information of the variables.

            Args:
                name : name of the variable
        '''
        self.name = name
####################################### CLASS DEFINITION ####################################################




####################################### PARSING LOGIC #######################################################

def JsonParse(json_str : str) -> Tuple[List[Layer | Variable],List[List[int]],List[List[int]]]:
    '''
        Function to parse JSON string into dictionary + deserialize into structure, nodes, input and output variables.

        Args :
            json_str : JSON string containing all of information on the canvas.

    '''
    dic = json.loads(json_str)

    node_idx = {}
    nodes, input_var, output_var, structure, structure_rev, indegree, outdegree = [],[],[],[],[],[],[]
    cnt = 0

    # Indexing + Extract node informations
    for node_id in dic['layers'][1]['models']:
        
        node_information = dic['layers'][1]['models'][node_id]
        node_idx[node_id] = cnt
        structure.append([])
        structure_rev.append([])
        indegree.append(0)
        outdegree.append(0)
        
        cnt += 1
        
        if(dic['layers'][1]['models'][node_id]['type'] == 'layer'):
            # If the node is Layer Node
            node_name = node_information['name']
            node_layer_type = node_information['layerType']
            node_input_size = node_information['inputNum']
            node_output_size = node_information['outputNum']
            node_activation_function = node_information['activation']
            
            nodes.append(Layer(
                node_name,
                node_layer_type,
                node_input_size,
                node_output_size,
                node_activation_function
            ))
        
        elif(dic['layers'][1]['models'][node_id]['type'] == 'variable'):
            # If the node is Variable Node
            node_name = node_information['name']
            nodes.append(Variable(
                node_name
            ))
        
        else :
            print("ERROR : {} type is not supported".format(dic['layers'][1]['models'][node_id]['type']))
            exit(-1)


    # Building Graph Structure + Calculate in/out degrees for each node.
    for port in dic['layers'][0]['models']:
        
        structure[node_idx[dic['layers'][0]['models'][port]['source']]].append(node_idx[dic['layers'][0]['models'][port]['target']])
        structure_rev[node_idx[dic['layers'][0]['models'][port]['target']]].append(node_idx[dic['layers'][0]['models'][port]['source']])
        
        indegree[node_idx[dic['layers'][0]['models'][port]['target']]] += 1
        outdegree[node_idx[dic['layers'][0]['models'][port]['source']]] += 1
        #print("{} : {} -> from {} to {}".format(port,dic['layers'][0]['models'][port], node_idx[dic['layers'][0]['models'][port]['source']], node_idx[dic['layers'][0]['models'][port]['target']]))

    for idx in range(cnt):
        if(indegree[idx] == 0) : input_var.append(idx)
        if(outdegree[idx] == 0) : output_var.append(idx)

    return nodes, structure, structure_rev, input_var, output_var, indegree

def specify(layer : Layer) -> str:
    '''
        Function for translating the layer information to PyTorch code.

        Args :
            node : Node object to specify which layer does it covers.
    '''
    s = ""
    if(layer.layer_type =='linear'): s+="nn.Linear"
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
    return "nn.Identity()"
####################################### PARSING LOGIC #######################################################



####################################### WRITING LOGIC #######################################################

def WritePyTorch(nodes : List[Layer | Variable],  structure : List[List[int]], structure_rev : List[List[int]], input_var : List[int], output_var : List[int], indegree : List [int]) -> str:
    '''
        Function for writing PyTorch model class code with given nodes and edges.

        Args:
            nodes : List of Layer or Variable objects.
            structure : Adjacency List for connectivities between nodes. 
            structure_rev : Adjacency List for connectivities between nodes. Reverse of structure.
            input_var : List of indexes for input variables.
            output_var : List of indexes for output variables.
            indegree : List of indegrees for each node. Used for Topological Sorting Algorithm.
    '''

    # Module imports for PyTorch model class
    code_str = ""
    code_str += "import torch\nimport torch.nn as nn\n\n"
    code_str += "class Model(nn.Module):\n"
    code_str += "\tdef __init__(self):\n"
    code_str += "\t\tsuper().__init__()\n"

    # Constructor
    for node in  nodes:
        if type(node) == Layer : 
            code_str += "\t\tself."+node.name+" = "+specify(node)+"\n"
            if(node.activation != 'none'):
                code_str += "\t\tself."+node.name+"_activation = "+specify_act(node.activation)+"\n"
        
    # Forward Method
    code_str += "\n\tdef forward(self"
    for idx in input_var:
        code_str += ", "
        code_str += nodes[idx].name
    code_str += "):\n"

    queue = input_var # Queue for storing nodes.
    
    while(len(queue) != 0): # Topological Sort
        idx = queue[0]
        del(queue[0])
        
        if(type(nodes[idx]) == Layer):
            for bef_node in structure_rev[idx]:
                if type(nodes[bef_node]) == Layer:
                    code_str += "\t\tout_{} = self.{}(out_{})\n".format(nodes[idx].name, nodes[idx].name, nodes[bef_node].name)
                
                elif type(nodes[bef_node]) == Variable:
                    code_str += "\t\tout_{} = self.{}({})\n".format(nodes[idx].name, nodes[idx].name, nodes[bef_node].name)
                
                else:
                    print("ERROR : UNAVAILABLE INPUT")
                    exit(-1)
            
            if nodes[idx].activation != 'none':
                code_str += "\t\tout_{} = self.{}_activation(out_{})\n".format(nodes[idx].name, nodes[idx].name, nodes[idx].name)
                
        elif(type(nodes[idx]) == Variable):
            for bef_node in structure_rev[idx]:
                if type(nodes[bef_node]) == Layer:
                    code_str += "\t\t{} = out_{}\n".format(nodes[idx].name, nodes[bef_node].name)

                elif type(nodes[bef_node]) == Variable:
                    code_str += "\t\t{} = {}\n".format(nodes[idx].name, nodes[bef_node].name)

                else:
                    print("ERROR : UNAVAILABLE INPUT")
                    exit(-1)

        else :
            print("ERROR : UNAVAILABLE INPUT")
        
        for next_node in structure[idx]:
            indegree[next_node] -= 1
            if(indegree[next_node] == 0):
                queue.append(next_node)

    code_str += "\t\treturn "
    
    for i, idx in enumerate(output_var) :

        if(type(nodes[idx]) == Variable):
            code_str += nodes[idx].name

        else :
            code_str += "out_"+nodes[idx].name

        if(i < len(output_var)-1):
            code_str += ", "
    
    return code_str # 일단은 아무 필요 없어는 보여서 이렇게 주기는 했는데, 서버측에서 성공적으로 실행되었는지를 알아보려면 Response 값 등을 리턴하는 것도 좋아는 보임.

    # Topological Sort to produce Forward Method.

####################################### WRITING LOGIC #######################################################

####################################### MAIN LOGIC #######################################################
global result
if(len(sys.argv) == 1):
    print("ERROR : Cannot find JSON string.")
    dummy = ""
    dummy
    exit(-1)
nodes, structure, structure_rev, input_var, output_var, indegree = JsonParse(sys.argv[1])
result = WritePyTorch(nodes, structure, structure_rev, input_var, output_var, indegree)
#print(result)
result