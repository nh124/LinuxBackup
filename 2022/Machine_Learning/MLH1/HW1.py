from matplotlib import pyplot as plt
import matplotlib.pyplot as plt
import numpy as np
import math

def plot():
  x = [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]
  y = [0.8750, 0.0753, -0.7305, -0.5486, 0.1903, 1.0873, 0.2081, -0.7886, -0.5698, 0.3331, 0.7926]
  
  xFunction = np.linspace(0, 1, 11)
  yFunction = 0.0581*xFunction + 0.05496818

  yFunArr2 = []
  for i in range(len(x)):
    yFunArr2.append(0.44534056 - 2.54438252*xFunction[i] + 2.60248252*math.pow(xFunction[i], 2))
    
  yFunArr3 = [] 
  for i in range(len(x)):
    yFunArr3.append(0.46130839 -2.79809363*xFunction[i] +   3.26780886*math.pow(xFunction[i], 2) - 0.44355089*math.pow(xFunction[i], 3))
  
  yFunArr4 = [] 
  for i in range(len(x)):
    yFunArr4.append(0.98183147  -20.87181158*xFunction[i] +  93.6363986*math.pow(xFunction[i], 2)  -145.03329448*math.pow(xFunction[i], 3) +   72.2948718*math.pow(xFunction[i], 4))

  yFunArr5 = [] 
  for i in range(len(x)):
    yFunArr5.append(1.03651416  -25.15832707*xFunction[i] + 128.95230405*math.pow(xFunction[i], 2) -244.5254152*math.pow(xFunction[i], 3) +    186.21714742*math.pow(xFunction[i], 4) -45.5689102*math.pow(xFunction[i], 5))

  yFunArr6 = [] 
  for i in range(len(x)):
   yFunArr6.append((8.65528810*math.exp(-1))+ (8.90912804*math.exp(-1))*xFunction[i] - (2.85781252*math.exp(2))*math.pow(xFunction[i], 2) + (1.51927080*math.exp(3))*math.pow(xFunction[i], 3) - (3.15700142*math.exp(3))*math.pow(xFunction[i], 4) + (2.81190494*math.exp(3))*math.pow(xFunction[i], 5) - (8.35722017*math.exp(3))*math.pow(xFunction[i], 6) - (6.16655580*math.exp(1))*math.pow(xFunction[i], 7))
    
  yFunArr7 = [] 
  for i in range(len(x)):
    yFunArr7.append((8.76978611*math.exp(-1)) -(2.64807024*math.exp(1))*xFunction[i]  +(4.49883483*math.exp(2))*math.pow(xFunction[i], 2) -(4.13703141*math.exp(3))*math.pow(xFunction[i], 3) + (1.84321962*math.exp(4))*math.pow(xFunction[i], 4) - (4.24420144*math.exp(4))*math.pow(xFunction[i], 5) + (5.21500243*math.exp(4))*math.pow(xFunction[i], 6) -(3.25483288*math.exp(4))*math.pow(xFunction[i], 7) + (8.12166598*math.exp(3))*math.pow(xFunction[i], 8))

  yFunArr8 = [] 
  for i in range(len(x)):
    yFunArr8.append((8.75432639*math.exp(-1)) +  (8.62076799*math.exp(0))*xFunction[i] -(4.00246511*math.exp(2))*math.pow(xFunction[i], 2) + (3.77386003*math.exp(3))*math.pow(xFunction[i], 3) -(1.95558469*math.exp(4))*math.pow(xFunction[i], 4) + (6.25424874*math.exp(4))*math.pow(xFunction[i], 5) -(1.21279167*math.exp(5))*math.pow(xFunction[i], 6) +   (1.36488640*math.exp(5))*math.pow(xFunction[i], 7) -(8.14928153*math.exp(4))*math.pow(xFunction[i], 8) +  (1.99143856*math.exp(4))*math.pow(xFunction[i], 9)) 

   
                                                                                                                                                                                                           
  fig = plt.figure(figsize = (10, 5))
  plt.scatter(x,y)
  plt.plot(x,y, label="Base")
  plt.plot(xFunction, yFunction, '--', color="red", label="M=1")
  plt.plot(xFunction, yFunArr2, '--', color="green", label="M=2" )
  plt.plot(xFunction, yFunArr3, '--',  color="yellow", label="M=3")
  plt.plot(xFunction, yFunArr4, '--', color="black", label="M=4")
  plt.plot(xFunction, yFunArr5, '--', color="gray", label="M=5")
  plt.plot(xFunction, yFunArr6, '--', color="blue", label="M=6")
  plt.plot(xFunction, yFunArr7, '--', color="red", label="M=7")
  plt.plot(xFunction, yFunArr8, '--',  color="gray", label="M=8")
  plt.legend(loc="lower right")
  plt.xlabel("X-Values")
  plt.ylabel("Y-Values")
  plt.title("Polynomial model with regularization")
  plt.show()

