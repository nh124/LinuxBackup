import pyspark
from pyspark.context import SparkContext
from pyspark import SparkConf
from pyspark.sql import SparkSession, SQLContext, Row
from pyspark.sql.functions import *
import json
import os

conf = SparkConf()
sc = SparkContext(conf=conf)
sc.setLogLevel("ERROR")

spark = SparkSession \
    .builder \
    .appName("Phone Book - Country Look up") \
    .config("spark.some.config.option", "some-value") \
    .getOrCreate()



DF1 = spark.read.json("/home/nur_haque/HW5/cityStateMap.json")
DF2 = spark.read.json("/home/nur_haque/HW5/tweets.json")

DF1.show()
DF2.show()
# Print only tweets from Atlanta.
print("Print only tweets from Atlanta.")
tweets_from_atlanta = DF2.filter("geo == 'Atlanta'").select("geo", "tweet").show()
# Print only tweets that contain the word “today”.
print("Print only tweets that contain the word today.")
tweets_with_word_today = DF2.filter(col("tweet").like("%today%")).select("geo", "tweet").show()
# Print only tweets from California.
print("Print only tweets from California.")
tweet_geo = DF2.join(DF1, DF1.city == DF2.geo)
tweets_from_california = tweet_geo.filter(DF1.state == "California").select("state", "tweet").show()
# We want to count the number of tweets published in each state.
print("We want to count the number of tweets published in each state.")
tweet_count = tweet_geo.groupBy("state").count().show()




