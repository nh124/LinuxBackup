import math;
import random;
row = 0
col = 0
weights = [[0 for i in range(9)] for j in range(9)]


weights[1][3] = 0.8 
weights[1][4] = 0.5
weights[1][5] = -0.1
weights[1][6] = 0.7
    
weights[2][3] = -0.3
weights[2][4] = 0.1
weights[2][5] = 0.3
weights[2][6] = 0.9

weights[3][7] = -0.8
weights[3][8] = 0.4
    
weights[4][7] = -0.9
weights[4][8] = -0.4
    
weights[5][7] = -0.6
weights[5][8] = -0.5

weights[6][7] = -0.7
weights[6][8] = -0.2

biasFor3 = -0.9
biasFor4 = -0.8
biasFor5 = 0.8
biasFor6 = -0.9
biasFor7 = 0.7
biasFor8 = 0.4

# rowForFirstDataset is used to interate the entire file 
# and cover all the data points
def trainingDatatset(fileName):
    global row, col;
    with open (fileName) as trainingDataset:
        Davids_Database_During_2020 = [];
        for line in trainingDataset:
            dataSet = [item.strip() for item in line.split(' ')]
            Davids_Database_During_2020.append(dataSet);
        # row = len(Davids_Database_During_2020);
        # col = len(Davids_Database_During_2020[0]);
    return Davids_Database_During_2020;

trainingDatatset1 = trainingDatatset("DataMining/Neural_Network/testingDataset1.txt")
rowForFirstDataset = 0;
inputX = float(trainingDatatset1[rowForFirstDataset][2])
inputY = float(trainingDatatset1[rowForFirstDataset][3])


# Start of Forward propagation
########################################
    # Test case professors values
    #  DataEntries = [1,0,1]
    #     weights = [0.2, -0.3, 0.4, 0.1, -0.5, 0.2, -0.3, -0.2]
    #     Bias = [-0.4, 0.2, 0.1]
        
    #     #               (0.2 * 1)                     +(-0.4*0)                         + (-0.5*1)                    + (-0.4)
    #     newInputFor4 = (weights[0] * DataEntries[0]) + (weights[2] * DataEntries[1]) + (weights[4] * DataEntries[2]) + Bias[0];
    #     outputFor4 = round(1/(1 + math.exp(-(newInputFor4))),3);
        
        
        # print(newInputFor4);
        # print(outputFor4)
    #put into forWardpropagation for results  
########################################

# In the diagram we only have each node in the hidden layer recieves data from 2 nodes
# for example node 3 is getting data from 1 and 2

def outputForNodeCalc(weight1, weight2, inputX, inputY, bias):
   netInput =  (weight1 * inputX) + (weight2 * inputY) + bias;
#    print("(%0.3f * %0.3f) + (%0.3f * %0.3f) + %0.3f = %0.3f" %(weight1, inputX, weight2, inputY, bias, netInput))
   output = round(1/(1 + math.exp(-(netInput))),3);
#    print("1/(1 + e^-(%0.3f)) = %f" %(round(netInput, 3), output ))
   return output;
# outputFor_7 = (weights[3][7] * outputFor_3) + (weights[4][7] * outputFor_4) + (weights[5][7] * outputFor_5) + (weights[6][7] * outputFor_6) + biasFor7
def outputForOuterNode(weight1, weight2, weight3, weight4, input1, input2, input3, input4, bias):
    netInput = (weight1 * input1) + (weight2 * input2) + (weight3 * input3) + (weight4 * input4) + bias
    # print("(%0.3f * %0.3f) + (%0.3f * %0.3f) + (%0.3f * %0.3f) + (%0.3f * %0.3f) + %0.3f = %0.3f" %(weight1, input1, weight2, input2, weight3, input3, weight4, input4, bias, netInput))
    output = round(1/(1 + math.exp(-(netInput))),3);
    # print("1/(1 + e^-(%0.3f)) = %f" %(round(netInput, 3), output ))
    return output
# creating a table to display for data after forward propagation
def tableConstruction(hiddenlayer, outputs):
    table = [[0 for i in range(2)] for j in range(7)]

    table[0][0] = "Unit j"
    table[1][0] = hiddenlayer[0]
    table[2][0] = hiddenlayer[1]
    table[3][0] = hiddenlayer[2]
    table[4][0] = hiddenlayer[3]
    table[5][0] = hiddenlayer[4]
    table[6][0] = hiddenlayer[5]
    
    table[0][1] = "Outputs"
    table[1][1] = outputs[0]
    table[2][1] = outputs[1]
    table[3][1] = outputs[2]
    table[4][1] = outputs[3]
    table[5][1] = outputs[4]
    table[6][1] = outputs[5]

    return table;
# End of Forward propagation

