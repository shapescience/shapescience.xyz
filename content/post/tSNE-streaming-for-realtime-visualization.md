+++
date = "2016-09-22T09:00:00Z"
draft = false
title = "t-SNE visualization with streaming data: introduction"
image = "images/calder-1.jpg"
artist = "Alexander Calder"
author = "arthur"
mathjax = true
tags = ["streaming", "visualization", "manifold"]
+++

t-SNE is great, but too bad you can't easily stream data and get updates. Can we adapt it?

<!--more-->

> **Work In Progress:** this post series will be updated soon with live demos. Find the [source code here](https://github.com/shapescience/tsne-streaming).
>
> **Update** Google released as part of tensorboard a very effective GPU implementation of tSNE. [Check it out!](https://ai.googleblog.com/2018/06/realtime-tsne-visualizations-with.html).

![demo-app](https://raw.githubusercontent.com/shapescience/tsne-streaming/master/illustration.jpg)

## Background: the manifold hypothesis
The [manifold hypothesis](https://heavytailed.wordpress.com/2012/11/03/manifold-hypothesis-part-1-compression-learning-and-the-strong-mh/) is the eternal [problem](https://arxiv.org/pdf/1310.0425v2.pdf) of data analysis. We expect the high-dimensionnal data to lay near a lower dimensionnal manifold:

Parametrising this manifold can give us a useful data embedding. This hypothesis means our data can be compressed or represented sparsely.   It also suggests we can tame the curse of dimensionnaly in our learning tasks. We except this manifold to carry meaning. It could be a good --geodesic-- distance, or even semantic meaning, like examplified by [word2vec's vector manipulations](https://papers.nips.cc/paper/5021-distributed-representations-of-words-and-phrases-and-their-compositionality.pdf). Topological analysis can be used to investigate different features of those manifolds:

{{< figure src="/images/rotation-hole.png" caption="Figure borrowed (thanks in advance Steve) from \"Persistence Theory: from Quiver Representations to Data Analysis\"" link="http://bookstore.ams.org/surv-209/">}}

> Can we recover that manifold's structure? Can we understand it with some 2D projection? This would be a great vizualisation.

### What about PCA? 
Many readers should feel this looks a lot like what Principal Component Analysis (PCA) promesses. Don't just *déjà-vu* and change page. While PCA can be useful as a preprocessing step[^1], PCA plots are often too crowded to  insights. Why does PCA look bad?

PCA tries to respect large dissimilarities in the data. Unfortunalty:

* Respecting large scale stucture is irrelevant for data analysis. *Far is far*, why try to me more specific in what should be a qualitative visualisation?
* Trusting large distances is also [tricky in high-dimensional spaces](http://stats.stackexchange.com/questions/99171/why-is-euclidean-distance-not-a-good-metric-in-high-dimensions).
* **Only small distances are reliable**. Objects close in the ambient space may be far away for the manifold's geodesic distance (think opposite points on a spiral).
* PCA's cost function means outliers have a large influence. You might need more [robust PCA methods](http://statweb.stanford.edu/~candes/papers/RobustPCA.pdf).

Because of this, finer details and multi-scale structure are absent from PCA.
In addition, PCA only shows proeminent linear projections -- and who says the data lies on a linear plane?

In fact, there are [many](https://en.wikipedia.org/wiki/Nonlinear_dimensionality_reduction) methods that try to respect this local structure (see [manifold learning on scikit-learn](http://scikit-learn.org/stable/modules/manifold.html) or this [introduction](http://web.mit.edu/6.454/www/www_fall_2003/ihler/slides.pdf)).
Among them, tSNE is one of the most effective, successful and *[insightful]({{< relref "what-are-actionable-insights.md" >}})*.

## t-SNE visualization explained
The goal is to represent our data in 2d, such that when 2d points are close together, the data points they represent are actually close together.

As explained elegantly by [Andrej Karpathy](http://karpathy.github.io/2014/07/02/visualizing-top-tweeps-with-t-sne-in-Javascript/), *we set up two distance metrics in the original and the embedded space and minimize their difference.* Those distances are seen as joint-probability distributions. _In **t**-SNE in particular, the original space distance is based on a Gaussian distribution[^2],_

<div>$$p_{j|i} = \frac{\exp{(-||\boldsymbol{x}_i - \boldsymbol{x}_j||^2 / 2 \sigma_i^2})}{\sum_{i \neq k} \exp{(-||\boldsymbol{x}_i - \boldsymbol{x}_k||^2 / 2 \sigma_i^2})}, \quad p_{i|i} = 0$$</div>
<div>$$p_{ij} = \frac{p_{j|i} + p_{i|j}}{2N}$$</div>

_and the embedded space is based on the heavy-tailed Student **t**-distribution_. With a gaussian, far-away points would be seen as too far away in 2d; they would then tend to crush together --- the *crowding problem*:

<div>$$q_{ij} = \frac{(1 + ||\boldsymbol{y}_i - \boldsymbol{y}_j)||^2)^{-1}}{Z}$$</div>

<div>$$Z = (\sum_{k \neq l} (1 + ||\boldsymbol{y}_k - \boldsymbol{y}_l)||^2)^{-1}$$</div>


The *[KL-divergence](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence) formulation [measuring the "difference between the distributions"] has the nice property that it is asymmetric in how it penalizes distances between the two spaces:*

<div>$$cost = KL(P|Q) = \sum_{i \neq j} p_{ij} \log \frac{p_{ij}}{q_{ij}}$$</div>

- *If two points are close in the original space, there is a strong attractive force between the the points in the embedding.*
- *Conversely, if the two points are far apart in the original space, the algorithm is relatively free to place these points around.*
*Thus, the algorithm preferentially cares about preserving the local structure of the high-dimensional data.*

The positions in the lower-dimensionnal space (2d) are optimised by gradient descent.

For more information, watch this presentation by t-SNE's creator [youtube video](https://www.youtube.com/watch?v=RJVL80Gg3lA&list=UUtXKDgv1AVoG88PLl8nGXmw ), or read his [clear founding article](https://lvdmaaten.github.io/publications/papers/JMLR_2008.pdf). Don't miss his [page on t-SNE](https://lvdmaaten.github.io/tsne/), with links to the original papers and many implementations.

### Does it work?
I'll let you judge. Here are exemples of outputs for MSNIT digits from the original paper:
![msnit digits](/images/MNIST-tSNE-DigitsInImage.png)
Overall, t-SNE is amazing at revealing structure. Look at the finer details like the slanted eights..!

t-SNE vs PCA is usually one-sided -- if you were still wondering. But t-SNE is far from the only manifold-revealing method. For some intuition read [Christopher Olah's post on Visualizing MNIST](http://colah.github.io/posts/2014-10-Visualizing-MNIST/). You can compare t-SNE vs other manifold learning methods in [here](http://scikit-learn.org/stable/auto_examples/manifold/plot_compare_methods.html#example-manifold-plot-compare-methods-py).


### t-SNE's performance and complexity
The gradient descent steps express themselves as an n-body problem with attractive and repulsive forces, the later helping separationg points further:

<div>$$ \begin{align} \dfrac{\delta cost}{\delta\mathbf{y}_{i}} & = 4\sum_{j}\left(p_{ij}-q_{ij}\right)q_{ij}Z\left(\mathbf{y}_{i}-\mathbf{y}_{j}\right) \\ & = 4\sum_{j} F_j^{attr} - F_j^{rep} \end{align} $$</div>

A [number of ideas alleviate](https://arxiv.org/pdf/1512.01655.pdf) the naive quadratic gradient descent updates:

* When computing similarities between input points, we only care about non-infinitesimal values, ie neighboorhs of each points. For this we can use a tree-based data structure such as a vantage tree. Finishing this step blocks displaying any "in progress" embedding.
* Using the [Barnes-Hut algorithm](https://arxiv.org/pdf/1301.3342v2.pdf) reduces the complexity of the gradient descent steps to `$O\left(n \log n\right)$` in time and `$O\left(n\right)$` in space --- at the cost of approximating. In fact, Barnes-Hut also uses a quad-tree as it tries to summarize contributions of *regions*.
* The origin paper also describes a number of tricks to help convergence...

## How to use tSNE in streaming scenarios: 
Laurens van der Maaten [explains why](https://lvdmaaten.github.io/tsne/) tSNE does not lend itself to streaming so easily:

- t-SNE does not learn a parametrized mapping from the data to R^2.
- Nor does it offer any way to get updates.

Still, he offers some recommendations for those who would like to try:

1. **Compute tSNE in batch** and while waiting train X and Y learners on the previous tSNE mapping.
2. **[Directly learn a mapping](https://lvdmaaten.github.io/publications/papers/AISTATS_2009.pdf)**, optimizing for tNSE's loss function, for instance using neural networks.
3. **[Adaptative tSNE](https://arxiv.org/pdf/1512.01655.pdf)**, which uses an approximate kNN datastructure that allows insertions and deletions.

In the following posts we will offer implementation details. Stay tuned!


[^1]: As a bonus, most distances are preserved through even random projects. See [sklearn's page](http://scikit-learn.org/stable/modules/random_projection.html) for references of experimental validations. If you strugle PCA'ing your data, try random projections :smile: :beer: :pizza: :rocket:
[^2]: The variance `$σ_i$` is adapted to the local density in the high-dimensional space. t-SNE lets the user specify a "perplexity" parameter that controls the entropy of that local distribution. The entropy amounts to specifying how many neighbours of the current point should have non-small probability values. It works like a continuous choice of k nearest neighboors.




