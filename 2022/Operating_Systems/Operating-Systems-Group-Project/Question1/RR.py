import csv
import random
import os

def runTimeRequirementsEva():
    burstTime = random.randint(10 * 10**6, 10 * 10**12)
    memoryRequirement = random.randint(1, 16)
    return [burstTime, memoryRequirement]

def process():
    # This checks if the CSV file is empty, and if that is the case it fill that data by CSV write.
    if os.stat("runTimeRequirements.csv").st_size == 0:
        print("exec")
        with open("runTimeRequirements.csv", "w", newline="") as csv_file:
            csv_writer = csv.writer(csv_file)
            csv_writer.writerow(["Bursttime", "Memory"])
            for i in range(249):
                csv_writer.writerow(runTimeRequirementsEva())
    else:
        # This will execute if and only if the CSV file is already files with the data
        with open("runTimeRequirements.csv", "r") as csv_file:
            Quantum = random.randint(10 * 10**6, 10 * 10**12)
            burstTimeTable = []
            it = 0
            csv_reader = csv.reader(csv_file)
            for process in csv_reader:
                if process[0] != "Bursttime":
                    it+=1
                    processCounter = "P"+str(it)
                    burstTimeTable.append([processCounter, process[0], True])
            # This array was used to compute the burst time and  wait time to address the problem where only one CSV_reader can execute at a time.
        return burstTimeTable, Quantum

def RRExecution():
    ProcessTable = process()[0]
    Quantum = process()[1]
    size = len(ProcessTable)
    processName = [row[0] for row in ProcessTable]
    processes = [row[1] for row in ProcessTable]
    processesStatus = [row[2] for row in ProcessTable]
    timeTable = []

    while(True in processesStatus):
        for Eprocess in range(len(ProcessTable)):
            BTReamining = int(ProcessTable[Eprocess][1]) - Quantum
            if BTReamining <= 0 and processesStatus[Eprocess] == True:
                processesStatus[Eprocess] = False;
                timeTable.append(ProcessTable[Eprocess][1])
            elif processesStatus[Eprocess] == True and BTReamining > 0:
                TimeCounter = 0
                processes[Eprocess] = BTReamining
                processName.append(processName[Eprocess])
                processes.append(processes.pop(processes.index(processes[Eprocess])))
                TimeCounter+=BTReamining
                timeTable.append(TimeCounter)


        processesStatusCounter = None
        newprocessesStatusCounter = processesStatus.count(False)
        processesStatusCounter = newprocessesStatusCounter
        if processesStatusCounter == newprocessesStatusCounter:
            break
    return processName, processes, processesStatus, timeTable

def Data_organization():      
    PN = RRExecution()[0]
    PP = RRExecution()[3]

    PNREversed = PN[::-1]
    processFinished = []
    processRecycle = []
    for process in PN:
        counter = PN.count(process)
        if counter > 1:
            processRecycle.append(process)
    for PRecycle in processRecycle:
        processFinished.append(PNREversed.index(PRecycle))

    return processFinished

def TTR_And_WaitTimeCals():
    PFT = Data_organization()
    PN = RRExecution()[0]
    PP = RRExecution()[3]
    TTR = []
    for process in range(len(PP)):
        if process not in PFT:
            TTR.append(PP[process])
        else:
            TTR.append(PP[PFT[process]])

    AVGTTR = 0
    AVGWaitTime = 0
    for F_process in TTR:
        AVGTTR += int(F_process)

    for F_process in range(len(TTR)-1):
        AVGWaitTime += int(TTR[F_process])
    return AVGTTR, AVGWaitTime

def main():
    AVGTTRS = TTR_And_WaitTimeCals()[0]
    AVG_Wait_Time = TTR_And_WaitTimeCals()[1]
    print("The average turn around time = %f" % AVGTTRS)
    print("The average wait time = %f" % AVG_Wait_Time)


if __name__ == "__main__":
    main()

