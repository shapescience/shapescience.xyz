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

Your responsibility as a recruiter is to give a job description as clear as possible: do you need a data engineer, a visualization expert, a data analyst, an algorithm engineer, or a machine learning researcher? Know what you want, and filter early.

> This article deals with "machine learners" data scientists.

Uncertainties about the job will make the best candidates flee -- unless you're Google/etc. They'll want to understand what tooling is built already, how their work's ROI will be measured, who is in the team...


## Make data scientists talk about what they know
Data scientists have very diverse backgrounds. It is impossible to prepare for each interview: should they study "standard" computer science? statistics? bayesian things? deep learning? machine learning? your company's field?

The good candidates have a basic knowledge of many topics, are hands-on, and have strong knowledge in some domains. Talk about *those* if you want to have technical discussions. Some examples:

- **Problem types:** regression / classification / clustering / anomaly detection...
- **Data types:** computer vision / time series / NLP / recommendation...
- **Complex data:** dimensionality-reduction, manifold learning...
- **Points of view:** deep learning / bayesian machine learning / graphical models...
- **Expertise:** industry insights / optimization / numerical methods...

> Candidate with industry experience should have *failed* projects under their belt. Those lessons are essentials :smile:

My opinion is that “open” 1-1 interviews are better than written in-office tests. Many companies give take-home datasets and ask for an analysis. It can help show who is down-to-earth! For experienced candidates it can be a lot of work to ask - ask instead about their projects, or presence on Kaggle/Github.


## Topics for data science interviews
Still, many topics seem *fair game* in data science interviews. Remember that the goal is to foster the discussion: there is seldom a unique right answer!

### Machine learning and model engineering
- Which algorithms exist for the task you are currently discussing?
- When are they good, good enough, good benchmarks, etc.
- How do they work? How do they scale? How is their parameter fitting optimized?
- How do you rate a model’s performance ? Depending on the context, this can lead to discussions about false positives/negatives, accuracy, recall, AUC, lift... How should one decide?
- How do you do pick the final model ? Performance? training-time? evaluation speed? complexity?
- Understanding cross-validation and bias/variance is critical.
- How do you do variable and model selection? You can talk about information-based metrics, regularization, sparsity-inducing methods like L1 regularization, forward/backward search...

### Data engineering
- How would you design X?
- What preprocessing would you do for task X?
- What about unbalanced data? missing data? outliers?
- And categorical variables of high cardinality…?
- How does one deal with big data? Talk about online learning, map/reduce, (mini-batch) stochastic gradient descent...
- What tools/languages do you know to achieve X? Which ones did you use and why?
- Which visualization tools do you use? Why?


## Making a decision?
**It is a always a leap of faith.** How can you reliably assess candidates' involvement in past projects, their breadth of expertise, or even how well you'd work with them, all in under a few hours?

Don't be afraid to pick candidates with different backgrounds and levels of experience. Data science teams need this. If you are starting such a team, rely on someone with expertise: it is the only way to avoid wasting time with over-hyped tools.
