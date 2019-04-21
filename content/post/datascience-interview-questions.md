+++
date = "2017-03-14T09:00:00Z"
title = "Interview questions for data scientists"
author = "arthur"
tags = ["datascience","recruiting"]
image = "images/cezanne-joueurs-de-cartes.jpg"
artist = "[Paul Cézanne](http://metmuseum.org/art/collection/search/435868)"
whitelogo = true
+++

Data science is one of the most ill-defined fields in tech. This article may inspire you for your next interview, as a recruiter or as a candidate!

<!--more-->

## Recruiters have work to do
Interviews are hard, and all the more so in data science. Every company has a different opinion on what data science is. Worse, many figure out what they want *during/after* the hiring process.

Your responsibility as a recruiter is to give a job description as clear as possible: do you need a data engineer, a visualization expert, a data analyst, an algorithm engineer, or a machine learning researcher? **Know what you want**, and filter accordingly.

> This article deals with "machine learners" data scientists.

Uncertainties about the job will make the best candidates flee -- unless you're Google/etc. They'll want to understand what tooling is built already, how their work's ROI will be measured, who is in the team...


## Make data scientists talk about what they know
Data scientists have very diverse backgrounds. It is impossible to prepare for each interview: should they study "standard" computer science? statistics? bayesian things? deep learning? machine learning? your company's field?

> Ask a data scientists why they think they are one; you'll get many different answers, **it's good!**

The good candidates have a basic knowledge of many topics, are hands-on, and have strong knowledge in some domains. Talk about *those* if you want to have technical discussions. Ask them what is their secret sauce! Some examples:

- **Problem types:** regression / classification / clustering / anomaly detection...
- **Data types:** computer vision / time series / NLP / recommendation...
- **Complex data:** [dimensionality-reduction](https://shapescience.xyz/blog/t-sne-visualization-with-streaming-data-introduction/), manifold learning...
- **Points of view:** deep learning / bayesian machine learning / graphical models...
- **Expertise:** industry insights / visualization / optimization / numerical methods...

> Candidate with industry experience should have *failed* projects under their belt. Those lessons are essentials :smile:

## Maybe it is best to avoid data science tests
Many companies have candidates discuss logistic regressions and basic bayesian concepts for an hour. Personally I feel those tests only check if you reviewed your ML textbook in the last 6 months... If you need ML/statistics engineers, filter more on the CV and use to interview time to check more important things.

> Data science is about practice, engineering, judgment when selecting approaches and tools.

My opinion is that “open” 1-1 interviews are better than written in-office tests. Many companies give take-home datasets and ask for an analysis. It can help show who is down-to-earth! For experienced candidates it can be a lot of work to ask - ask instead about their projects, or presence on Kaggle/Github...

## Topics for data science interviews
Still, many topics seem *fair game* in data science interviews. Remember that the goal is to get the conversation started: there is seldom a unique right answer!

### Workflow
Working in a structured manner is all the more important that data scientists work with other teams. Their work will need to be understandable and reproducible. You may want to know:

- How they handle the coding process from prototyping to production?
- How they improve upon your models and debug them?
- What tools they use?
- How they document their results, projects and infrastucture?
- How they work with other teams (product/sales/qa/frontend/backend/devops/hardware...)?

> Senior data scientists and managers should be able to lead those issues.

### Machine learning and model engineering
Feature engineering is a central piece of data science projects. It is worth talking about:

- How to discover good features and preprocessing.
- How to deal with unbalanced data, missing data, outliers or even categorical variables of high cardinality…

Model selection is also a big topic, with much to investigate:

- **Which algorithms exist for either a project they worked on, or one relevant for you?**
  * How to decide which to try?
  * When are models good, good enough, good benchmarks, etc?
  * How does those models work? How do they scale? How are their parameters optimized?
  * How can we do hyperparameter tuning?
- **How can we rate a model’s performance ?**
  * Depending on the context, this can lead to discussions about false positives/negatives, accuracy, recall, AUC, lift... How should one decide?
  * How to pick the final model ? Performance? training-time? evaluation speed? complexity?
  * Understanding cross-validation and bias/variance is critical. Candidates should be able to say a few words. With deep learning, things get more difficult to understand though...
- How should we do variable and model selection? You about information-based metrics, regularization, sparsity-inducing methods like L1 regularization, forward/backward search...
- Is it just alchemy and black magic? Can we just cross-validate everything and stop there?


**Data engineering should not be the focus of the discussion**, but it is interesting to know if candidates have not only wrote scripts but also built tools or systems. Depending on your *use-cases*, you could expect exposure to big data friendly techniques (online learning, map/reduce, stochastic gradient descent, dark corners of linear algebra...) or tools (often spark, hadoop...).


## Making a decision?
**It is a always a leap of faith.** How can you reliably assess candidates' involvement in past projects, their breadth of expertise, or even how well you'd work with them, all in under a few hours?

Don't be afraid to pick candidates with different backgrounds and levels of experience. Data science teams need this. If you are starting such a team, rely on someone with expertise: it is the only way to avoid wasting time with over-hyped tools.