#classification
# XOdd_blue = [0.40179, 0.38619, 0.16689, 0.094629, 0.7696, 0.74037, 0.82408, 0.29337, 0.52303, 0.83184, 0.557, 0.68057, 0.45643, 0.5386, 0.75522, 0.23478, 0.051436, 0.60198, 0.98828, 0.40951, 0.54088, 0.21928, 0.095949, 0.74851, 0.33813]

# YOdd_blue = [0.79258, 0.22346, 0.58452, 0.29046, 0.86206, 0.99119, 0.82721, 0.24895, 0.39908, 0.80052, 0.82144, 0.35451, 0.57224, 0.74247, 0.38913, 0.95634, 0.84972, 0.62232, 0.96347, 0.5005, 0.090166, 0.88439, 0.78172, 0.61982, 0.44566]

# XEven_red = [0.40637, 0.6098, 0.18809, 0.32319, 0.23412, 0.69282, 0.82798, 0.30937, 0.3253, 0.81029, 0.26296, 0.23365, 0.38457, 0.9917, 0.98045, 0.52856, 0.75688, 0.85717, 0.92948, 0.00034146, 0.20773, 0.32581, 0.74753, 0.5433, 0.83233]

# YEven_red = [0.32904, 0.31239, 0.82991, 0.40255, 0.61474, 0.2037, 0.67586, 0.47579, 0.59944, 0.10507, 0.84109, 0.43007, 0.70082, 0.75788, 0.4293, 0.57297, 0.27635, 0.58836, 0.085903, 0.52159, 0.90467, 0.43899, 0.14847, 0.26062, 0.844]
#   # offset=0.266

# XOdd_blue_Extra = [0.369, 0.44094, 0.12403, 0.8569, 0.69163, 0.28327, 0.68528, 0.61087, 0.19343, 0.34626, 0.15572, 0.62492, 0.80511, 0.95079, 0.75515, 0.83113, 0.45731, 0.93218, 0.89542, 0.58275, 0.034866, 0.40773, 0.74615, 0.14391, 0.25448]

# YOdd_blue_Extra = [0.55257, 0.89283, 0.5464, 0.6228, 0.74587, 0.82239, 0.41443, 0.78137, 0.74487, 0.2426, 0.22507, 0.28708, 0.051314, 0.1629, 0.16756, 0.99933, 0.047078, 0.39784, 0.2296, 0.68319, 0.43797, 0.0058343, 0.80108, 0.93247, 0.82645]

# XEven_red_Extra = [0.20835, 0.9562, 0.47076, 0.04339, 0.97899, 0.13378, 0.90945, 0.89998, 0.75442, 0.41863, 0.819, 0.73856, 0.067223, 0.49758, 0.74241, 0.1565, 0.6181, 0.83509, 0.58252, 0.85493, 0.88542, 0.036382, 0.15483, 0.60596, 0.32415]

# YEven_red_Extra = [0.95754, 0.3565, 0.34668, 0.79662, 0.12554, 0.025151, 0.73141, 0.36729, 0.89227, 0.1296, 0.35001, 0.92749, 0.59267, 0.83841, 0.5022, 0.35541, 0.21366, 0.33367, 0.93612, 0.96211, 0.94034, 0.61031, 0.23298, 0.76326, 0.57346]





# def Classification(file, XOdd_blue, YOdd_blue, XEven_red, YEven_red):
#   if(file == 'classification'):
#     print("in")
#     plt.axvspan(0,0.26, ymin=0.745, ymax=1, color='blue' ,alpha=0.2)
#     plt.axvspan(0.26,0.52, ymin=0.745, ymax=1, color='gray' ,alpha=0.2)
#     plt.axvspan(0.52,0.78, ymin=0.745, ymax=1, color='blue' ,alpha=0.2)
#     plt.axvspan(0.78,1.04, ymin=0.745, ymax=1, color='blue' ,alpha=0.2)

