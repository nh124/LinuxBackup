import os
# Question 1
import math
def vowelsAndConsCount(word):
    vowels = ['a','e','i','o', 'u']
    vowelsCap = ['A','E','I','O', 'U']
    specialChar = ['!', '.', ',', '+', '-', '*', '%', '&', '/', ';', ':', '?', '=']
    vowelsCount = 0
    constCount = 0
    for i in range(len(word)):      
        if(word[i] in vowels or word[i] in vowelsCap ):
            vowelsCount += 1
        elif(word[i] not in specialChar):
            constCount += 1
    if(vowelsCount > constCount):
        return True;
    elif(vowelsCount < constCount):
        return False;
    else:
        return None;

 # Question 2
def cylinderVolume(R, H):
    vol = (math.pi*H*R**2)
    return vol;


# Question 3
def stringMerger(stringlist):
    seperator = ", "
    return seperator.join(stringlist)
    # string = ""
    # for i in range(len(stringlist)):
    #    string += stringlist[i] 
    #    if(i != len(stringlist)-1):
    #         string += ", "
    #    else:
    #        string += "."
    # print(string)

# Question 4
def listListSeperator(NestedList):
    string = ','.join(str(item) for innerlist in NestedList for item in innerlist)
    return string
    # seperator = ","
    # for innerlist in NestedList:
    #     for items in innerlist:
    #         print(seperator.join(str(items)), end= " ")


    # string = ""
    # for i in range(len(NestedList)):
    #     for k in range(len(NestedList[i])):
    #         string += NestedList[i][k]
    #         string += ", "
    # print(string)
   

# Question 5
def CSVConversion(filename):
    string = ""
    list = []
    for i in range(len(filename)):
        for j in range(len(filename[i])):
            string += filename[i][j]
            if(filename[i][j] == "," or filename[i][j] == "."):
                l = len(string)
                string = string[:l-1]
                list.append(string)
                string = " "
    return list

#Question 6
def divide(num1, num2):
    sol = 0
    try:
        sol = num1 / num2
        return sol
    except:
        return -1

#Question 7
def duplicateDetection(list):
    uniquelist = []
    for i in list:
        if(i not in uniquelist):
            uniquelist.append(i)
    return uniquelist

# Question 8
def createDirectory(dir):
    try:
        if not os.path.exists(dir):
            os.makedirs(dir)
            return dir + " successfully created!"
        else:
            return dir + " Already exists!"
    except:
        return -1



# Question 1
state = vowelsAndConsCount("Helloo!"); 
if(state == True):
    print("Since the state is %r the string has more vowles\n" %(state))
elif(state == False):
    print("Since the state is %r the string has more constants\n" %(state))
else:
    print("Since the state is %r the string has equal number of vowles and constants\n" %(state))

# Question 2
vol = cylinderVolume(10, 12)
print("The volume of the cylinder = %f\n" %vol)


# Question 3
stringlist = ["I love computer science", "I love logic", "I love Math"];
stringJoin = stringMerger(stringlist)
print("String list given: ", stringlist,  "\nString Joined: " + stringJoin + "\n")


# Question 4
stringNestedlist = [["I love computer science", "Hello"], ["I love logic", "Foo"], ["I love Math", "poo"]];
NestedStringJoin = listListSeperator(stringNestedlist)
print("Nested string list given: ", stringNestedlist , "\nNested String Joined: " + NestedStringJoin + "\n")

#Question5
string = "Hello,Hi,How,What,when."
csvToList = CSVConversion(string)
print("String conversion from string " + string + " to list " , csvToList , "\n")

#Queston 6
val1 = 12
val2 = 3
value = divide(val1, val2)
if(value != -1):
    print("%d/%d = %d\n"  %(val1, val2, value))

#Question 7
dublist = [1,1,2,2,3,3,4,4]
uniqueList = duplicateDetection(dublist)
print("list given: " , dublist , "\nunique list: " , uniqueList , "\n")

#Question 8
dir = "./testDirectory2"
stateOfFileCreation = createDirectory(dir)
if(stateOfFileCreation == -1):
    print("Error creating " + dir + "\n");
else:
    print(stateOfFileCreation + "\n");

