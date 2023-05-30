import random
import csv
import os
import math
# This function set a random burst time and memory requirement based on parameters passed into randint
def runTimeRequirementsEva(size, it):
    burstTime = random.randint(10 * 10**6, 10 * 10**12)
    if it < size/2:
        memoryRequirement = 8
    elif it > size/2:
        memoryRequirement = 8
    return [burstTime, memoryRequirement]


# calculates burst time given the data -> csv_reader
def BurstTime(csv_reader):
    TTRS = []
    TTR = 0
    # number represents us incrementally adding the process cycles. each addition is then appended into TTRS
    for process in csv_reader:
        if process != "Bursttime":
            TTR += int(process)
            TTRS.append(TTR)
    return TTRS


def waitTime(csv_reader):
    Wait_Times = []
    Wait_Time = 0
    # number represents us incrementally adding the process cycles. each addition is then appended into Wait_Times.
    # But based on the concept of wait time we will start by appending 0, then add then rest as opposed to burst time
    for process in csv_reader:
        if process != "Bursttime":
            Wait_Times.append(Wait_Time)
            Wait_Time += int(process)
    return Wait_Times


def process():
    # This checks if the CSV file is empty, and if that is the case it fill that data by CSV write.
    if os.stat("runTimeRequirements.csv").st_size == 0:
        size = 249
        with open("runTimeRequirements.csv", "w") as csv_file:
            csv_writer = csv.writer(csv_file)
            csv_writer.writerow(["Bursttime", "Memory"])
            for i in range(size):
                csv_writer.writerow(runTimeRequirementsEva(i,size))
    else:
        # This will execute if and only if the CSV file is already files with the data
        with open("runTimeRequirements.csv", "r") as csv_file:
            csv_reader = csv.reader(csv_file)
            # This array was used to compute the burst time and  wait time to address the problem where only one CSV_reader can execute at a time.
            csv_readerValmemorySlot1 = []
            csv_readerValmemorySlot2 = []
            csv_readerValmemorySlot3 = []
            size1 = 0
            size2 = 0
            csv_readerVal = []
            for process in csv_reader:
                csv_readerVal.append(process)
            csv_readerVal.sort()
            for process in csv_readerVal:
                if (
                    process[0] != "Bursttime" and
                    int(process[1]) == 8
                ):  # This is where the data is read from the CSV files and allocated into an array
                    csv_readerValmemorySlot1.append(int(process[0]))
                    size1+=1
                elif(
                    process[0] != "Bursttime" and
                    int(process[1]) == 16 
                ):
                    csv_readerValmemorySlot2.append(int(process[0]))
                    size2+=1
            burstTime1 = BurstTime(
                csv_readerValmemorySlot1
            )  # csv_readerVal is then passed into ButstTime function and waitTime function to compute the burst time and wait time
            write_Times1 = waitTime(csv_readerValmemorySlot1)

            burstTime2 = BurstTime(
                csv_readerValmemorySlot2
            )  # csv_readerVal is then passed into ButstTime function and waitTime function to compute the burst time and wait time
            write_Times2 = waitTime(csv_readerValmemorySlot2)

        return burstTime1, write_Times1, burstTime2, write_Times2


def runTimeRequirementsEvaCalc():
    # Finally that data is then retrieved and we compute the the average burst time and waittime
    TTRS = process()[0]  
    Wait_Times = process()[1]

    TTRS2 = process()[2]  
    Wait_Times2 = process()[3]



    AVGTTRS = 0
    AVG_Wait_Time = 0
    AVGTTRS2 = 0
    AVG_Wait_Time2 = 0


    for TTR in TTRS:
        AVGTTRS += TTR
    for Wait_Time in Wait_Times:
        AVG_Wait_Time += Wait_Time

    for TTR2 in TTRS2:
        AVGTTRS2 += TTR2
    for Wait_Time2 in Wait_Times2:
        AVG_Wait_Time2 += Wait_Time2


    AVGTTRS /= len(TTRS) + 1
    AVG_Wait_Time /= len(Wait_Times)

    AVGTTRS2 /= len(TTRS2) + 1
    AVG_Wait_Time2 /= len(Wait_Times2)



    return AVGTTRS, AVGTTRS2,  AVG_Wait_Time, AVG_Wait_Time2


def main():
    AVGTTRS = runTimeRequirementsEvaCalc()[0]
    AVG_Wait_Time = runTimeRequirementsEvaCalc()[1]
    AVGTTRS2 = runTimeRequirementsEvaCalc()[2]
    AVG_Wait_Time2 = runTimeRequirementsEvaCalc()[3]

    print("The average turn around time with running with 8GB = %f" % AVGTTRS)
    print("The average wait time with 8GB = %f" % AVG_Wait_Time)
    print("The average turn around time with 16GB = %f" % AVGTTRS2)
    print("The average wait time with 16GB = %f" % AVG_Wait_Time2)

if __name__ == "__main__":
    main()