#     plt.axvspan(0,0.26, ymin=0.479, ymax=0.745, color='gray' ,alpha=0.2)
#     plt.axvspan(0.26,0.52, ymin=0.479, ymax=0.745, color='red' ,alpha=0.4)
#     plt.axvspan(0.52,0.78, ymin=0.479, ymax=0.745, color='blue' ,alpha=0.2)
#     plt.axvspan(0.78,1.04, ymin=0.479, ymax=0.745, color='red' ,alpha=0.4)

#     plt.axvspan(0,0.26, ymin=0.224, ymax=0.479, color='red' ,alpha=0.2)
#     plt.axvspan(0.26,0.52, ymin=0.224, ymax=0.479, color='red' ,alpha=0.4)
#     plt.axvspan(0.52,0.78, ymin=0.224, ymax=0.479, color='gray' ,alpha=0.2)
#     plt.axvspan(0.78,1.04, ymin=0.224, ymax=0.479, color='red' ,alpha=0.4)
    
#     plt.axvspan(0,0.26, ymin=0, ymax=0.224, color='red' ,alpha=0.2)
#     plt.axvspan(0.26,0.52, ymin=0, ymax=0.224, color='blue' ,alpha=0.4)
#     plt.axvspan(0.52,0.78, ymin=0, ymax=0.224, color='red' ,alpha=0.2)
#     plt.axvspan(0.78,1.04, ymin=0, ymax=0.224, color='red' ,alpha=0.4)
#   else:
#     print("in_")
#     plt.axvspan(0,0.26, ymin=0.745, ymax=1, color='gray' ,alpha=0.2)
#     plt.axvspan(0.26,0.52, ymin=0.745, ymax=1, color='blue' ,alpha=0.2)
#     plt.axvspan(0.52,0.78, ymin=0.745, ymax=1, color='red' ,alpha=0.2)
#     plt.axvspan(0.78,1.04, ymin=0.745, ymax=1, color='red' ,alpha=0.2)

#     plt.axvspan(0,0.26, ymin=0.479, ymax=0.745, color='gray' ,alpha=0.2)
#     plt.axvspan(0.26,0.52, ymin=0.479, ymax=0.745, color='gray' ,alpha=0.4)
#     plt.axvspan(0.52,0.78, ymin=0.479, ymax=0.745, color='gray' ,alpha=0.2)
#     plt.axvspan(0.78,1.04, ymin=0.479, ymax=0.745, color='gray' ,alpha=0.4)

#     plt.axvspan(0,0.26, ymin=0.224, ymax=0.479, color='gray' ,alpha=0.2)
#     plt.axvspan(0.26,0.52, ymin=0.224, ymax=0.479, color='gray' ,alpha=0.4)
#     plt.axvspan(0.52,0.78, ymin=0.224, ymax=0.479, color='blue' ,alpha=0.2)
#     plt.axvspan(0.78,1.04, ymin=0.224, ymax=0.479, color='red' ,alpha=0.4)
    
#     plt.axvspan(0,0.26, ymin=0, ymax=0.224, color='red' ,alpha=0.2)
#     plt.axvspan(0.26,0.52, ymin=0, ymax=0.224, color='blue' ,alpha=0.4)
#     plt.axvspan(0.52,0.78, ymin=0, ymax=0.224, color='blue' ,alpha=0.2)
#     plt.axvspan(0.78,1.04, ymin=0, ymax=0.224, color='blue' ,alpha=0.4)
      


#   # plt.axvspan(0,0.26, ymin=0.745,color='blue' ,alpha=0.2)
#   # plt.axvspan(0,0.26, ymin=0.745,color='blue' ,alpha=0.2)
  





#   # plt.axvline(0.26)
#   # plt.axvline(0.52)
#   # plt.axvline(0.78)

  
  
#   # plt.axhline(y = 0.26)
#   # plt.axhline(y = 0.52)
#   # plt.axhline(y = 0.78)

#   plt.scatter(XOdd_blue, YOdd_blue, c='blue')
#   plt.scatter(XEven_red, YEven_red, c='red')
  
#   plt.show()
# # Classification('classification',XOdd_blue, YOdd_blue, XEven_red, YEven_red)

# Classification("classification_Extra",XOdd_blue_Extra, YOdd_blue_Extra, XEven_red_Extra, YEven_red_Extra)

plot()
