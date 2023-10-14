# import pandas as pd
# import numpy as np
# import matplotlib.pyplot as plt
# import scipy.cluster.hierarchy as shc
# from sklearn.preprocessing import normalize
# from sklearn.cluster import AgglomerativeClustering
# # %matplotlib inline

# data = pd.read_csv('DataMining/HC/Data.csv')
# # print(data.head())
# plt.figure(figsize=(10, 7))  
# plt.title("Dendrograms")  
# dend = shc.dendrogram(shc.linkage(data, method='ward'))
# cluster = AgglomerativeClustering(n_clusters=5, affinity='euclidean', linkage='ward')
# cluster.fit_predict(data)
# plt.figure(figsize=(10, 7))
# plt.scatter(data[:,1], data[:,2], c=cluster.labels_, cmap='rainbow')
# plt.show()

# from os import sep
# import pandas as pd
# import numpy as np
# import matplotlib.pyplot as plt
# import scipy.cluster.hierarchy as shc
# from sklearn.preprocessing import normalize
# from sklearn.cluster import AgglomerativeClustering
# from collections import DBSCAN
# data = pd.read_csv('DataMining/HC/Data.csv', header=None)

# # target = data.iloc[:,4]
# model = DBSCAN[]

from networkx.drawing.nx_pylab import draw_circular, draw_spring
import numpy as np
from sklearn import cluster
import sklearn
float_formatter = lambda x: "%.3f" % x
np.set_printoptions(formatter={'float_kind':float_formatter})
# from sklearn.datasets.samples_generator import make_circles
from sklearn.cluster import SpectralClustering, KMeans
from sklearn.metrics import pairwise_distances
from matplotlib import pyplot as plt
import networkx as nx
import seaborn as sns
G = nx.Graph()
G.add_edges_from([
    [1,1],
    [3,0],
    [5,3],
    [6,2],
    [6,4],
    [7,2],
    [7,5],
    [8,3],
    [8,4],
    [0,7],
    [1,6],
    [1,8],
    [2,5],
    [2,8],
    [3,6],
    [3,7],
    [7,8],
    [9,9],
])
draw_spring(G);
W = nx.adjacency_matrix(G)
print(W.todense())

# degree matrix
D = np.diag(np.sum(np.array(W.todense()), axis=1))
print('degree matrix:')
print(D)
# laplacian matrix
L = D - W
print('laplacian matrix:')
print(L)

e, v = np.linalg.eig(L)
# eigenvalues
print('eigenvalues:')
print(e)
# eigenvectors
print('eigenvectors:')
print(v)

fig = plt.figure(figsize=[18, 6])
ax1 = plt.subplot(221)
plt.plot(e)
ax1.title.set_text('eigenvalues')


i = np.where(e < 0.5)[0]
ax2 = plt.subplot(222)
plt.plot(v[:, i[0]])


ax3 = plt.subplot(223)
plt.plot(v[:, i[1]])
ax3.title.set_text('second eigenvector with eigenvalue close to 0')


ax4 = plt.subplot(224)
plt.plot(v[:, i[1]])
ax4.title.set_text('third eigenvector with eigenvalue close to 0')


fig.tight_layout()

U = np.array(v[:, i[1]])
km = KMeans(init='k-means++', n_clusters=3)
km.fit(U)
km.labels_


# X, clusters = make_circles(n_samples=1000, noise=.05, factor=.5, random_state=0)
# km = KMeans(init='k-means++', n_clusters=2)
# km_clustering = km.fit(G)
# plt.scatter(G[:,0], G[:,1], c=km_clustering.labels_, cmap='rainbow', alpha=0.7, edgecolors='b')
plt.show()