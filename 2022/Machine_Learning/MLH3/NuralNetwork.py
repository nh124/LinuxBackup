import numpy as np
import math
from sympy import symbols, diff

def ReLU(x):
    return max(0,x)

def TanH(x):
    denom = 1 + math.exp(-2*x)
    output = (2/denom) -1
    return output

def SofMax(layer):
    sumLayer = 0
    normalizedLayer = []
    for value in layer:
        sumLayer += value
    for value in layer:
        newValue = value / sumLayer
        normalizedLayer.append(newValue)
    return normalizedLayer

def SQErrorCalc(T, Y):
    sequeredError = []
    for value in range(len(T)):
        error = 2*(T[value]-Y[value])*(T[value])
        sequeredError.append(error)
    return sequeredError
def partialErrorHiddenLayerDiff():
    x_n,w_n = symbols('x_n w_n', real=True)
    f = x_n*w_n
    partialDiff = diff(f, w_n)
    return partialDiff

def partialErrorOutputLayerDiff():
    z_n,w_n = symbols('z_n w_n)', real=True)
    f = z_n*w_n
    partialDiff = diff(f, z_n)
    return partialDiff

def ErrorDeff():
    t_n,y = symbols('t_n y', real=True)
    f = (t_n - y)**2
    partialDiff = diff(f, t_n)
    partialDiff = str(partialDiff)
    PEHL = partialErrorHiddenLayerDiff()
    PEOL = partialErrorOutputLayerDiff()
    
    strPEOL = str(PEOL)
    strPEHL = str(PEHL)
    partialDiff =  partialDiff + " * " + strPEOL + " * " + strPEHL
    return partialDiff 

def HiddenLayerPartialErrorCalc(weights,T, Y):
    partialErrors = []
    SQError = SQErrorCalc(T,Y)
    for i in range(4):
        vector = weights[i]
        weightSum = 0
        weightSum2 = 0
        for weight in vector:
            weightSum += weight
        for errors in SQError:
           weightSum2 += weightSum * errors
        partialErrors.append(weightSum2)
    for val in range(len(partialErrors)):
        output = TanH(partialErrors[val])
        partialErrors[val] = output
    return partialErrors

def OuterLayerPartialErrorCalc(HLOutput, inputs):
    partialErrors = []
    for i in range(4):
        HLO = HLOutput[i]
        mul = 0
        for input in inputs:
            mul += input * HLO
        partialErrors.append(mul)
    return partialErrors

def hidderLayerOutput(WH, inputs):
    hiddenLayer = []
    vector = []
    for i in range(len(WH[0])):
        vector = WH[:,i]
        sum = 0
        for input in range(len(inputs)):
            sum += inputs[input]*vector[input]
        hiddenLayer.append(sum)
    return hiddenLayer

def outputLayeroutput(WO, hiddenLayer):
    outputLayer = []
    vector2 = []
    for i in range(len(WO[0])):
        vector2 = WO[:,i]
        sum = 0
        for input in range(len(hiddenLayer)):
            sum += hiddenLayer[input]*vector2[input]
        outputLayer.append(sum)
    return outputLayer

def backwardPropagation(WH, input, T, Y):
    hiddenLayer = hidderLayerOutput(WH, input)
    hiddenLayerPartialError = HiddenLayerPartialErrorCalc(WH, T, Y)
    outerLayerPartialError = OuterLayerPartialErrorCalc(hiddenLayer, input)
    return hiddenLayerPartialError, outerLayerPartialError

def forwardPropagation(WH, WO, inputs):
    for i in range(len(WH)):
        for j in range(len(WH[i])):
            print(WH[i][j] , " ")
        print()
    hiddenLayer = hidderLayerOutput(WH, inputs)
    print("HiddenLayer before activation: " + str(hiddenLayer))
    for val in range(len(hiddenLayer)):
        output = TanH(hiddenLayer[val])
        hiddenLayer[val] = output
    print("HiddenLayer after activation: " + str(hiddenLayer))
    outputLayer = outputLayeroutput(WO, hiddenLayer)
    print("outputLayer before activation: " + str(outputLayer))
    outputLayer = SofMax(outputLayer)
    return outputLayer

def newForwardPropagation(WH, WO, inputs, Target, output):
    hiddenLayerError = backwardPropagation(WH, inputs, Target, output)[0]
    outerLayerError = backwardPropagation(WH, inputs, Target, output)[1]
    for i in range(len(WH)):
        currentError = hiddenLayerError[i]
        for j in range(len(WH[i])):
            WH[i][j] = WH[i][j] * currentError
    outerLayerError.append(0.1)
    for i in range(len(WO)):
        currentError = outerLayerError[i]
        for j in range(len(WO[i])):
            WO[i][j] = WO[i][j] * currentError

    hiddenLayer = hidderLayerOutput(WH, inputs)
    print("HiddenLayer before activation: " + str(hiddenLayer))
    for val in range(len(hiddenLayer)):
        output = TanH(hiddenLayer[val])
        hiddenLayer[val] = output
    print("HiddenLayer after activation: " + str(hiddenLayer))
    outputLayer = outputLayeroutput(WO, hiddenLayer)
    print("outputLayer before activation: " + str(outputLayer))
    outputLayer = SofMax(outputLayer)
    return outputLayer

def main():
    WH = np.array(
        [
            [0.7,1.2,0.95,2.3,0.89],
            [0.15,0.12,0.25,1.4,0.7],
            [0.27,0.6,0.32,1.7,0.21],
            [0.01,0.81,0.19,0.33,1.1]
        ]
    )
    WO = np.array(
        [
            [1.3,0.24,1.4],
            [0.37,1.5,0.67],
            [0.74,0.9,0.32],
            [0.46,0.48,0.1],
            [0.17,1.9,0.15],
        ]
    )
    Target = [1,2,3]
    inputs = [0.1, 0.2, 0.3, 0.4]
    output = forwardPropagation(WH, WO, inputs)
    newOutput = newForwardPropagation(WH, WO, inputs, Target, output)
    print("output layer after activation " + str(output))
    hiddenLayerError = backwardPropagation(WH, inputs, Target, output)[0]
    outerLayerError = backwardPropagation(WH, inputs, Target, output)[1]
    print("Hidden Layer errors " + str(hiddenLayerError))
    print("outer Layer errors " + str(outerLayerError))
    print("New output with adjusted error: " + str(newOutput))

    ## partial Error for outerLayer = outputofhiddenLayer * Input
    ## partial Error for hiddenLayer = Input**2
if __name__ == "__main__":
    main()
