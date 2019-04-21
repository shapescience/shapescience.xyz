+++
date = "2016-12-25T10:00:00Z"
draft = false
title = "Choosing optimization algorithms"
author = "arthur"
tags = ["advice","optimization"]
image = "images/arcimboldo-vertumnus.jpg"
artist = "Giuseppe Arcimboldo"
whitelogo = true
+++

A friend wanted my opinion on optimization with genetic algorithms. I advised him to take a step back. Why am I so boring?

<!--more-->

## It's all about engineering
It's not that his idea was flawed: after all, he was tackling a difficult combinatorial, non-trivial problem, where [genetic algorithms](https://en.wikipedia.org/wiki/Genetic_algorithm) could have shined.

It's just that trying the most complicated algorithm first is rarely a good idea. Just like for classification problems you shouldn't try deep learning first, don't rush for genetic algorithms for optimization. [Be boring, be an engineer](https://shapescience.xyz/blog/10-pieces-of-advice-to-beginner-data-scientists/).


## Understand what you are trying to solve
Focus on framing your problem as a *well-defined* optimization problem:

1. **What** do you optimize? Continuous variables? [Integers](https://en.wikipedia.org/wiki/Integer_programming)? Some [object arrangement](https://en.wikipedia.org/wiki/Combinatorial_optimization)? A [resource allocation](https://en.wikipedia.org/wiki/Operations_research)? A [flow](https://en.wikipedia.org/wiki/Maximum_flow_problem)? A [path](https://shapescience.xyz/blog/pathfinding-algorithms-introduction/)? Some distribution or belief? A [linear combination under linear constraints](https://en.wikipedia.org/wiki/Linear_programming)? etc.
2. **For what** objective function, score or fitness? Is it [behaving nicely](https://en.wikipedia.org/wiki/Convex_optimization)? Is [finding *any* solution](https://developers.google.com/optimization/cp/) already great? Do you have [multiple objectives](https://en.wikipedia.org/wiki/Multi-objective_optimization)? Are you optimizing a [black-box, or functions so costly that computing derivatives is not possible](https://en.wikipedia.org/wiki/Bayesian_optimization)? Being clear about the fitness / validity function is incredibely important.
3. **Under what** [constraints](https://en.wikipedia.org/wiki/Constrained_optimization)? Equalities or inequalities? 

> A clear understanding of your problem will lead you in the right direction. It will help you decouple *what* to optimize and *how* you optimize it.


### Modeling complex problemes is not simple
Let's take the following problem: *you have a fleet of trucks, each traveling between cities. You goal is to minimize the number of trucks on the most-used road. Which route does each truck take? You also need to send boxes in the trucks, and they have a maximum capacity...*

- Should you separate and solve sequentially the various subproblems (routing, box allocation...)?
- Should you have variables for each road deciding whether each truck uses it?[^flow-formulations]. Should you precompute allowed routes in advance[^preprocessing-vs-heuristic]?
- Should your model include tricks that help your solver? For linear-programming those could be symmetry breaking constraints, or modeling some as "lazy" because they are often not enforced...
- How do you leave yourself room for changing requirements?

[^preprocessing-vs-heuristic]: This will narrow the search space. A 5% quick heuristic is better that a preprocessing that reduces the search space and costs 5% optimality.
[^flow-formulations]: Those approaches are called link-path and node-link formulations respectively.

> Finding good models that are expressive and easy to solve for is hard. Benchmark your options!



### How do you optimize? Which optimization algorithm to choose?
Genetic algorithms is one of the few methods where you mix solutions (breeding, crossover). Usually you *local perturbations* (mutations) are good enough. So genetic algorithms is the longest method to implement[^ga-wasting-time]. Keep that in mind and look at the many other ways to [solve optimization problems](http://cs.gmu.edu/~sean/book/metaheuristics/Essentials.pdf)! Here are common contendenrs for problems where genetic algorithms are considered:

- If you can think of a greedy algorithm... try it!
- Repeated [hill-climbing](https://en.wikipedia.org/wiki/Hill_climbing) should be the go-to benchmark.
- [Simulated annealing](https://en.wikipedia.org/wiki/Simulated_annealing) is generally a good and easy bet.
- [Tabu search](https://en.wikipedia.org/wiki/Tabu_search) has a good reputation for combinatorial optimization, and can be used as soon as you understand the structure of the possible mutations.
- There are other population-based algos: bee/ant colonies...

> Spend as little time as possible on the HOW at the beginning.

As long as you decouple what/how, solvers should be mostly plug and play.
Once you have a few options to solve your problem, benchmark on multiple problem instances: quality-vs-size, speed-vs-size, preprocessing heuristics, scoring heuristics for subproblems...

[^ga-wasting-time]: At the beginning, be careful of spending too much time investigating GA-specific issues : implementation, breeding... Many people feel GA don't achieve better than hill climbing, because of eventual lack of diversity on your population and costly fitness evaluations. Crossover could help for this.



## Is your optimization doing a good enough job?
There is often no way to know for sure. All you will ever get is benchmark on  simpler problems. Measure your gap on those.

> An imperfect optimization that scales is often better than an intractable optimum algorithm. Work no more, **but no less** than your ROI allows.

Always benchmark. When an optimization technique "works" but doesn't scale, people are tempted to progressively narrow its search space through preprocessing. It ends up still being used in production, but becomes slow, under-performing and unmaintainable.

When tasked with optimization problems, you should be able to say:

> I have this problem, I am doing optimization of those parameters, and we settled with this technique to optimize. Here is our benchmark. Here would be the business impact of better performance.
