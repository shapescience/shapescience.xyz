+++
date = "2016-11-09T10:00:00Z"
draft = false
author = "arthur"
image = "images/repas-du-lion.jpg"
whitelogo = true
artist = "[Henri Rousseau (le Douanier)](http://metmuseum.org/art/collection/search/438822?sortBy=Relevance&amp;ft=douanier&amp;offset=0&amp;rpp=20&amp;pos=1)"
title = "Interview: data science methodology"
tags = ["interview", "datascience", "advice", "best practices"]
+++

*I am happy to count [Meir Toledano](https://il.linkedin.com/in/meirtoledano/en) as Shape Science's first interviewee. At Anodot, one of Israel's hottest startups, he develops real-time anomaly detection algorithms.*

<!--more-->

![Meir's picture](/images/meir-small.jpg)

**What does [Anodot](http://www.anodot.com/) do, and what is your role?**<br>
Our specialty is the real-time detection of incidents from time-series. Our customers want to react immediately to their infrastructure (servers, IoT, fintech) or conversion rates (adtech, e-commerce) issues. All our architecture is data-driven to alert our users as fast as possible. I help develop the algorithms that classify and correlate anomalies.

After two years, we established offices in 3 countries and [just raised a series B](http://www.anodot.com/anodot-news/anodot-secures-8m-in-funding/)! Day to day, it means the number of time-series we monitor is growing tremendously each month!

**Is it "big data" yet?**<br>
Certainly! We handle real-time analytics on millions of time-series.
On top of the "usual" big data stack (Hadoop, Spark, Cassandra...) we created custom tooling to ingest and process our data.

## Advice for problem modeling
**Isn't machine learning magic?**<br>
When it works! Often, you *only* have to make a prediction from features.
Decent feature engineering and tools like random forests will get the job done. "Blind" algorithms go a long way!

> When it doesn't work, a sane methodology and deep theorical background help get back on your feet. Modeling becomes critical.

**Don't we hear deep learning killed modeling?**<br>
People often think deep learning removed the need for modeling. I would't be so sure! DL does take care of feature learning, but uses building blocks such as convolutions, which are a natural way of modeling locality. Neural networks are hierachical, which naturally encodes models such as [bags of visual words](https://en.wikipedia.org/wiki/Bag-of-words_model_in_computer_vision) or [deformable parts](https://people.eecs.berkeley.edu/~rbg/papers/Object-Detection-with-Discriminatively-Trained-Part-Based-Models--Felzenszwalb-Girshick-McAllester-Ramanan.pdf).

So much work is underway to find new useful [deep learning architectures](http://www.asimovinstitute.org/neural-network-zoo/) (recurrent, adversarials, with memory, attention...) that I wouldn't say the days of modeling and thinking are over!

**For time-series, did you try recurrent neural networks?**<br>
Every couple of days someone asks me if we use deep learning. Few wonder how we compare against "traditional" statistics and econometry techniques!

This said, we don't currently use deep learning for a number of reasons:

- Performance is not high enough: we can't afford to evaluate large models on each event we receive.
- Training a model per series would be painful at our scale. We'd need a theorical breakthrough (possible when we look at the [improvements in style transfer](https://research.googleblog.com/2016/10/supercharging-style-transfer.html)), or more hardware!
- Our lighter approaches work very well, why hurry using deep learning?
- We feel deep learning theory is too light to give us robustness garantees. 

**Do you use Recurrent Neural Networks? [Training for long-range interactions](https://www.cs.toronto.edu/~hinton/csc2535/notes/lec10new.pdf) seems hard yet is critical for anomaly detection.**<br>
I agree! We need to make sure our algorithms capture time series' underlying structure.

We need careful understanding of the tradeoffs we make. We need garantees on seasonality as well as robust performance on benchmarks. Real-world time-series behave in all sorts of unexpected manners...

We don't feel confident at this stage using DL, but we're constantly reevaluating.


## Advice for algorithm engineering

**Can you tell me about your process for algorithm development?**<br>

> We are engineers: *one problem, a solution*. This means delivering a solution, but also understanding the problem!

My method is a continuous dialogue between theory and experimentation. Some call it the scientific method! 😊

Spending some time in my old books and Google Scholar is a first step. Someone *has* worked in the topic. There, I round up the vocabulary, find relevant papers... Simply put, if you don't know in details what you are talking about, not only are you slow, you're likely just lost.
<!-- In past projects I witnessed colleagues waste months unaware of better approaches or frameworks... -->

**Science being a lot about "one object, [many points of view](https://shapescience.xyz/blog/perspectives-on-pathfinding-algorithms-networks/)", what makes you confident you have a good algorithm?**<br>
First, knowing what I use and its limits helps! Quality Insurance (QA) is hard thing to get right:

- Compilation success is obviously not enough!
- Success on unit tests is good -- never work without -- but this approach is limited. They don't deal with scaling, and hardly at all about robustness.
- Getting feedback from production is essential. We are constantly looking at false positives/negatives rates as well as other metrics.
- Always track *some* notion of error. It lets you know where progress were made. Using the [6 sigma process](https://fr.wikipedia.org/wiki/Six_Sigma) did wonders in a previous job - it works!

Overall, [understanding machine learning errors is difficult](https://shapescience.xyz/blog/the-shortcomings-of-data-science/)! For anomaly detection there is always some room for subjectivity depending on clients: avoiding false positives when you have someone on pager is critical.

**What is your process for model debugging?**<br>

> Like all with debugging: find the bottlenecks. So find where errors are. Prioritisation is key.

1. At first you should look at many samples and try to get an "eye" for how the algorithm behaves. It helps strengthen your intuition. A good visualization tool is essential. Learn how to tell apart bugs, wrong parameters or thresholds, noise...
2. Then build benchmarks with datasets both synthetic and from production. Verify your algorithms work as expected. *Identify regressions early by creating tests from benchmarks*.
3. Instrument and monitor all parts of the stack.
4. Don't make too many assumptions on data quality!

**What is the place of visualization in debugging?**<br>
Shortening the loop from data to understanding is essential, and graphs play a key role in this process. We built internal visualization tools, but the problems are very much the same for our client-facing UI.

We have endless discussions on how to best organize it! We need understandable graphs, while providing just enough explorability and context.


## Technology choices for data science
**How do you do prototyping?**<br>
For me it is a huge error to separate prototyping and production (unless you need hardware acceleration). Many researchers prototype using Matlab[^matlab], R... and rely on engineers to translate the code to C++, Java etc. I have always felt this leads to loss of velocity, duplicated tests, difficult feature convergence, harder to spot bottlenecks, fire-fighting on the production code...

It doesn't mean one shouldn't use eg Python: if it is your production langage go for it, just make sure to offload heavy computations to optimized libs!

> My advice: *learn the langage used in production and use it*.<br>
> Research and do informed tradeoffs, for software technologies as well as algorithms.

[^matlab]: Sadly most Matlab people don't know anything about software engineering. Accepting Matlab often encourages bad practices.

**So which langage do you code in?**<br>
This said, pen and paper go a long way for prototyping an algorithm 😏.

Currently I use Java. Almost all of our code is Java -- aside from devops tools, frontend, and a couple scala libraries... Jave has amazing tooling covering the whole development lifecycle.

The ecosystem of numerical/high-performance/algorithm open-source tools could be better in Java... but in the end we end up writing custom tools anyway so it is not that much of an issue.

**Still, I know you are fond of [R](https://www.r-project.org/): how does it fit in your daily work?**<br>
Using R in production bit me in previous jobs, I had issues with reliability, correctness, dependencies... Not all packages on CRAN have the same standards and a lot of core functionnality is duplicated.

Even then, even with its quirks, I enjoy working with R a lot. It is a good choice to quickly test an algorithm's feasability. It has all the statistical tools you need. The [tidyverse](https://blog.rstudio.org/2016/09/15/tidyverse-1-0-0/) made R an *amazingly* expressive and unified langage for data manipulation. The [RStudio](https://rstudio.com) team brought phenomenal harmonisation.

Today, I call all my benchmarks from R. For fine-tuning it lets me easily run analyses to understand the effect of each parameter. *We use R for QA.*

## Becoming a data scientist 
**Which technologies do you recommend learning?**<br>

> Learn lasting technologies: mathematics?

Lasting software skills are harder to identify, especially if you want to ride the big data wagon: see how Spark succeeded to Hadoop, etc. Pick mature and/or fundamental technologies like C++, Java, C#, Python... Ideally know both a high-level langage and a lower level one.

Understand how to get good performance if needed; you'll be good. Don't commit too early to a choice of technology, or let yourself be defined by it.

For a company, this advice holds as well. Don't choose esoteric and custom langages: you'll be trapped and could have trouble not only recruiting but also maintaining!

**You company, Anodot, is hiring. What do you look for when hiring a data scientist?**<br>
We need solid engineers and researchers with strong fundamentals. For me, a good data scientist should be able to read papers, implement them if needed, and quickly turn ideas into code.

It's harder for people from a pure software engineering background to master the theorical knowledge we are looking for in our data science positions. The best candidates are often "scientists who can code".

In any case, the *eagerness to learn* is fundamental.
