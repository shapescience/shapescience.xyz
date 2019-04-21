+++
date = "2019-02-20T10:00:00Z"
draft = false
title = "Algorithm engineering: does it have to be a mess?"
author = "arthur"
tags = ["real-life", "engineering"]
image = "/images/homer-veteran-in-a-new-field.small.jpg"
artist = "[Winslow Homer](https://www.metmuseum.org/art/collection/search/11145)"
whitelogo = true
+++
Algorithm engineering is hard to scale. While the core of most algorithms can often be described in a dozen lines of pseudo-code, real projects need to worry about many painful issues.

<!--more-->

- **Software engineering** is not the strong suit of algorithm engineers or data scientists. They often will need to get comfortable with version control, learn to write code that other can contribute to, dependency management, often Linux, etc.
- **Visualizing results**: common failure modes, KPIs, training behaviour, logs...
- **Comparing** results from different iterations of the algorithm or from a benchmark.
- **Tracking progress** over time and spotting regressions
- **Collaboration with QA** is crucial. How do they try the algorithm on new datasets ? How can they do fine tuning or give feedback?
- **Reproducable experiments**: worrying about random seeds, dataset immutability...
- Not every algorithm's objective is a well defined loss function. When your KPI is a **subjective metric**, you quickly need ways to manage blind evaluations.
- Sadly, the real world brings additional problems like handling **calibration and edge cases**...
- Organisation that **deploy** models need to worry about yet other issues: deployment on various platforms, monitoring...
- Purely **logistic concerns** like managing hardware (GPUs...) and fair-use between users tend to be time consuming. Doesn't matter how much you buy, soon everything will be used at full capacity!

> Did I mention algorithm engineers also need to research models, try and optimize them ?

**How does your company solve those issues ?**