def forwardPropagation():
    global weights, inputX, inputY, biasFor3, biasFor4, biasFor5, biasFor6, biasFor7, biasFor8;
    trainingDataset1 = trainingDatatset("DataMining/Neural_Network/trainingDataset2.txt");
    # The while loops makes sure each weight is unique
    # The loops will do continious check to make sure all the values are unique 
    # This same will have to the biases
    # setting the weights for 3,4,5,6,7,8

        # calculating the output for each Hidden layer and and and outter nodes
        # 3,4,5,6,7,8

        # 16 is the number of weight the entire network has
    # weights = [0 for i in range(16)]
    
    # random weight generator
    # for i in range(len(weights)):
    #     weight = round(random.uniform(-0.9,0.9),1);
    #     while(weight in weights):
    #         weight = round(random.uniform(-0.9,0.9),1);
    #     weights[i] = weight


    # print(weights);
    # The weight are ordred in the forlling order. The is a Static sample data set that could be used to compute the alkgorithm 
    # [0.8, 0.5, -0.1, 0.7, -0.3, 0.1, 0.3, 0.9, -0.8, 0.4, -0.9, -0.4, -0.6, -0.5, -0.7, -0.2]
    # weight[1][3] = weight1_3

    




    
    outputFor_3 = outputForNodeCalc(weights[1][3], weights[2][3], inputX, inputY,  biasFor3)
    outputFor_4 = outputForNodeCalc(weights[1][4], weights[2][4], inputX, inputY,  biasFor4)
    outputFor_5 = outputForNodeCalc(weights[1][5], weights[2][5], inputX, inputY,  biasFor5)
    outputFor_6 = outputForNodeCalc(weights[1][6], weights[2][6], inputX, inputY,  biasFor6)

    outputFor_7 = outputForOuterNode(weights[3][7], weights[4][7], weights[5][7], weights[6][7], outputFor_3, outputFor_4, outputFor_5, outputFor_6, biasFor7)
    outputFor_8 = outputForOuterNode(weights[3][8], weights[4][8], weights[5][8], weights[6][8], outputFor_3, outputFor_4, outputFor_5, outputFor_6, biasFor8)

    hiddenLayers = [3,4,5,6,7,8]
    outputs = [outputFor_3,outputFor_4,outputFor_5,outputFor_6,outputFor_7,outputFor_8]
    forwardPropagationTable = tableConstruction(hiddenLayers, outputs)
    return forwardPropagationTable;
    


# Start of backpropagation

# This fuction will take in the following
# 1. The ouputs for the for the outer nodes
# 2. The output for the inner nodes that are pointing to the outer node
# 3. weather the node being inserted is a outernode or not will be represented by 
# boolean value -> outerNode
# 4. It will also recieve the weight  
# This will be split into multiple functions 
def errorCalculationForOuter(output1):
    errorForOuterNodes = (output1) * (1-output1) * (1-output1) 
    # print("Error Calculation for outer nodes")
    # print("%0.3f * (1-%0.3f) * (1 - %0.3f) = %0.3f"%(output1,output1,output1, errorForOuterNodes))
    return errorForOuterNodes;
# error or parent represent the nodes this node is pointing to
def errorCalculationForinnerNodes(errorOfParent1, errorOfParent2, output, weight1, weight2):
    # print("Error calculation for Inner nodes")
    errorCalculationForinnerNodes = round(output * (1 - output) * ((errorOfParent1) * (weight1) + (errorOfParent2) * (weight2)), 3)
    # round(errorCalculationForinnerNodes, 4)
    # print("%0.3f * (1-%0.3f) * ((%0.3f * %0.3f) + (%0.3f * %0.3f)) = %0.3f" %(output, output, errorOfParent1, weight1, errorOfParent2, weight2, errorCalculationForinnerNodes))
    return errorCalculationForinnerNodes;

# This function is update the weights 
# The weigts will be updated dependent of 3 values
    # 1. Current weight
    # 2. Learning Rate set to 0.8
    # 3. Output of their parent or the node its pointing to
    # 4. Output of the node itself 
def update_weights(currentWeight, learningRate,outputOfParent, outputOfNode):
    updated_weight = round(currentWeight + learningRate * outputOfParent * outputOfNode,3);
    # print("%0.3f + %0.3f * %0.3f * %0.3f" %(currentWeight, learningRate, outputOfParent, outputOfNode));
    return updated_weight

def bias_errorRate(currectBiasErrorRate, learningRate, errorRateOFNode):
    updatedBias = currectBiasErrorRate + learningRate * errorRateOFNode;
    return updatedBias;

