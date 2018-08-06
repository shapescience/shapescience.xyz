+++
date = "2016-08-21T09:00:00Z"
draft = false
title = "What are actionable insights?"
author = "arthur"
tags = ["product","datascience"]
image = "images/futurism_meccanica_benedetta_speeding_motorboat.jpg"
artist = "Benedetta Cappa Marinetti"
whitelogo = true
+++

Every data company boasts its ability to provide actionable insights. Is this term more than marketing?

<!--more-->

## Business Intelligence vs. actionable insights
Companies need to track their progress towards their various goals. They need metrics to track what works, where, and when: this is the heart of BI. Understanding **why** operations are successful is what insights are about.

An insight is actionable *if you care* and *if you can do something about it*.

When you know what to look for, BI tools will help you slice and dice your data until patterns (hopefully) become apparent. This requires an active use of BI. Reporting won't be enough and most often dashboards will be too macro to be useful.

You will want visualization tools useable by those in your organisation most familiar with the subject. [Tableau](https://www.tableau.com) is the benchmark, with many, many possible solutions[^1].

Many insights happen here, without involving data science wizardry[^2]. Recall that looking at data manually is the first step in the data scientist's playbook.
This does not mean doing it is easy.
Organizations face challenges such as data silos, IT struggles, data quality, education, implementation delays and inadequacy, outdated technology... Even though BI has become mainstream today, it often fails to realize its full potential.


### Why BI often doesn't lead to action
Humans are great pattern recognizers. Even without BI they certainly get the big picture and know the trends. While BI helps your people verify their intuitions, chances are they are already acting upon them to improve the business. In short, *BI insight is often not novel* --- and won't lead to new plans of action.

Going further than macro intuition is difficult for three reasons:

1. **BI gives you answers not discoveries.** You will overlook hypotheses you had not thought of.
2. BI does not ship with tools to recognizing statistical flukes.
3. Old data can be biaised; you need experiments![^3]

If you don't have a way to systematically turn insights into recipes for success (the **how**), most likely you'll create a smart but barren Powerpoint presentation.

> Insights without plans for action leave you with problems you can't solve and problems you don't see.

## "Actionable" means blendable into day-to-day operations
Insight needs to be realized by action. How will you do it?
The information has to be turned into briefings, plans, recommandations... This should be thought out from the beginning. It is not about "data analytics", not about "big data" and far less about "science".

When you start a data project, make sure those involved understand your processes well. Otherwise you risk gathering trivial insight or not understanding your findings' root causes.

Here is some advice for data projects:

1. An exploratory phase is needed to round up the available data and start the conversation accross the company.
2. The scope of the first deliverables should be expected to be narrow and incremental. Don't let lose the momentum by shooting for too disruptive projects. Let a thousand flowers bloom.
3. Then, expand your goals well and focus on ROI. Prioritize.

In a recent review on [automation](http://www.mckinsey.com/industries/oil-and-gas/our-insights/digitizing-oil-and-gas-production), McKinsey introduced a funnel showing many steps where data initiatives can fail due to what they call "data leakage":

![Funnel of failures for digital projects](/images/digital-funnel-failure-data-projects.svg)

## Do you even want actionable insight?
Many companies have in place scoring engines for marketing, lead prioratization, recommendations, etc. In those firms, actionable insight feels outdated. For them the goal is simple: improve predictive models.

It doesn't mean they don't need better insights, but asking them to be actionable feels redundant. At scale, insight should be used transparentely in your workflow with automated assistant tools or embedded right inside a product. This is what *predictive analytics* are about.


[^1]: There is always something new in viz. Check out [MapD](https://www.mapd.com/)'s GPU-powered prowesses: they do real-time queries on TBs of data.

[^2]: It is not uncommon for naive machine learning models to have surprisingly good performance. Don't just assume you need data science. Still, doing BI right is a great stepping stone to more complex projects when the time comes. Remember you don't have to have data science to be data-driven.

[^3]: A retail company was wondering to which customers it should send promotions. It used to contact only its best customers, but later realized some low-spending ones might be loyal elsewhere... And made a hit marketing to them.
