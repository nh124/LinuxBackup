import csv
with open('output.csv', 'r') as csv_file:
    csv_reader = csv.reader(csv_file)

    range1 = []
    range2 = []
    range3 = []
    range4 = []
    range5 = []
    range6 = []
    range7 = []
    range8 = []
    range9 = []
    range10 = []
    range11 = []

    rangeMemory1 = []
    rangeMemory2 = []
    rangeMemory3 = []
    rangeMemory4 = []
    rangeMemory5 = []
    rangeMemory6 = []
    rangeMemory7 = []
    rangeMemory8 = []
    rangeMemory9 = []
    rangeMemory10 = []
    rangeMemory11 = []  

    for line in csv_reader:
        # Between 0 and 1000
        if 0 < int(line[1]) and int(line[1]) < 1000:
            range1.append(int(line[1]))
        elif 0 < int(line[2]) and int(line[2]) < 10:
            rangeMemory1.append(int(line[2]))

        # Between 1000 and 2000
        elif 1000 < int(line[1]) and int(line[1]) < 2000:
            range2.append(int(line[1]))
        elif 10 < int(line[2]) and int(line[2]) < 20:
            rangeMemory2.append(int(line[2]))

        # Between 2000 and 3000
        elif 2000 < int(line[1]) and int(line[1]) < 3000:
            range3.append(int(line[1]))
        elif 20 < int(line[2]) and int(line[2]) < 30:
            rangeMemory3.append(int(line[2]))

        # Between 3000 and 4000
        elif 3000 < int(line[1]) and int(line[1]) < 4000:
            range4.append(int(line[1]))
        elif 30 < int(line[2]) and int(line[2]) < 40:
            rangeMemory4.append(int(line[2]))

        # Between 4000 and 5000
        elif 4000 < int(line[1]) and int(line[1]) < 5000:
            range5.append(int(line[1]))
        elif 40 < int(line[2]) and int(line[2]) < 50:
            rangeMemory5.append(int(line[2]))

        # Between 5000 and 6000
        elif 5000 < int(line[1]) and int(line[1]) < 6000:
            range6.append(int(line[1]))
        elif 50 < int(line[2]) and int(line[2]) < 60:
            rangeMemory6.append(int(line[2]))

        # Between 6000 and 7000
        elif 6000 < int(line[1]) and int(line[1]) < 7000:
            range7.append(int(line[1]))
        elif 60 < int(line[2]) and int(line[2]) < 70:
            rangeMemory7.append(int(line[2]))

        # Between 7000 and 8000
        elif 7000 < int(line[1]) and int(line[1]) < 8000:
            range8.append(int(line[1]))
        elif 70 < int(line[2]) and int(line[2]) < 80:
            rangeMemory8.append(int(line[2]))

        # Between 8000 and 9000
        elif 8000 < int(line[1]) and int(line[1]) < 9000:
            range9.append(int(line[1]))
        elif 80 < int(line[2]) and int(line[2]) < 90:
            rangeMemory9.append(int(line[2]))

        # Between 9000 and 10000
        elif 9000 < int(line[1]) and int(line[1]) < 10000:
            range10.append(int(line[1]))
        elif 90 < int(line[2]) and int(line[2]) < 100:
            rangeMemory10.append(int(line[2]))

        elif 10000 < int(line[1]) and int(line[1]) < 11000:
            range11.append(int(line[1]))
        elif 100 < int(line[2]) and int(line[2]) < 110:
            rangeMemory11.append(int(line[2]))


# Frequency distribution
print("index\t|" "number of cycles|", "Memory|")
print(1, "\t" , len(range1), "\t\t   " , len(rangeMemory1))
print(2, "\t" , len(range2), "\t\t   " , len(rangeMemory2))
print(3, "\t" , len(range3), "\t\t   " , len(rangeMemory3))
print(4, "\t" , len(range4), "\t\t   " , len(rangeMemory4))
print(5, "\t" , len(range5), "\t\t   " , len(rangeMemory5))
print(6, "\t" , len(range6), "\t\t   " , len(rangeMemory6))
print(7, "\t" , len(range7), "\t\t   " , len(rangeMemory7))
print(8, "\t" , len(range8), "\t\t   " , len(rangeMemory8))
print(9, "\t" , len(range9), "\t\t   " , len(rangeMemory9))
print(10, "\t" ,len(range10), "\t\t   " , len(rangeMemory10))
print(11, "\t" ,len(range11), "\t\t   " , len(rangeMemory11))