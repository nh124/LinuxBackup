from os import truncate
from pyspark.sql import SparkSession
from pyspark.ml.feature import StringIndexer
from pyspark.ml.feature import VectorAssembler
from pyspark.sql.types import IntegerType
from pyspark.sql.types import DoubleType
from pyspark.ml import Pipeline
from pyspark.ml.classification import FMClassifier
from pyspark.ml.feature import MinMaxScaler, StringIndexer
from pyspark.ml.classification import RandomForestClassifier
from pyspark.ml.classification import NaiveBayes
from pyspark.ml.evaluation import MulticlassClassificationEvaluator
from pyspark.sql.functions import isnull, when, count, col
from pyspark.ml.classification import LogisticRegression
from pyspark.ml.classification import GBTClassifier
from pyspark.ml.classification import DecisionTreeClassifier

spark = SparkSession \
    .builder \
    .appName('Titanic Data') \
    .getOrCreate()

iris = (spark.read
          .format("csv")
          .option('header', 'true')
          .load("/home/nur_haque/HW6/Iris.csv"))
data = iris.drop("Id")
labelIndexer = StringIndexer(inputCol="Species", outputCol="SpeciesIndexed").fit(data)
IndexedDataset = labelIndexer.transform(data).drop("Species")

IndexedDataset.show()

IndexedDataset = IndexedDataset.withColumn("SepalLengthCm", IndexedDataset["SepalLengthCm"].cast(DoubleType()))
IndexedDataset = IndexedDataset.withColumn("SepalWidthCm", IndexedDataset["SepalWidthCm"].cast(DoubleType()))
IndexedDataset = IndexedDataset.withColumn("PetalLengthCm", IndexedDataset["PetalLengthCm"].cast(DoubleType()))
IndexedDataset = IndexedDataset.withColumn("PetalWidthCm", IndexedDataset["PetalWidthCm"].cast(DoubleType()))

required_features = ["SepalLengthCm", "SepalWidthCm", "PetalLengthCm", "PetalWidthCm"]
assempler = VectorAssembler(inputCols = required_features, outputCol = 'features')
IndexedDataset_features = assempler.transform(IndexedDataset)

(trainingData, testData) = IndexedDataset_features.randomSplit([0.7, 0.3])

rf = RandomForestClassifier(labelCol='SpeciesIndexed', featuresCol='features', maxDepth=5)
model = rf.fit(trainingData)
predictions = model.transform(testData)
evaluator = MulticlassClassificationEvaluator(labelCol='SpeciesIndexed', predictionCol='prediction', metricName='accuracy')
accuracy = evaluator.evaluate(predictions)
print('Test Accuracy of Random Forest Classifier =', accuracy)

IndexedDataset_features.show()
dt = DecisionTreeClassifier(labelCol="SpeciesIndexed", featuresCol="features")
model1 = dt.fit(trainingData)
predictions = model1.transform(testData)
evaluator = MulticlassClassificationEvaluator(labelCol='SpeciesIndexed', predictionCol='prediction', metricName='accuracy')
accuracy = evaluator.evaluate(predictions)
print('Test Accuracy of DecisionTreeClassifier =', accuracy)