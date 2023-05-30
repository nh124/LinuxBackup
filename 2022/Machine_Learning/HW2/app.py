from threading import local
from matplotlib import pyplot as plt
import csv
import numpy as np
import math
from scipy.misc import derivative
XGlobal = []
YGlobal = []
XData1 = []
YData1 = []
XData2 = []
YData2 = []
classifier = []

# question1
def classification():
    with open('classification.csv', 'r') as csv_file:
        csv_reader = csv.reader(csv_file)
        for line in csv_reader:
            XGlobal.append(float(line[0]))
            YGlobal.append(float(line[1]))
            classifier.append(float(line[2]))
            if int(line[2]) == 0:
                XData1.append(float(line[0]))
                YData1.append(float(line[1]))
            elif int(line[2]) == 1:
                XData2.append(float(line[0]))
                YData2.append(float(line[1]))
    return XData1, YData1, XData2, YData2, XGlobal, YGlobal, classifier

def dataset1():   
    data = classification()
    XMatrix = data[0]
    XMatrix2d = []

    for i in range(len(XMatrix)):
        XMatrix2d.append([1, XMatrix[i]])

    XMatrix = np.array(XMatrix2d)
    YMatrix = np.array(data[1])
    Xtranspose = XMatrix.transpose()
    mul = np.matmul(Xtranspose, XMatrix)
    inverse = np.linalg.inv(mul)
    val = np.matmul(inverse, Xtranspose)
    weight = np.matmul(val, YMatrix)
    return weight

def dataset2():   
    data = classification()
    XMatrix = data[2]
    XMatrix2d = []

    for i in range(len(XMatrix)):
        XMatrix2d.append([1, XMatrix[i]])

    XMatrix = np.array(XMatrix2d)
    YMatrix = np.array(data[3])
    Xtranspose = XMatrix.transpose()
    mul = np.matmul(Xtranspose, XMatrix)
    inverse = np.linalg.inv(mul)
    val = np.matmul(inverse, Xtranspose)
    weight = np.matmul(val, YMatrix)
    return weight

def globalFunc():   
    data = classification()
    XMatrix = data[4]
    XMatrix2d = []

    for i in range(len(XMatrix)):
        XMatrix2d.append([1, XMatrix[i]])

    XMatrix = np.array(XMatrix2d)
    YMatrix = np.array(data[5])
    Xtranspose = XMatrix.transpose()
    mul = np.matmul(Xtranspose, XMatrix)
    inverse = np.linalg.inv(mul)
    val = np.matmul(inverse, Xtranspose)
    weight = np.matmul(val, YMatrix)
    return weight
def plot():
    classification()
    line1 = dataset1()
    line2 = dataset2()
    line3 = globalFunc()

    x1 = np.linspace(-0.8, 0.4, 100)
    y1 = line1[1]*x1+line1[0]
    print(line1[1], line1[0])
    print("%fx + %f" %(line2[1], line2[0]))
    

    plt.scatter(XData1, YData1, c='blue')
    print(XData1)
    print()
    print(YData1)   
    print()
    print(XData2)
    print()
    print(YData2) 
    # plt.axvline(x=0, color= "black", linestyle = "solid")
    plt.scatter(XData2, YData2, c='red')
    # plt.axhline(y=0, color= "black", linestyle = "solid")

    plt.plot(x1, y1, '-b', label='y=2x+1')

    plt.show()
    plt.savefig("name.png")

def boundaryCalculation():
    AllX = classification()[4]
    XBoundary = AllX
    YBoundary = []
    for i in XBoundary:
        eq = 1.17*i+0.4
        YBoundary.append(eq)
    return XBoundary, YBoundary

def EDcalculation():
    XGlobal = classification()[4]
    YGlobal = classification()[5]

    XBoundary = boundaryCalculation()[0]
    YBoundary = boundaryCalculation()[1]
    eqDis = []
    for i in range(len(XGlobal)):
        dis = (XGlobal[i] - XBoundary[i])**2 + (YGlobal[i] - YBoundary[i])**2
        finalDis = math.sqrt(dis)
        eqDis.append(finalDis)
    return eqDis



# plot()
# print(EDcalculation())


# Question 1b
# list = EDcalculation()
# newlist = np.array(list)
# it = 1;
# for i in newlist:
#     print("Point: " + str(it) + "\'s " + "distance to boundary aka Euclidean distance is:" +str(i))
#     it+=1;


#question2
def function(X):
    return np.sin(X*math.pi)/(math.pi*X)
def deriv(X):
    pi= math.pi
    return (np.cos(X*pi)/X) - (np.sin(X*pi)/((pi)*(X**2)))


X = [i for i in range(-10,10)]

# minSlope = deriv(X[-4])

# localMins = []

# for i in X:
#     slope = deriv(X[i])
#     # print(i, slope)
#     # if slope <= 0.02 or slope <= -0.02:
#     localMins.appned(1)

# print(localMins)


localMins =[]
for i in X:
    slope = round(deriv(i),2)
    if(i == 3 or i == 5 or i == 7 ):
        Y = function(i) + 0.001
        localMins.append([i, slope, Y])

for i in localMins:
    print(i)

