+++
date = "2016-11-14T13:39:13+02:00"
draft = false
author = "arthur"
title = "Reducing overplotting in scatterplots"
tags = ["advice", "visualization", "big data"]
image = 'images/pollock-dripping.jpg'
artist = "Jackson Pollock"
+++

Nothing spoils a plot like (too much) data.

<!--more-->

> The bottleneck when visualizing large datasets is the number of pixels on a screen.<br>--- [Hadley Wickham](http://vita.had.co.nz/papers/bigvis.pdf)

> Massive numbers of symbols on the page can easily result in an uninterpretable mess.<br>--- [David Smith](http://blog.revolutionanalytics.com/2013/04/visualize-large-data-sets-with-the-bigvis-package.html)

Managing information density is critical for effective visualizations. Good graphics let us understand global shape as well as finer details like outliers. We need a *dynamic range* in visualization, much like in photography with [HDR](https://en.wikipedia.org/wiki/High-dynamic-range_imaging).

![Tel Aviv port, illuminated with HDR](/images/Tel-Aviv-Port_long-exposure_HDR.small.jpg)
*[Tel Aviv port, illuminated with HDR](https://he.wikipedia.org/wiki/%D7%A7%D7%95%D7%91%D7%A5:Tel-Aviv_Port_(long-exposure_HDR).jpg)*

It's clear [scatterplots don't scale](#soon-a-new-article-on-how-classic-viz-dont-scale). But while overplotting is unavoidable well before big data, it is possible to mitigate it and limit symbol saturation.<br>
**[Above all show the data!](https://en.wikipedia.org/wiki/Edward_Tufte)** Let's see how.

## Limiting data-ink
**Sampling** is a great solution if you just want a broad undertanding of your data. You may miss outliers, but if you are good with it, and take care to properly randomize, go for it.

**Filtering by default** can give the user control over the graphic, and prevent overplotting from the start. *Just show less data!* In many cases, you'll have time-dependant data: select *by default* the smallest range that makes sense, and give to brave users an option to add more information. 

**Using smaller points** are an easy fix. Just plot much less! If you use pixel-sized symbols, computing the plot will often be much faster.

**Empty markers**, like circles instead of discs, will give some air to you visualization while keeping individual observations readable. It's a *solid* choice (hahaha!), and R's default graphics opted for this option.

<blockquote class="twitter-tweet" data-lang="fr"><p lang="en" dir="ltr">Using empty markers is a <a href="https://twitter.com/hashtag/solid?src=hash">#solid</a> choice for scatterplots ⭕️😉 <a href="https://t.co/FXW4TqSQgL">https://t.co/FXW4TqSQgL</a> <a href="https://twitter.com/hashtag/overplotting?src=hash">#overplotting</a> <a href="https://twitter.com/hashtag/dataviz?src=hash">#dataviz</a> <a href="https://twitter.com/hashtag/datascience?src=hash">#datascience</a> <a href="https://twitter.com/hashtag/bigdata?src=hash">#bigdata</a></p>&mdash; Shape Science (@shape_science) <a href="https://twitter.com/shape_science/status/798546958260506624">November 15th, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script> 

My experience has been that those ink-wise techniques work well... until someone sends you a bigger dataset...

## Moving the data around
**The order in which you plot points** is important. Overplotting will hide the points at the bottom, so consider removing bias by randomizing your points' ordering.

**[Facetting](https://plot.ly/ggplot2/facet/)** will split your observation into multiple plots and often save your sanity trying to understand how different groups blend.

**[Jitter](http://docs.ggplot2.org/current/geom_jitter.html)** can help if your data points are crowded around *thresholds* or if they are [*censored*](https://en.wikipedia.org/wiki/Censoring_(statistics)). You data is often [less continious](https://www.chrisstucchio.com/blog/2012/dont_use_scatterplots.html) than you'd like. Adding jitter will also do wonders when you have *ordered categorical* variables.


## Fading individual observations
![blending](/images/venn-diagram.png)
**[Alpha-blending](https://en.wikipedia.org/wiki/Alpha_compositing)** means adding some transparency (alpha) to your datapoints' fill color. As they pile up, you'll get a density plot for free. *If using empty symbols is not enough, do this.* There are some pitfalls:

- **Outliers** become hard to see. 
- For R users, `ggplot2` is not smart enough to show the opaque color in your **legend**. You will wonder [how to fix it](http://stackoverflow.com/questions/5290003/how-to-set-legend-alpha-with-ggplot2) every time!

### Color scales and alpha-blending don't mix easily 
It is very possible your points are colored according to an other variable. As points stack on top of each other, you want to retail legibility. Unfortunately [color](https://en.wikipedia.org/wiki/Color_space) are a [difficult topic](http://blog.johnnovak.net/2016/09/21/what-every-coder-should-know-about-gamma/).

The basics are that *for categorical scales you want [perceptually distinct colors](http://tools.medialab.sciences-po.fr/iwanthue/)*, and *for quantitative scales you want [perceptually regular and smooth color transitions](http://tristen.ca/hcl-picker/#/hlc/6/1/273545/E2E062)*. Getting it wrong is easy: it's often best to default to [ColorBrewer](http://colorbrewer2.org/) or [viridis](https://cran.r-project.org/web/packages/viridis/vignettes/intro-to-viridis.html) ([read more](http://bids.github.io/colormap/)):

![Viridis color scale](/images/viridis.png)

#### Quantitative variables and alpha-blending
With a color range with varying luminance and saturation (but not hue) -- [as often recommended](http://www.research.ibm.com/people/l/lloydt/color/color.HTM) -- superposing points will appear darker and more saturated than they are. This makes you misinterpret the data! I would advise to use [multi-hue color scales](https://vis4.net/blog/posts/mastering-multi-hued-color-scales/).

![colorbrewer's multi hue color scales](/images/multi-hue-color-scales-colorbrewer.png)

[An other sad problem](https://news.ycombinator.com/item?id=4030054) is that the resulting transparency when stacking N points is exponentially decreasing. 

> It's flat for most of the regime, and then spikes in a relatively short scale. The spike is where we get color differentiation (different opacities get different colors). That's bad: color differentiation should be uniform across the scale. -- [Carlos Scheidegger](https://cscheid.net/), [@scheidegger](https://twitter.com/scheidegger)

#### Categorical variables and alpha-blending
- You may want to add a 2d density contour layer for extra legibility.
- Blending colors is difficult, especially if you care about [perception](http://www.vis.uni-stuttgart.de/~weiskopf/publications/vis09_blending.pdf). Make sure your scatterplots' colors are not artefacts resulting from the blending process. Be extra careful here.
- For some inspiration, read about ["splatterplots"](http://www.cad.zju.edu.cn/home/vagblog/VAG_Work/IEEEVis2014/Multiscatterplot_haidong/1683_20tvcg12-chen-2346594.pdf):

![splatterplots](/images/splatterplots-explanations.jpg)


## Still too much overplotting? Use binning
[At some point](https://en.wikipedia.org/wiki/Sorites_paradox), all those "big data" points draw a fine [empirical 2d density estimator](https://en.wikipedia.org/wiki/Kernel_density_estimation). So pick the right tools and use [2d density plots](#geom_density_2d) or *binning*-based tools.

More generally you can see the process as `binning > aggregate > (smooth) > plot`. Don't be afraid, it's not far from [`ggplot2`'s logic](http://r4ds.had.co.nz/data-visualisation.html#statistical-transformations). [Here are](http://blog.revolutionanalytics.com/2011/10/ggplot2-for-big-data.html) [some examples](http://stackoverflow.com/a/16122003):

![bin-based plot showing blending](/images/bins-blending.png)

| Aggregating by | gives you           |
|----------------|---------------------|
| count          | density histograms  |
| count > 0?     | the data's [support](https://en.wikipedia.org/wiki/Support_(mathematics))                          |
| median value   | bins' common  values|
| distribution   | bins' distribution  |
| distribution (cat.) |  blending      |

Doing binning right is harder than it looks[^binning-tools-questions]. Find libraries that do the work for you...[^binning-libraries], and read good explanations in [`bigvis`](https://github.com/hadley/bigvis)'s [paper](http://vita.had.co.nz/papers/bigvis.pdf), or [in this presentation by Trifacta](http://skandel.github.io/slides/strata2013/part1).

[^binning-tools-questions]: Should you pick hexagonal or rectangular bin shapes? How do you choose the bin size / banwidth? How do we choose robust summary / aggregation statistics? How much smoothing should you apply along bins, if any? Doing this fast requires solid engineering... 

[^binning-libraries]: [imMens](https://github.com/uwdata/imMens) was inpiring some years ago. I'm out of data really...

## Final tip

If all fails, **show [density marginals](http://www.win-vector.com/blog/2015/06/wanted-a-perfect-scatterplot-with-marginals/)**. In fact, do it even if you don't have overplotting issues!
