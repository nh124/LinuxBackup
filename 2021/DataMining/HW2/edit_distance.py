
string1 = input("Please enter your first word: ");
string2 = input("Please enter your second word: ");


def editDis(string1, string2):
    editDistance = 0;
    # if the the 2 string have different lengths. 
    stringChar1 = None;
    stringChar2 = None;

    #calculating the difference between the lengths any insertions
    sizeCom = len(string1) - len(string2);
    
    # negative to positive 
    if sizeCom < 0:
        sizeCom *= -1;
    
    # if both sizes are equal just iterate through the string and find the differaces 
    if sizeCom == 0:
        index = 0;
        for index  in range(len(string1)):
            stringChar1 = string1[index];
            stringChar2 = string2[index];
            if(stringChar1 != stringChar2):
                editDistance += 1; 
        index += 1;
        # return editDistance;
    # Otherwise compute the number of inserting/deletions and add to the character difference = edit distance  
    else:
        inc = 0;
        indexOfStr1 = -1;
        indexOfStr2 = -1;

        if len(string1) < len(string2):
            smaller = len(string1);  
        else:
            smaller = len(string2);

        for index in range(smaller): 
            indexOfStr1 += 1;
            indexOfStr2 += 1;
            # if index < len(string1):
            stringChar1 = string1[indexOfStr1];
            # if index < len(string2):   
            stringChar2 = string2[indexOfStr2];
            
            if(stringChar1 != stringChar2):
                editDistance += 1;
        editDistance += sizeCom; 
        
        return editDistance;
print("Edit distance = " + str(editDis(string1, string2)));

#overall time complexity = O(N)
# Linear time complexity. 


#--------------------------Separate algorithms for testing and better understanding----------------------------------------------------------#
# def editsMade():
    # editsOfString1 = [];
    # editsOfString1 = [0 for i in range(editsM)];
    # editsOfString2 = [];
    # editsOfString2 = [0 for i in range(editsM)];

    # stringChar1 = None;
    # stringChar2 = None;
    # sizeCom = len(string1) - len(string2);
    # if sizeCom < 0:
    #     sizeCom *= -1;
    
    # if sizeCom == 0:
    #     inc = 0;
    #     index = 0;
    #     for index  in range(len(string1)):
    #         stringChar1 = string1[index];
    #         stringChar2 = string2[index];
    #         if(stringChar1 != stringChar2):
    #             editsOfString1[inc] = stringChar1;
    #             editsOfString2[inc] = stringChar2;
    #     index += 1;
    #     inc+=1;
    # else:
    #     inc = 0;
    #     index = 0;
    #     if sizeCom < 0:
    #         smaller = len(string1);  
    #     else:
    #         smaller = len(string2);
    #     for index  in range(smaller): 
    #         if index < len(string1):
    #             stringChar1 = string1[index];
    #         if index < len(string2):   
    #             stringChar2 = string2[index];

    #         if(stringChar1 != stringChar2):
    #             editsOfString1[inc] = stringChar1;
    #             editsOfString2[inc] = stringChar2;
    #     index += 1;
    #     inc+=1;

    # print("The edit distance between " +  string1 + " and " + string2 + " is equal to " + str(editsM) + "\nThe differerence were the following:\n" + string1 + " -> " + str(editsOfString1) + "\n" + string2 + " -> " + str(editsOfString2));




# def construction():
#     string1 = input("Please enter your first string: ");
#     string2 = input("Please enter your second string: ");

#     str1_Word_len = len(string1);
#     str2_Word_len = len(string2);


#     rows = str2_Word_len + 2;
#     cols = str1_Word_len + 2;

#     construction.rows = rows;
#     construction.cols = cols; 
#     matrix = [[0 for i in range(cols)] for j in range(rows)];
#     index = 0;
#     index2 = 0;
#     rowVals = 0;
#     colVals = 0;
#     for row in range(rows):
#         for col in range(cols):
#             if(((row < 1 or col < 1)) and (col > 1 or row > 1)):
#                 if(row == 0 and col > 1):
#                     matrix[row][col] = string1[index];
#                     index += 1;
#                 if(col == 0 and row > 1):
#                     matrix[row][col] = string2[index2];
#                     index2 += 1;

#             if(row == 1 and col > 0):
#                 matrix[row][col] = str(rowVals);
#                 rowVals += 1;  
#             if(col == 1 and row > 0):
#                 matrix[row][col] =  str(colVals);
#                 colVals += 1; 

#     return matrix;


# def calc_edit_dist():

#     colInc = 0; # row vertical
#     rowInc = 2; #cols horizontal

#     colInc2 = 2;
#     rowInc2 = 0;


#     valPlaceRow = 2;
#     valPlaceCol = 2;
    
#     numb = 1;
    
#     matrix = construction();
#     for rows in matrix:
#         print(rows);

    # for rows in range(construction.rows):
    #     for cols in range(construction.cols):
    #         if((rows > 1) and (cols > 1)):
    #             if(colInc < construction.cols and rowInc < construction.rows):
    #                 if((matrix[0][colInc]) != (matrix[colInc][0])):
    #                     matrix[rowInc][colInc] = valPlace;
    #                     valPlace+=1;
    #                     rowInc+=1;
    #                 else:
    #                     matrix[rowInc][colInc] = valPlace;
    #                 if(rowInc < construction.rows and colInc < construction.cols):
    #                     colInc = 2;
    #                     rowInc += 1;
    #                     valPlace = 0;

#     rangeOfit = (construction.rows - 2) * (construction.cols - 2);


#     valPlace = 1;
#     for numb in range(rangeOfit):
#         if(rowInc < construction.rows and colInc < construction.cols and rowInc2 < construction.rows and colInc2 < construction.cols):
#             if((matrix[rowInc][colInc] == matrix[rowInc2][colInc2])):
#                 matrix[valPlaceRow][valPlaceCol] = valPlace;
#                 valPlaceRow += 1;
#                 valPlace += 1;
                
                
        



#             rowInc += 1;
#             # colInc2 += 1;



#     print("\n\n\n");        


#     for rows in matrix:

#         print(rows);
            




# calc_edit_dist();