import numpy as np
def arith(arr1,arr2):
    output = 0
    for i in range(len(arr1)):
        output += arr1[i] * arr2[i]
    return output

def twod_aritch(arr1,arr2):
    array1 = arr1.flatten()
    array2 = arr2.flatten()
    return arith(array1, array2)
    
def oneDConv(input, Mask):
    input.insert(0,0)
    input.append(0)
    output = []
    if len(input) == len(Mask):
        output.append(arith(input,Mask))
    else:
        i = 0
        j = len(Mask)
        while j <= len(input):
            arr = input[i:j]
            outputVal = arith(arr, Mask)
            output.append(outputVal)
            i+=1
            j+=1
    print(output)

def twoDConv(input, Mask):
    defStartCol = 0
    defEndCol = len(Mask)
    startRow = 0
    endRow = len(Mask[0])
    startCol = 0
    endCol = len(Mask)
    defArray = []
    TwoD_ConvOutput = []
    Final = []
    while(endRow <= len(input)):
        while(endCol <= len(input[0])):
            output = twod_aritch(input[startRow:endRow,startCol:endCol], Mask)
            defArray.append(output)
            startCol+=1
            endCol+=1
        TwoD_ConvOutput.append(defArray)
        print(TwoD_ConvOutput)
        defArray.clear()
        startCol = defStartCol
        endCol = defEndCol
        startRow += 1
        endRow += 1


def main():
    input = [0.8147, 0.9058, 0.1270, 0.9134, 0.6324, 0.0975, 0.2785, 0.5469, 0.9575, 0.9649]
    mask = [0.6557, 0.0357, 0.8491, 0.9340, 0.6787]

    input2d = np.array([[0.8687,0.1361,0.0760,0.4893,0.1320,0.1690,0.1835,0.3063,0.9390,0.1948],
                        [0.0844,0.8693,0.2399,0.3377,0.9421,0.6491,0.3685,0.5085,0.8759,0.2259],
                        [0.3998,0.5797,0.1233,0.9001,0.9561,0.7317,0.6256,0.5108,0.5502,0.1707],
                        [0.2599,0.5499,0.1839,0.3692,0.5752,0.6477,0.7802,0.8176,0.6225,0.2277],
                        [0.8001,0.1450,0.2400,0.1112,0.0598,0.4509,0.0811,0.7948,0.5870,0.4357],
                        [0.4314,0.8530,0.4173,0.7803,0.2348,0.5470,0.9294,0.6443,0.2077,0.3111],
                        [0.9106,0.6221,0.0497,0.3897,0.3532,0.2963,0.7757,0.3786,0.3012,0.9234],
                        [0.1818,0.3510,0.9027,0.2417,0.8212,0.7447,0.4868,0.8116,0.4709,0.430],
                        [0.2638,0.5132,0.9448,0.4039,0.0154,0.1890,0.4359,0.5328,0.2305,0.1848],
                        [0.1455,0.4018,0.4909,0.0965,0.0430,0.6868,0.4468,0.3507,0.8443,0.9049]])
    mask2d = np.array([[0.9797,0.5949,0.1174,0.0855,0.7303],
                       [0.4389,0.2622,0.2967,0.2625,0.4886],
                       [0.1111,0.6028,0.3188,0.8010,0.5785],
                       [0.2581,0.7112,0.4242,0.0292,0.2373],
                       [0.4087,0.2217,0.5079,0.9289,0.4588]])
    # oneDConv(input,mask)
    twoDConv(input2d,mask2d )
if __name__  == "__main__":
    main()

