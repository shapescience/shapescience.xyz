+++
date = "2016-08-25T10:00:00Z"
draft = false
title = "10 pieces of advice to beginner data scientists"
author = "arthur"
tags = ["advice","datascience"]
image = "images/exhibit_italian-futurism-1.jpg"
artist = "Giacomo Balla"
whitelogo = true
+++

We hear a lot about who data scientists *are*. But... how should one *get better*?

<!--more-->

## Help the business
Going after the best models is not *exactly* what you are paid for.
It does not mean you shouldn't work on the science, but keep in mind which problems are crucial and [which solutions can be actionable]({{< relref "what-are-actionable-insights.md" >}}). If you have a good model but you realize there is no way to turn your analysis into processes or products, find a new challenge.

This being said, writing blog posts or research articles can help you structure your thoughts.

When coding, choose well what you outsource to libraries. In young organizations or projects the first priority should be to get a minimum viable product out the door quickly. There will come a time to improve your models after that.

## Understand the data's lifecycle
Where does your data come from? Make sure you know how it was processed and who could benefit from your help.

For instance, I once attended a workshop by [Wix](http://www.wix.engineering/), a website builder company. A friend transfered me a dataset including timestamps for page generation and subsequent user interactions. Because he had truncated timestamps to the nearest second, I was unable to realize that longer page generation times led to catastrophic drops in engagement.

## Talk to colleagues
In software companies this is often obvious. Learn from software engineers. Chances are they know more about best practices, tooling and devops than you do as a data scientist.


**In non-software companies** non-tech peers will be able to help you a lot. They usually have a different perspective and may know how you will be able to help them. Improving or empowering their work is why you are here for.

They understand your data much better and will recognize data quality issues faster than you will. Your feature engineering work will benefit a lot from their insight.

Learn about the history of projects started by your colleagues. Ask about issues they encountered along the way. Try to take different paths or revisit them if e.g. you now have much more data. Data projects are usually enabled by data entry rules started years before.


## Small projects are cool
Narrow scopes help a lot your work as they provide clear data and metrics.  On the datatau discussion, [Ra](http://www.datatau.com/user?id=Ra) noted that it is good to "choose tractable projects that you can take ownership of."

[Apple just started talking](https://backchannel.com/an-exclusive-look-at-how-ai-and-machine-learning-work-at-apple) about their machine learning work. Beyond Siri, one of the major examples is how they predict which apps you'll open next when you use the app drawer.
In my opinion, it is the perfect illustration of how small machine-learning-powered features can improve user experience a lot.

## Document what you do
Having a "paper trail" is very important.

- Save your server's setup scripts in case of disaster, dependencies issues, or to save yourself troubles when you will want to go to production. Even if you are part of an established business with colleagues to help you, be autonomous.
- Write "lab reports" in the form of [notebooks](http://jupyter.org/). It will force you to think about a data story, and will be shareable nicely. Literate programming is a great fit for data science. Experiment in those. Be inspired by [AirBnb's scalable knowledge](https://medium.com/airbnb-engineering/scaling-knowledge-at-airbnb-875d73eff091#.dv1vqgppe).
- Create solid libraries and packages as you need to declutter the notebooks.

## Be a strong data mungler
Manipulating data should not get in your way.
Whether you need to [aggregate data](https://cran.rstudio.com/web/packages/dplyr/vignettes/introduction.html), filter it, [tidy it](https://cran.r-project.org/web/packages/tidyr/vignettes/tidy-data.html), maybe crawl it or build any kind of pipeline, make you are up to it.

## Don't fall for the hype
Deep learning... Distributed systems... Stacking outputs as features.. 
Don't go for extreme data science *at first*.

Most likely you will not need it and it will be a distraction. Use your laptop for as long as possible. Yes your friend at X works at peta scale, but in most cases sampling and aggregation will be enough for research...

Be skeptical. Use familiar tools: "If it ain't broke don't fix it". Consider that using any project younger than a few year will result in inavoidable pains (breaking APIs, flexibility, bugs...). Allow yourself only a couple of new pieces of technology per work project.

Even if your work involves reading and implementing papers, start by making sure your team has good reproducable benchmarks, and add complexity as needed.

> Be boring until you can't.

## Be decent at visualization
No need to be a `d3.js` or frontend master, but at least:

- Know how to make decent graphs and how to choose which ones to use[^plot].
- Learn about color theory enough not to embarass yourself. Aim for [legibility and information density](https://www.edwardtufte.com/tufte/books_vdqi).
- Interactive vizualizations are unavoidale now --- and each year easier to do[^interactive-plot].

[^plot]: In R `ggplot2` is key. The Python landscape is more fragmented with [many](https://dansaber.wordpress.com/2016/10/02/a-dramatic-tour-through-pythons-data-visualization-landscape-including-ggplot-and-altair/) quickly improving options like [seaborn](http://seaborn.pydata.org/), the [ggplot2 port](http://blog.yhat.com/posts/new-ggplot.html), or even [matplotlib](http://matplotlib.org/) for the daring.

[^interactive-plot]: [R's shiny](http://shiny.rstudio.com/) helped me create my first web apps. It remains the fastest way to create data-rich web apps. For pure plotting consider [mpld3](http://mpld3.github.io/) or [plotly](https://plot.ly). So many things can go wrong that you should prefer mature libs...

## Always be learning
Here are some ideas:

- Your langages' ecosystems.
- More maths. More domain knowledge (think image processing, NLP, time-series...). For this, aside from reference books, find openly available university courses or do MOOCs on Coursera and co. They should be valued close to university degrees (especially if you already have a previous BS/MS).
- Follow the news, say on [datatau](http://www.datatau.com/), [reddit](https://www.reddit.com/r/datascience/) or [twitter](https://twitter.com/shape_science). Find out new interesting things. Broaden your horizon. Make connections.

## Handling expectations you're a unicorn
Last but not least, data science covers a lot of ground. You can't learn everything in one day, and you don't need to in order to be effective. Here are a few more tips:

- Don't hesitate to say you don't know something.
- Rely on strong fundamentals, in maths, statistics, and computer science. There is no way around it, and it will make machine learning techniques so much easier to understand -- know them as well as you can.
- Know tech and techniques' names or someone might (sadly) think you are a fool.
- Skim over open-source projects' documentation. Get the fundamentals and the motivations behind them.


**You may like the discussion on [reddit](https://www.reddit.com/r/datascience/comments/595a1a/pieces_of_advice_to_beginner_data_scientists/) and [datatau](http://www.datatau.com/item?id=14945)!**