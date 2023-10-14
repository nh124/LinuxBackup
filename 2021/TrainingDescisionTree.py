import math;
import numpy as np
import pandas as pd
class DatabaseA:
    def __init__(self, fileName):
        self.fileName = fileName;
    row = 0;
    col = 0;

    def dataFromFile(self,fileName):
        global row, col;
        with open (fileName) as David2020:
            Davids_Database_During_2020 = [];
            for line in David2020:
                dataSet = [item.strip() for item in line.split(',')]
                Davids_Database_During_2020.append(dataSet);
            row = len(Davids_Database_During_2020);
            col = len(Davids_Database_During_2020[0]);
        return Davids_Database_During_2020;

    def CollectingData(self,item1, item2,fileName): 
        index1 = 0;
        index2 = 0;
        Davids_Database_During_2020 = self.dataFromFile(fileName);

        for i in range(row):
            for j in range(col):
                if(Davids_Database_During_2020[i][j] == item1):
                    index1 = j
                if(Davids_Database_During_2020[i][j] == item2):
                    index2 = j
        noWet = 0;
        noDry = 0;
        yesWet = 0;
        yesDry = 0;

        compressedData = None;
        compressedData = {'noWet': noWet, 
                        'noDry': noDry, 
                        'yesWet': yesWet, 
                        'yesDry': yesDry}
        i = 0;
        j = 0;
        while i in range(row):
            if(Davids_Database_During_2020[i][index1] == 'No' and Davids_Database_During_2020[i][index2] == 'Wet'):
                compressedData['noWet'] += 1;
            elif(Davids_Database_During_2020[i][index1] == 'No' and Davids_Database_During_2020[i][index2] == 'Dry'):
                compressedData['noDry'] += 1;
            elif(Davids_Database_During_2020[i][index1] == 'Yes' and Davids_Database_During_2020[i][index2] == 'Wet'):
                compressedData['yesWet'] += 1;
            elif(Davids_Database_During_2020[i][index1] == 'Yes' and Davids_Database_During_2020[i][index2] == 'Dry'):
                compressedData['yesDry'] += 1;
            i+=1;

        return compressedData;
    def EntropyTable(self, TableName, Dataset, fileName):
        eq1 = 0;
        eq2 = 0;
        eq3 = 0;
        eq4 = 0;
        Davids_Database_During_2020 = self.dataFromFile(fileName);
        table = [[0 for i in range(4)] for j in range(3)];
        table[0][0] = TableName;
        table[0][1] = "Wet";
        table[0][2] = "Dry";
        table[0][3] = "Entropy";

        table[1][0] = "No";
        table[2][0] = "Yes";
        
        # Dataset = CollectingData('Rain', 'Sprinkler');
        
        table[1][1] = Dataset['noWet']; #4
        table[1][2] = Dataset['noDry']; #6

        table[2][1] = Dataset['yesWet']; #3
        table[2][2] = Dataset['yesDry']; #1
        # Entropy calculation
        prob1R1 = table[1][1]/(table[1][1] + table[1][2]);
        prob2R1 = table[1][2]/(table[1][1] + table[1][2]);
        if(prob1R1 != 0 and prob2R1 != 0):
            eq1 = -prob1R1*math.log2(prob1R1)
            eq2 = -prob2R1*math.log2(prob2R1)
        
        table[1][3] = round(eq1 + eq2,2);
        
        prob1R2 = table[2][1]/(table[2][1] + table[2][2]);
        prob2R2 = table[2][2]/(table[2][1] + table[2][2]);
        if(prob1R2 != 0 and prob2R2 != 0):
            eq3 = -prob1R1*math.log2(prob1R2)
            eq4 = -prob2R1*math.log2(prob2R2)
        table[2][3] = round(eq3 + eq4,2);
        return table;

    def informationGain(self, TableName, Dataset, fileName):
        table = self.EntropyTable(TableName, Dataset, fileName);
        Davids_Database_During_2020 = self.dataFromFile(fileName);
        for row in table:
            print(row);
        # Information Gain Calculations
        numberOfItems = len(Davids_Database_During_2020)-1;
        inforGainForRain = round((((table[1][1] + table[1][2])/numberOfItems) * table[1][3]) + (((table[2][1] + table[2][2])/numberOfItems) * table[2][3]),4);
        print("Information Gain for " + TableName + " = " + str(inforGainForRain));
        return inforGainForRain;
    def Rain_And_Sprinkler_En_Table_And_Information_Gain(self,fileName):
        Rain = self.CollectingData('Rain', 'Grass' , fileName);
        informationGainForRain = self.informationGain('Rain', Rain, fileName);
        print();
        Sprinkler = self.CollectingData('Sprinkler', 'Grass', fileName);
        informationGainForSprinkler = self.informationGain('Sprinkler', Sprinkler, fileName);
        root = None;
        secondaryRoot = None;
        print();
        if(informationGainForRain > informationGainForSprinkler):
            print("Since information gained from Rain = %f > information gained from Sprinkler = %f" % (informationGainForRain, informationGainForSprinkler ));
            print("So, David should choose Rain first =  %f" %informationGainForRain)
            root = 'Rain';
            secondaryRoot = 'Sprinkler'
        else:
            print("Since information gained from Rain = %f < information gained from Sprinkler = %f" % (informationGainForRain, informationGainForSprinkler ));
            print("So, David should choose Sprinkler first =  %f" %informationGainForSprinkler)
            root = 'Sprinkler'
            secondaryRoot = 'Rain'
        print("-------------------------------------------")
        print("Decision Tree")
        print("\t\t" + root);
        print("\t\t|\t|" )
        print("\t     " + secondaryRoot + "\tNo"  )
        print("\t     |   |" )
        print("\t   yes  no");
        
    def Expand(self,table):
        row = [0,0,0,0];
        col = 0;
        table.append(row);
        for i in range(len(table)):
            table[i][3] = col;  
        table[0][3] = table[3][0] = "Total"
        for i in range(len(table)):
            for j in (range(len(table[0]))):
                if(j == 3 and i != 0):
                    table[i][j] = table[i][j-1] + table[i][j-2];
                    # print()
                if(i == 3 and j != 0):
                    table[i][j] = table[i-1][j] + table[i-2][j];


                    
        return table
 
    def confusionMatrixConstruction(self,Table, fileName):
        CollectionTable = self.CollectingData(Table, 'Grass' , fileName);
        ConfusionMatrix = self.EntropyTable(Table, CollectionTable, fileName);
        ConfusionMatrixExpanded = self.Expand(ConfusionMatrix);
        return ConfusionMatrixExpanded;
        
    def classificationAccuracy(self, fileName):
        ConfusionMatrixOfRainExpanded = self.confusionMatrixConstruction('Rain', fileName);
        AccuracyOfRainData = (ConfusionMatrixOfRainExpanded[1][1] + ConfusionMatrixOfRainExpanded[2][2])/ ConfusionMatrixOfRainExpanded[3][3]
        AccuracyOfRainData*=100;
        ConfusionMatrixOfSprinklerExpanded = self.confusionMatrixConstruction('Sprinkler', fileName);
        AccuracyOfSprinkelrData = (ConfusionMatrixOfSprinklerExpanded[1][1] + ConfusionMatrixOfSprinklerExpanded[2][2])/ ConfusionMatrixOfSprinklerExpanded[3][3]
        AccuracyOfSprinkelrData*=100;
        Accuracy = [AccuracyOfRainData, AccuracyOfSprinkelrData]
        return Accuracy;    
    def ErrorRate(self, fileName):
        ConfusionMatrixOfRainExpanded = self.confusionMatrixConstruction('Rain', fileName);
        ErrorRateOfRainData = (ConfusionMatrixOfRainExpanded[1][2] + ConfusionMatrixOfRainExpanded[2][1])/ ConfusionMatrixOfRainExpanded[3][3]
        ErrorRateOfRainData*=100;
        ConfusionMatrixOfSprinklerExpanded = self.confusionMatrixConstruction('Sprinkler', fileName);
        ErrorRateOfSprinkelrData = (ConfusionMatrixOfSprinklerExpanded[1][2] + ConfusionMatrixOfSprinklerExpanded[2][1])/ ConfusionMatrixOfSprinklerExpanded[3][3]
        ErrorRateOfSprinkelrData*=100;
        ErrorRate = [ErrorRateOfRainData, ErrorRateOfSprinkelrData]
        return ErrorRate;
    def specificity(self, fileName):
        ConfusionMatrixOfRainExpanded = self.confusionMatrixConstruction('Rain', fileName);
        specificityForRain = ConfusionMatrixOfRainExpanded[1][1]/ConfusionMatrixOfRainExpanded[3][1];
        specificityForRain*=100;

        ConfusionMatrixOfSprinklerExpanded = self.confusionMatrixConstruction('Sprinkler', fileName);
        specificityForSprinkler = ConfusionMatrixOfSprinklerExpanded[1][1]/ConfusionMatrixOfSprinklerExpanded[3][1];
        specificityForSprinkler*=100;
        list = [specificityForRain, specificityForSprinkler]
        return list;

    def sensitivity(self, fileName):
        ConfusionMatrixOfRainExpanded = self.confusionMatrixConstruction('Rain', fileName);
        sensitivityForRain = ConfusionMatrixOfRainExpanded[2][2]/ConfusionMatrixOfRainExpanded[3][2];
        sensitivityForRain*=100
        ConfusionMatrixOfSprinklerExpanded = self.confusionMatrixConstruction('Sprinkler', fileName);
        sensitivityForSprinkler = ConfusionMatrixOfSprinklerExpanded[2][2]/ConfusionMatrixOfSprinklerExpanded[3][2];
        sensitivityForSprinkler*=100
        list = [sensitivityForRain, sensitivityForSprinkler];
        return list;
    def precision(self, fileName):
        ConfusionMatrixOfRainExpanded = self.confusionMatrixConstruction('Rain', fileName);
        precisionOfRain = ConfusionMatrixOfRainExpanded[1][1]/ConfusionMatrixOfRainExpanded[3][1];
        precisionOfRain*=100;        
        ConfusionMatrixOfSprinklerExpanded = self.confusionMatrixConstruction('Sprinkler', fileName);
        precisionOfSprinkler = ConfusionMatrixOfSprinklerExpanded[1][1]/ConfusionMatrixOfSprinklerExpanded[3][1];
        precisionOfSprinkler*=100

        list = [precisionOfRain, precisionOfSprinkler]
        return list
    def Recall(self, fileName):
        ConfusionMatrixOfRainExpanded = self.confusionMatrixConstruction('Rain', fileName);
        RecallOfRain = ConfusionMatrixOfRainExpanded[1][1]/ConfusionMatrixOfRainExpanded[1][3];
        RecallOfRain*=100;
        ConfusionMatrixOfSprinklerExpanded = self.confusionMatrixConstruction('Sprinkler', fileName);
        RecallOfSprinkler =  ConfusionMatrixOfSprinklerExpanded[1][1]/ConfusionMatrixOfSprinklerExpanded[1][3];
        RecallOfSprinkler*=100;

        list = [RecallOfRain, RecallOfSprinkler]
        return list;
    def F_Score(self, fileName):

        precisionList = self.precision(fileName);
        for i in range(len(precisionList)):
            precisionList[i] /= 100;

        RecallList = self.Recall(fileName);
        for i in range(len(RecallList)):
            RecallList[i] /= 100;

        F_scoreForRain = ((2 * precisionList[0]) * RecallList[0])/(precisionList[0] + RecallList[0])
        F_scoreForSprinkler = (2 * precisionList[1] * RecallList[1])/(precisionList[1] + RecallList[1])
        F_scoreForRain*=100;
        F_scoreForSprinkler*=100;
        list = [F_scoreForRain, F_scoreForSprinkler]
        return list;
    
    def indexing(self, list, Data):
        if(len(list[0]) == 0):
            for i in range(len(list)):
                if(list[i] == Data):
                    return i;
        else:
            for i in range(len(list)):
                for j in range(len(list[i])):
                    if(list[i][j] == Data):
                        return j;
    def Naïve_Bayesian(self, fileName, DataInQuestion): # fileName2
        Data = self.dataFromFile(fileName); # pulling the full datatbase
        lable = Data[0]; # Printing the lables 
        DataInQuestion = Data[DataInQuestion]; # /locating the desired row for calculation
        wet = 0;
        dry = 0;

        #P(C = wet) 
        # P(C = dry)

        # P(Rain = no and C = wet)
        # P(Rain = no and C = dry)

        # p(Sprinkler = yes and C = wet)
        # p(Sprinkler = yes and C = dry)
        
        indexOfGrass = (len(Data[0]) - 1) # index of grass
        indexOfRain = self.indexing(Data, DataInQuestion[1]); # index of Rain
        indeOfSprinkler = self.indexing(Data, DataInQuestion[2]);

        for i in range(len(Data)):
            for j in range(len(Data[0])):
                if(j == 3 and Data[i][j] == 'Wet'):
                    wet += 1;
                elif(j == 3 and Data[i][j] == 'Dry'):
                    dry += 1;
                
        probabilityOfWet = wet/len(Data);
        probabilityOfDry = dry/len(Data);
        RainNoGrassWet = 0
        RainNoGrassDry = 0;
        SprinklerYesGrassWet = 0
        SprinklerYesGrassDry = 0
        
        P_RainNoGrassWet = 0
        P_RainNoGrassDry = 0;
        P_SprinklerYesGrassWet = 0
        P_SprinklerYesGrassDry = 0

        # print(indexOfGrass, indexOfRain, indeOfSprinkler);

        for i in range(len(Data)):
            if(Data[i][indexOfRain] == 'No' and Data[i][indexOfGrass] == 'Wet'): #RainNoGrassWet
                RainNoGrassWet += 1;
            elif(Data[i][indexOfRain] == 'No' and Data[i][indexOfGrass] == 'Dry'): #RainNoGrassDry
                RainNoGrassDry += 1;

            if(Data[i][indeOfSprinkler] == 'Yes' and Data[i][indexOfGrass] == 'Wet'): # SprinklerYesGrassWet
                SprinklerYesGrassWet += 1;
            elif(Data[i][indeOfSprinkler] == 'Yes' and Data[i][indexOfGrass] == 'Dry'): # SprinklerYesGrassDry
                SprinklerYesGrassDry += 1;
       
        P_RainNoGrassWet = RainNoGrassWet/wet;
        P_RainNoGrassDry = RainNoGrassDry/dry;
        P_SprinklerYesGrassWet = SprinklerYesGrassWet/wet;
        P_SprinklerYesGrassDry = SprinklerYesGrassDry/dry;

        P_OfDry = (P_RainNoGrassDry * P_SprinklerYesGrassDry);
        P_OfWet = (P_RainNoGrassWet * P_SprinklerYesGrassWet);
        
        Naïve_BayesianForDry = P_OfDry * probabilityOfDry;
        Naïve_BayesianForWet = P_OfWet * probabilityOfWet;

        list = [Naïve_BayesianForDry, Naïve_BayesianForWet]
        return list;
    def printingEntireDatabase(self, Database):
        for row in Database:
            print(row);
    
    def TableCreate(self, tableName):
        if(tableName == 'Rain'):
            Rain = [[0 for i in range(2)] for j in range(2)]
            Rain[0][0] = 'yes'
            Rain[0][1] = 'No'
            return Rain;
        elif(tableName == 'Sprinkler'):
            Sprinkler = [[0 for i in range(3)] for j in range(3)]
            Sprinkler[0][0] = 'Rain'
            Sprinkler[0][1] = 'Yes'
            Sprinkler[0][2] = 'No'
            Sprinkler[1][0] = 'Yes'
            Sprinkler[2][0] = 'No'
            return Sprinkler;
        elif(tableName == 'Grass'):
            Grass = [[0 for i in range(4)] for j in range(5)]
            Grass[0][0]  = 'Sprinkler'
            Grass[0][1]  = 'Rain'
            Grass[0][2]  = 'Wet'
            Grass[0][3]  = 'Dry'
            Grass[1][0]  = 'No'
            Grass[2][0]  = 'No'
            Grass[3][0]  = 'Yes' 
            Grass[4][0]  = 'Yes'
            Grass[1][1] = 'No'
            Grass[2][1] = 'Yes'
            Grass[3][1] = 'No'
            Grass[4][1] = 'Yes'
            return Grass;

    def Bayesian_Belief_Networks(self, Database): #DatabaseA
        rain = self.TableCreate('Rain');
        sprinkler = self.TableCreate('Sprinkler');
        grass = self.TableCreate('Grass');
        
        indexOfRain_in_DataBase = self.indexing(Database, 'Rain');
        indexOfSprinkler_in_DataBase = self.indexing(Database, 'Sprinkler');
        indexOfGrass_in_DataBase = self.indexing(Database, 'Grass');


        for i in range(len(Database)):
            #Rain
            if(Database[i][indexOfRain_in_DataBase] == 'Yes'):
                rain[1][0]+=1;
            elif(Database[i][indexOfRain_in_DataBase] == 'No'):
                rain[1][1]+=1;
            #sprinkler
            if(Database[i][indexOfSprinkler_in_DataBase] == 'Yes' and Database[i][indexOfRain_in_DataBase] == 'Yes'): # rain yes Sprinkler yes
                sprinkler[1][1] += 1;
            elif(Database[i][indexOfSprinkler_in_DataBase] == 'No' and Database[i][indexOfRain_in_DataBase] == 'Yes'): # rain yes Sprinkler No
                sprinkler[1][2] += 1;
            elif(Database[i][indexOfSprinkler_in_DataBase] == 'Yes' and Database[i][indexOfRain_in_DataBase] == 'No'): #rain No Sprinkler Yes
                sprinkler[2][1] += 1;
            elif(Database[i][indexOfSprinkler_in_DataBase] == 'No' and Database[i][indexOfRain_in_DataBase] == 'No'): #rain No Sprinkler No
                sprinkler[2][2] += 1;
            #Grass

            #row1
            if(Database[i][indexOfSprinkler_in_DataBase] == 'No' and Database[i][indexOfRain_in_DataBase] == 'No'  and Database[i][indexOfGrass_in_DataBase] == 'Wet'):
                grass[1][2]+=1;
            if(Database[i][indexOfSprinkler_in_DataBase] == 'No' and Database[i][indexOfRain_in_DataBase] == 'No'  and Database[i][indexOfGrass_in_DataBase] == 'Dry'):
                grass[1][3]+=1;
            #row2
            if(Database[i][indexOfSprinkler_in_DataBase] == 'No' and Database[i][indexOfRain_in_DataBase] == 'Yes'  and Database[i][indexOfGrass_in_DataBase] == 'Dry'):
                grass[2][2]+=1;
            elif(Database[i][indexOfSprinkler_in_DataBase] == 'No' and Database[i][indexOfRain_in_DataBase] == 'Yes'  and Database[i][indexOfGrass_in_DataBase] == 'Wet'):
                grass[2][3]+=1;
            #row3
            if(Database[i][indexOfSprinkler_in_DataBase] == 'Yes' and Database[i][indexOfRain_in_DataBase] == 'No'  and Database[i][indexOfGrass_in_DataBase] == 'Dry'):
                grass[3][2]+=1;
            if(Database[i][indexOfSprinkler_in_DataBase] == 'Yes' and Database[i][indexOfRain_in_DataBase] == 'No'  and Database[i][indexOfGrass_in_DataBase] == 'Wet'):
                grass[3][3]+=1;
            #row4
            if(Database[i][indexOfSprinkler_in_DataBase] == 'Yes' and Database[i][indexOfRain_in_DataBase] == 'Yes'  and Database[i][indexOfGrass_in_DataBase] == 'Dry'):
                grass[4][2]+=1;
            if(Database[i][indexOfSprinkler_in_DataBase] == 'Yes' and Database[i][indexOfRain_in_DataBase] == 'Yes'  and Database[i][indexOfGrass_in_DataBase] == 'Wet'):
                grass[4][3]+=1;
            
        for i in range(len(rain)):
            for j in range(len(rain[i])):
                if(i != 0):
                    rain[i][j] /= 16;
                    rain[i][j]*=100;
        
        for i in range(len(sprinkler)):
            for j in range(len(sprinkler[i])):
                if(i != 0 and j != 0):
                    sprinkler[i][j] /= 16;
                    sprinkler[i][j]*=100;

        for i in range(len(grass)):
            for j in range(len(grass[i])):
                if(i != 0 and j != 0 and j != 1):
                    grass[i][j] /= 16;
                    grass[i][j]*=100;
        
        probOfWetGrass = ((6.25/100 * 25.0/100) + (0 * 25.0/100) + (6.25/100 * 75.0/100) + (0 * 75.0/100)) + ((6.25/100 * 6.25/100) + (0 * 6.25/100) + (6.25/100 * 18.75/100) + (0 * 18.75/100));
        probOfWetGrass*= 100;

        probOfDryGrass = (1 - probOfWetGrass/100)*100; 
        print("Probability of Wet grass = %f\nProbability of Dry grass = %f" %(probOfWetGrass,probOfDryGrass) )
        
        for row in rain:
            print(row);
        print();
        for row in sprinkler:
            print(row);
        print();
        for row in grass:
            print(row);
        


    


    
    def printConfusionTable(self, table1, table2, fileName):
        ConfusionMatrixExpanded1 = self.confusionMatrixConstruction(table1, fileName);
        ConfusionMatrixExpanded2 = self.confusionMatrixConstruction(table2, fileName);
        for row in ConfusionMatrixExpanded1:
            print(row)
        print();
        for row in ConfusionMatrixExpanded2:
            print(row);

    def QuestiionAnswering(self,fileName1, fileName2):
                DatasetA = self.dataFromFile(fileName1);
                DatasetB = self.dataFromFile(fileName2);
                print("-------------------Entire Database------------------------------");
                self.printingEntireDatabase(DatasetA);
                print();
                self.printingEntireDatabase(DatasetB);
                data = input("Please select one of the following Questions:\n1. Question 1\n2. Question 2\n3.Question 3\n4.Question: 4\ninput:");
            # data = input;
            

            # if(val == 1)
                print("-------------------Question1------------------------------");
                self.Rain_And_Sprinkler_En_Table_And_Information_Gain(fileName1)
            # if(val == 2):
                print("--------Question2------------------------------");
                
                print("------Confusion Table for Rain and Sprinkler----------");
                self.printConfusionTable('Rain', 'Sprinkler', fileName2);
                
                print("--2.1--");
                Accuracies = self.classificationAccuracy(fileName2);
                print("Accurace for Rain = " + str(Accuracies[0]) + "%" )
                print("Accurace for Sprinkler = " + str(Accuracies[1]) + "%")
                
                print("--2.2--");
                ErrorRate = self.ErrorRate(fileName2)
                print("Error-Rate for Rain = " + str(ErrorRate[0]) + "%" )
                print("Error-Rate for Sprinkler = " + str(ErrorRate[1]) + "%")

                print("--2.3--");
                specificity = self.specificity(fileName2)
                print("specificity for Rain = " + str(specificity[0]) + "%" )
                print("specificity for Sprinkler = " + str(specificity[1]) + "%")

                print("--2.4--");
                sensitivity = self.sensitivity(fileName2)
                print("sensitivity for Rain = " + str(sensitivity[0]) + "%" )
                print("sensitivity for Sprinkler = " + str(sensitivity[1]) + "%")

                print("--2.5--");
                precision = self.precision(fileName2)
                print("Precision for Rain = " + str(precision[0]) + "%" )
                print("Precision for Sprinkler = " + str(precision[1]) + "%")

                print("--2.6--");
                Recall = self.Recall(fileName2)
                print("Recall for Rain = " + str(Recall[0]) + "%" )
                print("Recall for Sprinkler = " + str(Recall[1]) + "%")

                print("--2.7--");
                F_score = self.F_Score(fileName2)
                print("F_score for Rain = " + str(F_score[0]) + "%" )
                print("F_score for Sprinkler = " + str(F_score[1]) + "%")
            # if(val == 3):
                print("--------Question3------------------------------");
                Naïve_Bayesian = self.Naïve_Bayesian(fileName2, 4);
                print("𝑃(ℂ=Dry │ 𝕏=𝑋_𝑗) = %f" %(Naïve_Bayesian[0]))
                print("𝑃(ℂ=Wet │ 𝕏=𝑋_𝑗) = %f" %(Naïve_Bayesian[1]))
            # if(val == 4):
                print("--------Question 4------------------------------");
                Bayesian_Belief_Networks = self.Bayesian_Belief_Networks(DatasetA);
          







def main():
    DataSetA = DatabaseA('david_database_2020_DataSetA');
    fileName1 = 'david_database_2020_DataSetA';
    fileName2 = 'david_database_2020_DataSetB';

    # question  = input("")
    DataSetA.QuestiionAnswering(fileName1, fileName2);
if __name__ == "__main__":
    main();

