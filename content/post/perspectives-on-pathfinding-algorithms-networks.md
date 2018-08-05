+++
date = "2016-10-16T10:00:00Z"
draft = false
title = "Perspectives on pathfinding algorithms: Networks"
author = "arthur"
tags = ["pathfinding", "road networks"]
image = "images/Rain_Steam_and_Speed_the_Great_Western_Railway_cropped.jpg"
whitelogo = true
artist = "William Turner"
+++
All computer scientists should know how to find their way. But not all researchers name this task the same.

<!--more-->

A critical step in problem solving is [finding how to think](#soon-meir-from-anodot) about the problem at hand. This means *finding the correct abstraction* --- and naming it right. I usually start my projects by mapping all the related concepts. As one of my university teachers[^1] explained:

> One way to succeed is to be the last to rediscover a powerful idea.
> The solution to your issue certainly hides in a PhD thesis somewhere.

[^1]: Nikos, of course.

**When do we go from `A` to `B`?** Many problems can be framed as pathfinding, and different frameworks of thought will be useful depending on the application.

In this blog posts series, our goal will be to *describe the problems* faced by those who study particular flavors of pathfinding, as well as insightful algorithms. We will start by reviewing "vanilla" graph pathfinding, just to recall the vocabulary. Then we'll describe richer problems: networks, maps, states, actions.

## Vanilla pathfinding
![simple undirected graph](/images/graph.gif)

The context here is a graph, whose nodes are linked by edges. Which algorithms can help us find how to go from node `A` to node `B`?

- [Breadth-first search (BFS)](https://en.wikipedia.org/wiki/Breadth-first_search) minimizes the number of hops.  
- [Djikstra](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) enables the use of weights.
- [Bi-directional search](https://en.wikipedia.org/wiki/Bidirectional_search) can save about 50% of the search effort. Check your termination conditions, it is trickier than it seems...

Beside returning a decent path, a critical performance measure of a pathfinding algorithm is minimizing the search space. It should explore as little of the graph as possible.

### Specialized needs
- What happens when your graph is allowed negative weights? This is a big concern for general graphs, solved by the [Bellman-Ford](https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm) algorithm.
- In telecom networks the need for diverse protection routes leads to computing [k-shortest paths](https://en.wikipedia.org/wiki/K_shortest_path_routing) --- ideally edge or node disjoint, often with [Yen's algorithm](https://en.wikipedia.org/wiki/Yen%27s_algorithm) or [Suurballe](#).
- Computing shortest distances between all points can be needed, and done by [Floyd-Warshall](https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm).


### "Low-level" questions
Choosing an adequate [graph representation](http://www.boost.org/doc/libs/1_61_0/libs/graph/doc/graph_theory_review.html) can already make you answer a lot of questions: is your graph undirected? *Will your graph need to be updated? How sparse is it? Do you want fast adjacency queries?* If you setup a algorithm pipeline, chances are you will need to spend some time converting your graphs from one format to the other: [graph data-structures are often custom-made for a particular application](http://www.boost.org/doc/libs/1_61_0/libs/graph/doc/index.html).

Your main options are [adjacency lists](https://en.wikipedia.org/wiki/Adjacency_list) and [adjacency matrices](https://en.wikipedia.org/wiki/Adjacency_matrix), best for sparse graphs[^degree-roads]. Wondering about [how to use sparse](http://docs.scipy.org/doc/scipy/reference/sparse.html#sparse-matrix-classes) adjacency matrices can make you go round in circles! Just implementing a [priority queue](https://en.wikipedia.org/wiki/Priority_queue) [for Djikstra](http://ad-teaching.informatik.uni-freiburg.de/route-planning-ss2011/lecture-2.pdf) can make you review your computer science basics!

[^degree-roads]: The average degree of a [node in road networks](http://ad-teaching.informatik.uni-freiburg.de/route-planning-ss2012/lecture-1.pdf) is 2.5.

## Road and traffic networks
Let's say we now think of the graph nodes as points on map. What do we get?

![small piece of a Tel Aviv map](/images/map.png)

**Maps** are among the most used apps on our phones. We always need to go somewhere! The number of pathfinding features available to us via those applications is extraordinary. They encompass many expertise domains:

- **Collaborative real-time traffic**, with traffic prediction, feedback loops and certainly load balancing for the biggest providers.
- **Schedule-based transportation networks**: for an introduction read this [description](https://research.googleblog.com/2016/03/an-update-on-fast-transit-routing-with.html) of [Transfer Patterns](http://ad.informatik.uni-freiburg.de/files/transferpatterns.pdf), or this comparaison [versus road networks](http://people.mpi-inf.mpg.de/~bast/papers/car_or_public_transport.pdf).
- **Time-dependent** pathfinding is also crucial in the context of traffic congestion, through mainly quick updates of precomputations or smarter search. Do we want *earliest arrival* or *minimum travel time*? 
- **Multi-modal transportation**: cars allow you unlimited travel, but few wants to walk long. This lead to [constrained search algorithms](http://www.boost.org/doc/libs/1_51_0/libs/graph/doc/r_c_shortest_paths.html) involving [labels](http://logistik.bwl.uni-mainz.de/Dateien/or_2004-01.pdf), and [optimizing multiple objectives](https://en.wikipedia.org/wiki/Multi-objective_optimization).
- **Detours** to points of interest. This might be the basis for **[ride sharing](http://lekv.de/pub/Mitfahr-Paper.pdf)** algorithms. We can also end up into [many-to-many pathfinding](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.94.2368&rep=rep1&type=pdf) or delivery problems: [traveling salesman](https://en.wikipedia.org/wiki/Travelling_salesman_problem), [multiple salesmen](https://tech.zalando.com/blog/defeating-the-travelling-salesman-problem-for-warehouse-logistics/)... 
- **Alternative itineraries** are [difficult](https://news.ycombinator.com/item?id=12190974): k-shortest-paths will give you thousands of tiny variations on the best route... You expect a *different route*, will only [specialized](http://algo2.iti.kit.edu/documents/Dissertation_Kobitzsch_Moritz.pdf) [algorithms](https://www.microsoft.com/en-us/research/wp-content/uploads/2010/01/alternativeSea2010.pdf) will yield.

[^2]: Look no further for a thorough [overview of modern route planning on road networks](https://arxiv.org/pdf/1504.05140.pdf).

> The next sections describe (selected) fruitful ideas allowing speed-ups for the single-source shortest path problem. *Please forgive omission of key details / inaccuracies; or better: tell me about them!*

The key goal here is to [preprocess reasonnably](http://www.shortestpaths.com/spq-survey.pdf) the network graph so that subsequent queries are sped up as much as possible. Many algorithms exist --- leading to enourmous gains over naive Djikstra --- with different preprocessing trade-offs:[^2]

{{< figure class="figure-400" src="/images/benchmark-road-networks-pathfinding-planning-algorithms.png">}}


### Road networks: the realm of informed search?
When we go somewhere we usually have an idea of the direction. We can thus do an informed search for the best path. The simplest algorithm to use this idea is [A*](https://en.wikipedia.org/wiki/A*_search_algorithm), an improvement over Djikstra that adds to the priority scores a lower-bound estimation of the remaining distance to the target.

It seems natural to think that using the natural geometric embeddding of the network will be useful. However, our goal is minimize travel time -- not distance! Finding good travel time bounds is difficult ---because there are highways---, and A* quickly loses interest. Today, *no state-of-the-art algorithms make explicit use of coordinates*.

#### Goal-directed techniques
A* fails in road networks because it uses unrealistic lower bounds. To counter this, we can precompute distances between all pairs within *well-chosen landmarks*[^landmarks], and embed them in our A* heuristic using the triangular inequality. This is the [ALT* algorithm](https://www.microsoft.com/en-us/research/publication/computing-the-shortest-path-a-search-meets-graph-theory/).

[^landmarks]: Even choosing landmarks at random works ok, but using heuristics leads to better results. 

> The distances between landmarks do not give us complete paths. As in many shortcut-based techniques we need to find smart ways to "unpack" the actual shortest path.

The [*Geometric containers*](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.331.3662&rep=rep1&type=pdf) approach has all edges hint to which nodes they lead via a shortest path. This information is summarized by lightweight shapes like bounding boxes. This enables aggressive pruning at the cost of all-pairs preprocessing (ouch!).

![bounding box used as a geometric container](/images/geometric-container-bounding-box.png) 

### Partitionning road networks
[*Arc flags*](https://gor.uni-paderborn.de/Members/AG06/LAUTHER.PDF) improved upon geometric containers by encoding similar information without caring about the geometry. The graph is partitionned into K regions. Then, we find for each edge all regions it can lead to via a shortest path. Usually this information is stored as a K-bit array: *arc flags*.

Computing all-pairs shortest paths is not necessary: it is enough to look only at paths to regions' boundaries. We could slice regions using a *fixed grid*, but for best performance the key is to [partition the graph](https://pdfs.semanticscholar.org/7709/50552b6c82c49416bc29b5d6353b3b788abc.pdf) using as small frontiers as possible --- a [hard problem](https://en.wikipedia.org/wiki/Graph_partition)! Subsequent paper introduced [improvements](http://www.dis.uniroma1.it/challenge9/papers/kohler.pdf) such as [hierachical regions](ftp://ftp.math.tu-berlin.de/pub/Preprints/combi/Report-042-2004.pdf).

At query time, we need to find out to which region the target belongs. Then (i) outside of the target region we can use the flags to prune all nodes that don't lead to the target region (ii) within the target region we use Djikstra.

#### Many ways to exploit graph partitionning
Landmarks and arc flags seem to be a good idea because we "feel" networks can be partitionned into regions by cutting only a few highways. In fact, this property is true for planar graphs; we know road networks are planar except for bridges and tunnels!

A number of *Separator Based* techniques try use partitions. The key is being able to cut well, while limiting the amount of preprocessing needed to understand shortest paths at the cut boundaries.

Those techniques can involve cutting with either edges or nodes, or hierachies of overlay graphs... See for instance [Customizable Route Planning](https://www.microsoft.com/en-us/research/publication/customizable-route-planning/), used by Microsoft, an approach that allows fast re-weighting.


### Road networks lend themselves to preprocessing
Road networks are more than just planar graphs. When we go somewhere far we know we should first get on the highway. Intuitively, we understand that their **hierarchical structure** should help pathfinding *a lot*.

One concept introduced to formalize and justify this idea is a graph's *[highway dimension](https://www.microsoft.com/en-us/research/publication/highway-dimension-and-provably-efficient-shortest-path-algorithms/)*, much similar to the [*doubling dimension*](http://www.cs.cmu.edu/~anupamg/adfocs/Gupta-lec3.pdf).

### Exploiting hierarchy
#### Highways *reach* far
We can fasten searches by pruning residential street far from either the source or the destination. This can be implemented by a bi-directional search that considers increasingly high-traffic road. Unfortunately doing this might not always yield correct results and requires tuning. Furthermore, it relies on inflexible labels: what about taking changing traffic conditions into account?

How can we quantify the fact some nodes are more important than others when looking for shortest paths? We expect those nodes have high *reach*: defined be *being in the middle of long shortests paths*. This idea led to the [*REACH*](http://www.siam.org/meetings/alenex04/abstacts/rgutman1.pdf) algorithm. When doing standard Djikstra searches, nodes with a *reach* too small to get to  the destination are pruned. Computing upper bounds for reach can be done effectively by identifying bounds for nodes of increasingly large reach (using search trees we don't have to expand far), and removing them from the graph before the next bounds are computed.

> As do many algorithms presented here, this approach combines well with other techniques such as A*, landmarks or shortcuts...

#### Contraction hierachies
We expect to use more important roads in the middle of a shortest path than near the source or target. In the previous section, we mentionned how this can used by a wrong but well-intentioned bi-directional search. _Let's improve upon it and discover[^highway-hierachies] [**Contraction Hierarchies**](http://algo2.iti.kit.edu/schultes/hwy/contract.pdf), the most efficient common[^ch-common-oss] routing algorithm._

[^ch-common-oss]: Contraction hierachies seems to be the only non-Astar/Djikstra approach used by well-known open-source routing projects. Notably, [OpenStreetMaps](https://www.openstreetmap.org)'s [OSRM](http://project-osrm.org/) uses [edge contractions](https://github.com/Project-OSRM/osrm-backend/blob/master/include/contractor/graph_contractor.hpp) to quicken [queries with CH](https://github.com/Project-OSRM/osrm-backend/blob/master/include/engine/routing_algorithms/routing_base.hpp). MoNav and Grasshoper also use CH, while [RoutingKit](https://github.com/RoutingKit/RoutingKit) implemented [Customizable contraction-hierachies](https://arxiv.org/pdf/1402.0402v5.pdf)  for fast weight updates.

[^highway-hierachies]: For completeness, I'll mention the *Highway Hierachies* approach, introduced a few years earlier. The concept is close to CH but overall more complicated and not as performance.

This measure of each arc's importance could can be quantified by a *level*. Each bi-directional search should only try to consider increasing levels. The search from the source (resp. target) should explore the upward (resp downward) span of the shortest path. _How do we get levels that lead to a **correct** search?_

Let's describe what is a *contraction*. This operation removes a node while adding necessary[^ch-shortcuts] arcs -- *shortcuts* -- between its neigboors, so that shortest path distances are preserved. Intuitively, contractions leave a "higher-level" graph. *To visualize what a contraction does, look at this figure from Hannah Bast's [Efficient Route Planning course](http://ad-teaching.informatik.uni-freiburg.de/route-planning-ss2012/lecture-6.pdf). It helped me a lot!*

![graph contraction - contraction hierachies explanations](/images/contraction-hierachies-explanations.png)

[^ch-shortcuts]: Checking which shortcuts are needed can be done easily. for instance, for each in-neighboors we can do a Djikstra search and attempt to reach all out-neighboors without using the contracted node. Also, we don't need to be exact: unnecessary shortcuts don't affect correctness. Various tricks/heuristics can be used.

Given a node ordering[^ch-ordering] describing importance, we now contract all nodes starting by the less important ones. Each step forms new arcs/shortcuts of increasing levels. We stop when we have contracted all nodes. From now on, we compute our bi-directional level-following **shortest paths on the graph formed by all nodes and all shortcost at all levels**.

[^ch-ordering]: Actually any node ordering will work. Some orderings lead to better performance. It is better to create as few shortcuts as possible. We could have a priority queue sorting nodes by their *edge difference*: how many shortcuts their contraction would create minus their in-degree (to have fair-comparaisons). Keeping the edge difference always up to date for all nodes is not feasible, but after a first computation we can do it lazily before contractions. We should also [favor spatial diversity of contractions](http://ad-teaching.informatik.uni-freiburg.de/route-planning-ss2012/lecture-7.pdf)...


### "Bounded-hop" techniques
Landmarks understood a powerful idea: having a sense of orientation to "some" nodes is useful. Bounded-hop techniques use a-priori knowledge of intermediary nodes to limit the span of the search.

#### Transit node routing
To go far away, we tend to always use a small number of nodes: for instance city exits. [Transit Node Routing](http://people.mpi-inf.mpg.de/~dmatijev/papers/DIMACS06.pdf) [identifies](https://arxiv.org/pdf/1302.5611.pdf) such transit nodes and compute all-pair shortest distances between them. It then assigns to each node the subset of transit nodes (access nodes) that node uses for long shortest paths, along with its distance to them. It is possible to use as little as 5 transit nodes on average. For directed graphs we can have access and exit nodes.

When source and destination nodes are deemed close by a *locality filter* (geographical distance can do!), a standard shortest path search is used (like for arc flags). When they are deemed far-away, we can find the distance between them by quickly checking possible combinations of source and destination access nodes.

#### Hub labeling
We could go further with a [labeling algorithm](http://link.springer.com/chapter/10.1007%2F3-540-46784-X_5#page-1), [Hub Labeling](http://www.cs.tau.ac.il/~zwick/papers/labels-full.ps): rather than storing each node's local transit nodes (its local hub), we could store all transit nodes[^HL-transit-node] at different scales (its hubs) -- up to big continental hubs! -- along with the distance to them.

[^HL-transit-node]: For directed graphs we have access and exit labels. 

By doing this, we are sure those sets of nodes (aka node *labels*) obey the cover property: *any two nodes have hubs in common in their labels*. From there, finding the distance from the source to the destination (plus one hub used) can be found by checking *which hub's usage* leads to the shortest path. It is very fast as it basically only involves iterating through two label arrays!

*How should be find those hubs?* A fairly good candidate is be the set of nodes explore by a Contraction Hierachy search: it makes sense and the cover property comes free. CH are a key ingredient in many advanced algorithms.

[Hub labeling](https://www.microsoft.com/en-us/research/publication/a-hub-based-labeling-algorithm-for-shortest-paths-on-road-networks/) can be [improved](http://i11www.iti.uni-karlsruhe.de/extra/publications/adgw-hhlsp-12.pdf) or adapted: many nodes will share the same sequence of large-scale hubs, and it is possible to [compress this information](https://www.microsoft.com/en-us/research/wp-content/uploads/2014/07/complexTR-rev2.pdf).

### Graph models for road networks are not always what you would expect
A road network links "nodes" together via road segments you travel on at some expected speed. No surprise: using directed edges will let you model *roads* better. You might think it is a good idea to compute distances using [great circles](https://en.wikipedia.org/wiki/Great_circle) -- but you don't really need it.

But wait a second, what about getting those turn-by-turn instructions? Well, even before that, how do you model turning restriction? Traffic lights delays? What about your reluctance to turn left, [like UPS trucks](https://priceonomics.com/why-ups-trucks-dont-turn-left/), or slowdowns from sharp turns?

Shortest path algorithms are all about visiting nodes, but none allows repeated visits, just because we come from an other direction. Navigating around a block to handle a turn restriction seems impossible to handle! Or rather, we should look at `(road, turn)` couples.

This leads to an alternate representation for our network graph. One where nodes are turns from one intersection to the other, and where edges represente... roads. This is called the *edge-expanded model*. The graph gets a couple of times bigger, but we gain a lot of flexibility.

[MapBox](https://www.mapbox.com/blog/smart-directions-with-osrm-graph-model/) went into some details about this question, take a look! You can also read [details on OSRM's pre-processing flow here](https://github.com/Project-OSRM/osrm-backend/wiki/Processing-Flow). It contains an explanation on how their turn-by-turn guidance and turn-restriction are enabled.

### Closing thoughts for network pathfinding
- The amount of work that went into those algorithms is **astounding**.
- Check [PHAST](https://www.microsoft.com/en-us/research/publication/phast-hardware-accelerated-shortest-path-trees/) for Djikstra with better performance/locality.
- For extra information, [openTripPlanner](http://www.opentripplanner.org/) project has a [great bibliography](https://github.com/opentripplanner/OpenTripPlanner/blob/master/docs/Bibliography.md). Reviews of the field are [plentiful](http://www.shortestpaths.com/spq-survey.pdf).
- With all those algorithms, the time to compute a static path is *two order of magnitudes* lower than the time to retrieve it from a server or plot it..! It might seem overkill, but recall how many extra features we ask of routing engines...!


*Stay tuned for part 2...*