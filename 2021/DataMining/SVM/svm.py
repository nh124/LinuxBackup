from sklearn import datasets
import pandas as pd

# dataset = datasets.load_files("testingDataset1.txt")
# dataset.data.shape
cancer = datasets.load_breast_cancer()
print(cancer.target)
from sklearn.model_selection import train_test_split
X_train,X_test,y_train,y_test = train_test_split(cancer.data, cancer.target, test_size=0.3,random_state=109) 
from sklearn import svm
clf = svm.SVC(kernel='linear')
clf.fit(X_train, y_train)
y_pred = clf.predict(X_test)
from sklearn import metrics
print("Accuracy:",metrics.accuracy_score(y_test, y_pred))

# from pandas.core.base import DataError
# from sklearn import datasets
# import pandas as pd
# import numpy as np
# from sklearn.model_selection import train_test_split
# from sklearn.svm import SVC
# from sklearn.metrics import classification_report
# from sklearn import datasets


# cancer = datasets.load_breast_cancer()
# print(cancer.target)
# from sklearn.model_selection import train_test_split
# X_train,X_test,y_train,y_test = train_test_split(cancer.data, cancer.target, test_size=0.3,random_state=109) 
# from sklearn import svm
# clf = svm.SVC(kernel='linear')
# clf.fit(X_train, y_train)
# y_pred = clf.predict(X_test)
# from sklearn import metrics
# print("Accuracy:",metrics.accuracy_score(y_test, y_pred))

# # training = pd.read_csv('trainingDataset1.csv', sep=" ")
# # testing = pd.read_csv('testingDataset1.csv', sep=" ")
# # command = training.head
# # print(command)
