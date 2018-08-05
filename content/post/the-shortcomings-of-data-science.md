+++
date = "2016-08-28T09:00:00Z"
draft = false
title = "The shortcomings of data science"
author = "arthur"
tags = ["datascience"]
image = "images/depero_la_rissa_1926.jpg"
artist = "Fortunato Depero"
+++

Data science suffers from many flaws, well-known by practioners.

<!--more-->

## Models are blind
Machine learning models are made to be applied, not understood.

Only the simplest models can be interpreted. While getting first insights from linear models is [of course best practice](http://nerds.airbnb.com/nps-rebooking/), those are put aside in production, when accuracy matters.

How could you explain the "reasonning" behind a tree-based or ensemble model? Any model able to capture feature interactions won't be explainable. Neural networks are specified by millions of coefficients but surely can't be *described* by them. Even feature engineering can hide dark corners. 

### Can we escape from black boxes?

I never like to call anything a black box. My feeling is that a logistic regression is no less a black box than a k-nn classifier. The later only has a less straightforward sensibility analysis. As a data scientist I was trained not to think of SVMs or random forests as alien. Aren't they natural?

In fact asking for models whose internals are understandable seems a wrong direction to me. Today, *understanding via modeling*[^1] has been replaced by *understanding via feature engineering*. We may express this as "in cross-validation we trust."[^2]

The problem is that while I can try to improve my models using my intuition, whether geometric, mathematical or grounded in common sense, I never truly know why they behave as they do. I have to admit *all models* are black boxes:

> What is a better model able to capture that the previous one did not?
> Why did the model make *this* decision?
> How does it "see" the data?
> Could I even get *much* better results?
> Where and why is my tuning working?


## Churning through models does not enlighten
In the recent years, we have seen a rush towards ever more complicated models[^3]. Yesterday it was random forests. Now boosted trees is all the rage.
Many [just use XGBM by default](https://github.com/dmlc/xgboost), and they are right since it works easily. Many have started adding features computed from models to usual features. And blending outputs from tSNE[^4]. And thinking about deep learning from day 1 while having already clear features..

Did the results improve so much? Not really: we gained a few percentage points in the process. In Kaggle competitions my impression from reading winners' comments is that most of their edge comes from features[^5], carefully controlling over-fitting, ensembling and finally better models. More complicated models provide only incremental gains.

This should not come as a surprise. The [unreasonable effectiveness of data](http://static.googleusercontent.com/media/research.google.com/fr//pubs/archive/35179.pdf) over models limits, if not models' usefulness, at least their specific advantage. Today's bigger datasets unlocked most of today's improvements in machine learning.


## We are missing something
The recent years have been marked by the rise of deep learning.
We are very fortunate that neural networks give us easy ways to glance at what they have learned [on each layer](http://www.cs.toronto.edu/~rgrosse/cacm2011-cdbn.pdf). [Generating images that activate the upper layers](http://research.google.com/archive/unsupervised_icml2012.html) provides eye-openning insight into what we actually computed.

Neural networks' generative abilities never ceaces to amaze, from the so called [deep dreams](https://research.googleblog.com/2015/06/inceptionism-going-deeper-into-neural.html), to [text generation from raw characters](http://karpathy.github.io/2015/05/21/rnn-effectiveness/). They can learn [exceptionnal linear embeddings](https://arxiv.org/abs/1511.06434) and even produce lend themselves to [visualising image classification models and saliency maps](https://arxiv.org/pdf/1312.6034v2.pdf).

Still, the [recent findings about in adversarial training](http://www.kdnuggets.com/2015/07/deep-learning-adversarial-examples-misconceptions.html), [persistent trivial errors](http://rocknrollnerd.github.io/ml/2015/05/27/leopard-sofa.html), or [universal adversarial perturbations](https://arxiv.org/pdf/1610.08401v1.pdf) suggest there is a lot we don't yet grasp on how our -- even basic -- models understand the data.


> We need some torch to understand how models thinks.

Some researchers gave up trying to explain models' "structure" - their internals - and have focused on explaning their "behaviour"[^6]. I have been for a long time enthousiast about [Ayasdi](https://www.ayasdi.com/)'s work: they exploit [topological data analysis](https://en.wikipedia.org/wiki/Topological_data_analysis) tools to shed light on the data's shape. 

*We will shortly publish advice for model debugging.*

## When does model introspection become mainstream?
We are blessed with better tools every year. Does this feel familiar?
```python
from sklearn import *
```
Standardization is a good force. Data scientists are now given performant implementations of all common algorithms on all data plateforms. Worrying about implementation correctness is mostly gone. A lot of effort was put into being able to build ever mode complicated pipelines: distributed, real-time...

Still, automatic tools for model debugging are not so common. We will need them:

> There is no moore's law for machine learning's power.

We will keep having more data. But most of the time big data will remain just unaggregated data. "Big data science" will not be a silver bullet. It may even be a distraction.

### The tools we need
- **Understand our model's [failure modes](https://en.wikipedia.org/wiki/Failure_mode_and_effects_analysis)**. This is still the most [insightful debugging tool](http://karpathy.github.io/2014/09/02/what-i-learned-from-competing-against-a-convnet-on-imagenet/).
- Easy to use sensitivity analysis.
- Easy to use dimensionnality reduction vizualization.
- Model instrospection could be done by generating exemplars (of the data, of a specific class..) like neural networks have been doing.
- Maybe easy access to vizualisation tools specific to particular algorithms[^7].

[Contact us if you want to hear about our model introspection projects.](mailto:hi@shapescience.xyz)

[^1]: Historically, modeling was often slow to catch empiricall "insight". For instance Kepler used Tycho Brahe's astronomical data to devise its laws. His [third law may be seen](http://astronomy.stackexchange.com/questions/8849/how-did-kepler-guess-his-third-law-from-data) as an early success of blind linear regression!

[^2]: Our clients and managers think we deal with statistical flukes with our (often) formal training in statistics.

[^3]: I don't count as complicated some techniques that might surprise you. Learning how to do [gradient descent with gradient descent](https://arxiv.org/abs/1606.04474) is almost natural in my book for instance. Adversarial training with [DCGAN](https://arxiv.org/abs/1511.06434) is a great idea and I'll happily excuse its "complicated" details. To me it is in the good direction towards a non-parametric everything.

[^4]: Using tSNE is a idea in fact, see e.g. the [Otto challenge on Kaggle](https://www.kaggle.com/benhamner/otto-group-product-classification-challenge/t-sne-visualization/output). Don't  miss learning about [tSNE's internals](https://www.youtube.com/watch?v=RJVL80Gg3lA&list=UUtXKDgv1AVoG88PLl8nGXmw).

[^5]: Aren't the premise of neural networks about being able to learn a hierarchy of features? Then only come all the tricks, the RNN magic, etc, which are to me less relevant here. See [the unreasonnable effectiveness of deep learning](http://www.cs.tau.ac.il/~wolf/deeplearningmeeting/pdfs/lecun-20141105-tau-intel-master-class.pdf).

[^6]: [Using Visual Analytics to Interpret Predictive Machine Learning Models](https://arxiv.org/pdf/1606.05685.pdf) - Josua Krause et al.

[^7]: AirBnB made a convincing go at [random forest interpreation](http://nerds.airbnb.com/unboxing-the-random-forest-classifier/) investigation where they cut variables.
