+++
date = "2018-10-01T10:00:00Z"
draft = false
title = "Pathfinding algorithms: Introduction"
author = "arthur"
tags = ["pathfinding"]
image = "images/Rain_Steam_and_Speed_the_Great_Western_Railway_cropped.jpg"
whitelogo = true
artist = "William Turner"
+++
All computer scientists should know how to find their way. But not all researchers name this task the same. Pathfinding is a good example of a problem that takes many different shapes depending on why answers the question.

<!--more-->

A critical step in problem solving is [finding how to think](/blog/interview-data-science-methodology-with-anodot) about the problem at hand. This means *finding the correct abstraction* --- and naming it right. I usually start my projects by mapping all the related concepts. As one of my university teachers[^1] explained:

> One way to succeed is to be the last to rediscover a powerful idea.
> The solution to your issue certainly hides in a PhD thesis somewhere.

[^1]: Nikos, of course.

**How do we go from `A` to `B`?** Many problems can be framed as pathfinding, and different frameworks of thought will be useful depending on the application:

![map of topics and useful algorithms for pathfinding](/images/pathfinding-landscape.png)

In this blog posts series, our goal will be to *describe the problems* faced by those who study particular flavors of pathfinding, as well as insightful algorithms.


We will start by reviewing ["vanilla" pathfinding, on graphs](/blog/pathfinding-algorithms-graphs/), just to recall the vocabulary. Then we'll describe richer problems: [networks and maps](/blog/pathfinding-algorithms-networks/), states, actions....

> This series is still a work in progress.