def back_propagation():
    global inputX, inputY, weights, biasFor3, biasFor4, biasFor5, biasFor6, biasFor7, biasFor8;

    learningRate = 0.8
    # Retriving the values of forward propagation 
    outputTable = forwardPropagation();
    errorOF_7 = errorCalculationForOuter(outputTable[5][1])
    errorOF_8 = errorCalculationForOuter(outputTable[6][1])
    
    errorOF_3 = errorCalculationForinnerNodes(errorOF_7, errorOF_8, outputTable[1][1], weights[3][7], weights[3][8])
    errorOF_4 = errorCalculationForinnerNodes(errorOF_7, errorOF_8, outputTable[2][1], weights[4][7], weights[4][8])
    errorOF_5 = errorCalculationForinnerNodes(errorOF_7, errorOF_8, outputTable[3][1], weights[5][7], weights[5][8])
    errorOF_6 = errorCalculationForinnerNodes(errorOF_7, errorOF_8, outputTable[4][1], weights[6][7], weights[6][8])

    # print("%0.3f + %0.3f * %0.3f * %0.3f = " %(weights[3][7], learningRate, outputTable[5][1], outputTable[1][1]))
    # print("before")
    # print(weights[3][7], weights[4][7], weights[5][7], weights[6][7],
    #       weights[3][8], weights[4][8], weights[5][8], weights[6][8]
    # )

    weights[3][7] = update_weights(weights[3][7], learningRate, errorOF_7, outputTable[1][1]);
    weights[4][7] = update_weights(weights[4][7], learningRate, errorOF_7, outputTable[2][1]);
    weights[5][7] = update_weights(weights[5][7], learningRate, errorOF_7, outputTable[3][1]);
    weights[6][7] = update_weights(weights[6][7], learningRate, errorOF_7, outputTable[4][1]);

    weights[3][8] = update_weights(weights[3][8], learningRate, errorOF_8, outputTable[1][1]);
    weights[4][8] = update_weights(weights[3][8], learningRate, errorOF_8, outputTable[2][1]);
    weights[5][8] = update_weights(weights[3][8], learningRate, errorOF_8, outputTable[3][1]);
    weights[6][8] = update_weights(weights[3][8], learningRate, errorOF_8, outputTable[4][1]);

    # print("After")
    # print(weights[3][7], weights[4][7], weights[5][7], weights[6][7],
    #       weights[3][8], weights[4][8], weights[5][8], weights[6][8]
    # )
    weights[1][3] = update_weights(weights[1][3], learningRate, errorOF_3, inputX);
    weights[1][4] = update_weights(weights[1][4], learningRate, errorOF_4, inputX);
    weights[1][5] = update_weights(weights[1][5], learningRate, errorOF_5, inputX);
    weights[1][6] = update_weights(weights[1][6], learningRate, errorOF_6, inputX);

    weights[2][3] = update_weights(weights[2][3], learningRate, errorOF_3, inputY);
    weights[2][4] = update_weights(weights[2][4], learningRate, errorOF_4, inputY);
    weights[2][5] = update_weights(weights[2][5], learningRate, errorOF_5, inputY);
    weights[2][6] = update_weights(weights[2][6], learningRate, errorOF_6, inputY);
    
    # print(biasFor3, biasFor4, biasFor5, biasFor6, biasFor7, biasFor8)
    #updating the bias
    biasFor3 = bias_errorRate(biasFor3, learningRate, errorOF_3);
    biasFor4 = bias_errorRate(biasFor4, learningRate, errorOF_4);
    biasFor5 = bias_errorRate(biasFor5, learningRate, errorOF_5);
    biasFor6 = bias_errorRate(biasFor6, learningRate, errorOF_6);
    biasFor7 = bias_errorRate(biasFor7, learningRate, errorOF_7);
    biasFor8 = bias_errorRate(biasFor8, learningRate, errorOF_8);

    # print(biasFor3, biasFor4, biasFor5, biasFor6, biasFor7, biasFor8)

# end of backpropagation

def results():
    i = 0;
    global inputX, inputY, rowForFirstDataset, inputX, inputY 

    while(rowForFirstDataset < len(trainingDatatset1)):  
        print("Initial Outputs after first propagation ")
        print("Dataset being used: (%0.3f, %0.3f), row = %d" %(inputX, inputY, rowForFirstDataset))
        Initial_Array = forwardPropagation();
        for row in Initial_Array:
            print(row)
        
        print("-------------------------------------------");
        print("Outputs after 1000th forward and backward propagation ")
        print("Dataset being used: (%0.3f, %0.3f)" %(inputX, inputY))
        # while(i < 1000):
        #     back_propagation();
        #     Initial_Array2 = forwardPropagation();
        #     i+=1
        # for row in Initial_Array2:
        #     print(row)
        
        print("###############################################")
        print("###############################################")
        
        rowForFirstDataset += 1;
        if((rowForFirstDataset + 1) <= len(trainingDatatset1)):
            inputX = float(trainingDatatset1[rowForFirstDataset][2])
            inputY = float(trainingDatatset1[rowForFirstDataset][3])
        

results();






# back_propagation();