import pyspark
from pyspark.context import SparkContext
from pyspark import SparkConf

conf = SparkConf()
sc = SparkContext(conf = conf)
sc.setLogLevel("ERROR")

def mapper():
    # Load the adjacency list file
    AdjList1 = sc.textFile("/home/nur_haque/02AdjacencyList.txt")
    # Initialize each page's rank; since we use mapValues, the resulting RDD will have the same partitioner as links
    PageRankValues = sc.parallelize([(1,0.2),(2,0.2),(3,0.2),(4,0.2),(5,0.2)])
    PRvalues = PageRankValues.map(lambda x: x[1]).collect()
    # Geting the all the page neightbors
    AdjList2 = AdjList1.flatMap(lambda x: x[3:]).filter(lambda x: x.replace(" ", "")).collect()

    shuffeledData = []
    # Calculating the probobility 
    for row in AdjList1.collect():
        it = 0
        actSze = len(row)/2
        if actSze > 2:
            shuffeledData.append(1/(actSze-1)) 
            shuffeledData.append(1/(actSze-1)) 
        else:
            shuffeledData.append(1/(actSze-1)) 
        it+=1
    PageRankValues = sc.parallelize(shuffeledData).collect()
    # creating the mapper matrix by combining PageRanks, and Probability
    mapperMatrix = list(zip(AdjList2,PageRankValues))
    mapperMatrixRDD = sc.parallelize(mapperMatrix)
    sortedMatrixRDD = mapperMatrixRDD.reduceByKey(lambda x,y: (x,y)).sortByKey()
    return sortedMatrixRDD, PRvalues, AdjList1

def calcPageRank(sortedMatrixRDD, rate):
    # This hashmap depict which page/pages are impacting nth page's rank
    #  For Exmple PageRank 1 is baing impacted by 4
    # 1 -> 4
    # 2 -> 1
    # 3 -> [2,5]
    # 4 -> [2,3]
    # 5 -> 4
    mappingPR_Rate = dict({
        0 : rate[3],
        1 : rate[0],
        2 : [rate[1], rate[4]],
        3 : [rate[1], rate[2]],
        4 : rate[3]
    })
    newPageRank = []
    try:
        pageRank = sortedMatrixRDD.map(lambda x: x[1]).collect()
    except:
        pageRank = sortedMatrixRDD
    for PRs in range(len(pageRank)):
        if type(pageRank[PRs][1]) == float:
            finalVal = round((0.85 * mappingPR_Rate.get(PRs) * pageRank[PRs][1]) + ((1 - 0.85)/5),3);
            newPageRank.append(finalVal)
        elif type(pageRank[PRs][1]) == tuple:
            finalVal = round((0.85 * mappingPR_Rate.get(PRs)[0] * pageRank[PRs][1][0]) + (0.85 * mappingPR_Rate.get(PRs)[1] * pageRank[PRs][1][1]) + ((1 - 0.85)/5),4);
            newPageRank.append(finalVal)
    return newPageRank

def output():
    sortedMatrixRDD = mapper()[0].collect()
    rate = mapper()[1]
    # Run 30 iterations
    print ("Run 30 Iterations")
    for i in range(1, 30):
        print ("Number of Iterations")
        sortedMatrixRDDCalc = calcPageRank(sortedMatrixRDD, rate)
        print("=========================================")
        print (str(i) + " => " + str(sortedMatrixRDDCalc))
        print("=========================================")
        # print(sortedMatrixRDDCalc)
        rate = sortedMatrixRDDCalc
    print ("=== Final PageRankValues ===")
    print (sortedMatrixRDDCalc)
    # Write out the final ranks
    sc.parallelize(sortedMatrixRDDCalc).coalesce(1).saveAsTextFile("/home/nur_haque/PageRankValues_Final")

def main():
    output()
if __name__ == "__main__":
    main()