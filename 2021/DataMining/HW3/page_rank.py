numberOfNode = 0; # takes in how many pages
nodeCon_b4_transpose = [[0 for i in range(numberOfNode)] for j in range(numberOfNode)]; # creates a square matrix for number of pages
index = 0; # iterator to start indexloop through array rows
decayFactor_c = 0.85; 
rankRow = 2; # The rank table will be 2 by (number of nodes)
numberOfIterations = 30;
# used to retrive values from the matrix 
calcRow = 0;
calcCol = 0;
val = 0; # Page Rank
iteration = 0; # iterates to number of iterations
i = 1;


choice = int(input("1. Use sample page for rank graph.\n2. Use my own page rank graph.\nInput: "));
# sample code
sample = [[0, 0, 0, 0.5, 0],
        [1.0, 0, 0, 0, 0],
        [0, 0.5, 0, 0, 1.0],
        [0, 0.5, 1.0, 0, 0],
        [0, 0, 0, 0.5, 0]];



# function used to transpose the matrix
def transpose(matrixA, matrixB):
    for i in range(numberOfNode):
        for j in range(numberOfNode):
            matrixB[i][j] = matrixA[j][i];

def construction():
    global index, nodeCon, numberOfNeigh, numberOfNode;
    numberOfNode = int(input("Please enter how many nodes you graphs has: "));
    # initial values are set here from the following questions:
    nodeCon = [[0 for i in range(numberOfNode)] for j in range(numberOfNode)]; 
    while index < numberOfNode:
        numberOfNeigh = int(input("How many nodes does node #" + str(index+1) + " pointing to? "));
        while i <= numberOfNeigh:
            if(i == 1):
                val = int(input("Please enter the " + str(i) + "st neighbor that node " +  str(index+1) + " pointes to: "));
            elif(i == 2):
                val = int(input("Please enter the " + str(i) + "nd neighbor that node " +  str(index+1) + " pointes to: "));
            elif(i == 3):
                val = int(input("Please enter the " + str(i) + "rd neighbor that node " +  str(index+1) + " pointes to: "));
            else:
                val = int(input("Please enter the " + str(i) + "th neighbor that node " +  str(index+1) + " pointes to: "));
            # divide by number of neighbors based to determine the probability or going to one or either
            # index represens the row and val is entered by user which is subtracted by to to match the 0 numbering system
            nodeCon_b4_transpose[index][val-1] = (1/numberOfNeigh); 
            i+=1;
        
        i = 1;
        index += 1;

    print("Before Transpose");
    for row in nodeCon_b4_transpose:
        print(row);

    transpose(nodeCon_b4_transpose,nodeCon);

    print("After Transpose");
    print();
    for row in nodeCon:
        print(row);
    calculation();


def calculation():
    global copy_of_nodeCon, pageRank, calcCol, calcRow, iterations;
    copy_of_nodeCon = nodeCon.copy(); # creates a copy of nodeCon to save the initial values before any alterations 
    # an array holding all the probability. probability is initially even hence (1/numberOfNode). 
    probability = [0 for i in range(numberOfNode)]; 
    prob = 0; # iterator to iterate through the probability.


    while(prob < numberOfNode):
        probability[prob] = (1/numberOfNode);
        prob+=1;

    pageRank = [[0 for i in range(rankRow)] for j in range(numberOfNode)];
    for i in range(numberOfNode):
        pageRank[i][0] = (i+1);

    # Probability also has an initial array to store before any alterations
    probability2 = [0 for i in range(numberOfNode)];

    #This loop is calculation phase
    for iteration in range(numberOfIterations):
        print();
        print("Iteration "+ str(iteration+1));
        for calcRow in range(numberOfNode):
            val = 0;
            for calcCol in range(numberOfNode):
                if(nodeCon[calcRow][calcCol] != 0):
                    #This loop will go through the each row by row and calculate the (c * r * P) and if there are multiple 
                    # then it will do the following calculation based on the number of non 0 values are found 
                    # (c * r * p) + (c * r * p) + ...
                    # note this is using the initial probability. This does get updates further in the code 
                    val += ((decayFactor_c) * (probability[calcCol]) * nodeCon[calcRow][calcCol]); 
                    probability2[calcCol] = nodeCon[calcRow][calcCol]; 
                    # At this stage the initial probability is being store in probability2.
            #after 1 full row is complete it will add on the the following (1-c)/(number of pages)
            # This will be the page rank for the 1st page and will be stored in the pageRank table.
            #This will also conclude the 1st iterations
            val += ((1 - decayFactor_c)/numberOfNode); 
            pageRank[calcRow][1] = round(val,4);
        for calcRow in range(numberOfNode):
            probability[calcRow] = pageRank[calcRow][1]; # here is1 where the initial probability is being overwritten by the the probability
        print("------------------");
        for row in pageRank:
            print("|" + str(row) + "|");
        for calcRow in range(numberOfNode): # NodeCon is being being over written with the new probability
            val = 0;
            for calcCol in range(numberOfNode):
                if(nodeCon[calcRow][calcCol] != 0):
                    nodeCon[calcRow][calcCol] = pageRank[calcCol][1];   

    iteration += 1;



if(choice == 1):
    nodeCon = sample;
    print("Sample matrix for Pages. number of pages is set to 5, and the matrix is already in transposed state")
    numberOfNode = 5;
    for row in sample:
        print(row);
    calculation();
else:
    construction();