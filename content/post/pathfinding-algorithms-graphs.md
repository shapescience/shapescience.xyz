+++
date = "2018-10-02T10:00:00Z"
draft = false
title = "Pathfinding algorithms: Graphs"
author = "arthur"
tags = ["pathfinding", "grahs"]
image = "images/kandinsky-circles.jpg"
whitelogo = true
artist = "Kandinsky"
+++

Finding one's way in a graph is the [first topic I came across](https://www.redblobgames.com/pathfinding/a-star/introduction.html) when learning how to program. The answer looked simple: use Djikstra's beautiful algorithm -- but there is more to it. 

<!--more-->

## The simplest pathfinding you can do
![simple undirected graph](/images/graph.gif)

The context here is a graph, whose nodes are linked by edges. Which algorithms can help us find how to go from node `A` to node `B`? Most people know about those graph traversal algorithms:

- [Breadth-first search (BFS)](https://en.wikipedia.org/wiki/Breadth-first_search) minimizes the number of hops.  
- [Djikstra](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) enables the use of weights. In some settings, it makes sense to explore less of the graph by running a [bi-directional search](https://en.wikipedia.org/wiki/Bidirectional_search). It can can save about 50% of the search effort. If you implement it, check your termination conditions, it is trickier than it seems..!

## Specialized pathfinding needs
- What happens when your graph is allowed **negative weights**? This is a big concern for general graphs, solved by the [Bellman-Ford](https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm) algorithm.
- Computing **shortest distances between all points** can be needed, and is typically done by [Floyd-Warshall](https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm).

## Redundant shortest paths for telecom networks
In telecom networks the need for **diverse redundant routes** leads to computing [k-shortest paths](https://en.wikipedia.org/wiki/K_shortest_path_routing). If a fiber fails, we still want a "protection" over which the connection will switch to. The backup path should be either edge or node disjoint. Most often, [Yen's algorithm](https://en.wikipedia.org/wiki/Yen%27s_algorithm) or [Suurballe's](https://en.wikipedia.org/wiki/Suurballe%27s_algorithm) are used.

These works well when provisionning new incremental resources, but when designing doing global network optimization, you often **shortlists of decent K paths/pairs** to feed into a solver. To compute those shortlists, *brute-force* is usually a very good approach. Let's be honest, telecom physicall network are not *that big*!


### Graph representations for pathfinding
Choosing an adequate [graph representation](http://www.boost.org/doc/libs/1_61_0/libs/graph/doc/graph_theory_review.html) can already make you answer a lot of questions[^implementation]: is your graph undirected? *Will your graph need to be updated? How sparse is it? Do you want fast adjacency queries?*

The usual choices are representing your graph using [adjacency lists](https://en.wikipedia.org/wiki/Adjacency_list) and [adjacency matrices](https://en.wikipedia.org/wiki/Adjacency_matrix), best for sparse graphs[^degree-roads]. [Using sparse](http://docs.scipy.org/doc/scipy/reference/sparse.html#sparse-matrix-classes) adjacency matrices is not always straightforward.

In addition, if you setup a algorithmic pipeline, chances are you will need to spend some time converting your graphs from one format to the other: [graph data-structures are often custom-made for a particular application](http://www.boost.org/doc/libs/1_61_0/libs/graph/doc/index.html). You graph may need to be enriched to deal with application-specific concepts (think turn-by-turn navigation, various constraints...)

For the next article in the series, we'll see what happens when we think of the graph nodes as points on map. Meet [pathfinding for road networks](/blog/perspectives-on-pathfinding-algorithms-networks/)!


[^implementation]: Speaking of implementation, even writing a [priority queue](https://en.wikipedia.org/wiki/Priority_queue) [for Djikstra](http://ad-teaching.informatik.uni-freiburg.de/route-planning-ss2011/lecture-2.pdf) can make you review your computer science basics.

[^degree-roads]: Fact: The average degree of a [node in road networks](http://ad-teaching.informatik.uni-freiburg.de/route-planning-ss2012/lecture-1.pdf) is 2.5.
