+++
date = "2021-08-23T09:00:00Z"
draft = false
title = "Creating a Super-Ellipsis table"
author = "arthur"
tags = ["maker","geometry"]
image = "images/super-ellipsis/table-super-ellipsis-cropped.jpg"
artist = "Photo by Arthur Flam"
whitelogo = true
mathjax = true
+++

Furniture designers can be very creative when it comes to table legs. But for their tops there often isn't anything beyond circles, rectangles or ellipsis... So I made my custom super-ellipsis table!

<!--more-->

## Finding the right shape
After we finished a bookshelf with Yoni from [matab design](https://www.matab.co.il/), we mentionned that we were now looking for a dining table. He offered to design one with us.

We started thinking about the table's shape. The dimensions we had in mind were 1.6 x 1.1 meters. We wanted something _curvy_. I didn't like the solution Yoni usually goes for (below: a rectangle joining two half-disks) because it does not have a constant curvature. Ellipsis were also out, because sitting across their major axis is not comfortable. They are too "pointy".

{{< figure width=350 src="/images/super-ellipsis/classical-shape-table.jpg" caption="See the curvature discontinuity?" link="https://www.instagram.com/p/CQOGHR4nnEu/">}}

I remembered the "super-ellipsis", a family of curves which work well as compromises between rectangles and circles. The name sounds exotic, but you've certainly seen this shape before: [iOS icons are a type of super-ellipsis called "squircles"](https://www.johndcook.com/blog/2018/02/13/squircle-curvature/).

{{< figure width=700 src="/images/super-ellipsis/superellipsis-wiki.jpg" caption="This is it 🎯." link="https://en.m.wikipedia.org/wiki/Superellipse">}}

In Stockholm, super-ellispis have been used by Piet Hein to design the [Sergels torg](https://en.wikipedia.org/wiki/Sergels_torg) roundabout (and turns out he and others fellow designers already created a [line of tables](https://fritzhansen.com/en/super-elliptical)..!).


{{< figure width=700 src="/images/super-ellipsis/gettyimages-sergels-torg.jpg" caption="Sergel Torg - Photo by [JONATHAN NACKSTRAND](http://www.nackstrand.com/)/AFP [via Getty Images](https://www.gettyimages.ch/detail/nachrichtenfoto/an-aerial-view-picture-shows-sergels-torg-square-in-nachrichtenfoto/1208284309?language=fr)">}}


I called Yoni and asked him if had heard of those shapes. I told me he did not, but that if I could send him the right computer file he could [CNC machine](https://en.wikipedia.org/wiki/Numerical_control) the slab of marble any way I wanted. Game on!

## How to CNC-machine a super-ellipsis
### Writing DXF files
> :point_right: The code for this project is [available here](https://gist.github.com/arthur-flam/3704a2d91864a30562d09da8bfe593e0)

All [Computer Assisted Design](https://en.wikipedia.org/wiki/Computer-aided_design) software can exchange drawings using a format called [DXF](https://fr.wikipedia.org/wiki/Drawing_eXchange_Format). It's text based with all the kind of features you'd expect: drawing primitives (lines, splines, text...) with tons of attributes, layers... There is even a python package to read/write DXF files, [ezdxf](https://ezdxf.readthedocs.io/en/stable/index.html).


Getting started was really easy:

```python
# pip install ezdxf[draw] 
import ezdxf

# https://ezdxf.mozman.at/docs/usage_for_beginners.html#create-a-new-dxf-file
doc = ezdxf.new()
doc.saveas('my-shapes.dxf')
```

It's simple to start drawing shapes like lines or splines:

```python
msp = doc.modelspace()
msp.add_line((0, 0), (1, 0))

# https://ezdxf.readthedocs.io/en/stable/tutorials/spline.html
fit_points = [(0, 0, 0), (750, 500, 0), (1750, 500, 0), (2250, 1250, 0)]
spline = msp.add_spline(fit_points)
```

> For some reason sketchUp wouldn't open our DXF files, so we didn't get accurate renders of the complete table... Anyway SolidWorks didn't mind, so when it came time to cut the shape, everything went smoothly.

From there, all that was left was interpolating our super-ellipsis with smooth splines. While the super-ellipsis cartesian equation is not super easy to use,

<div>$$
\left|\frac{x}{a}\right|^p\! + \left|\frac{y}{b}\right|^p\! = 1
$$</div>


Thanksfully the parametric version is well-known:

<div>$$
\DeclareMathOperator{\sign}{sign}
\left.
\begin{align}
 x\left(t\right) &= {|\cos t|}^{\frac{2}{p}} \cdot a \sign(\cos t) \\
 y\left(t\right) &= {|\sin t|}^{\frac{2}{p}} \cdot b \sign(\sin t)
\end{align}
\right\} \qquad 0 \le t \le 2\pi
$$</div>


I wrote some code to sample points. With minor changes:

```python
from ezdxf.math import Vec3

@dataclass
class SuperEllipsis():
  p: float
  a: float
  b: float

  def sample_t(self, t: float) -> Vec3:
    cos_t = np.cos(t)
    sin_t = np.sin(t)
    x = self.a * np.abs(cos_t)**(2/self.p) * np.sign(cos_t)
    y = self.b * np.abs(sin_t)**(2/self.p) * np.sign(sin_t)
    return Vec3(x, y, 0)

  def sample(self, n: int) -> Iterator[Vec3]:
    for i in range(n):
      t = i * 2*np.pi / n
      yield self.sample_t(t)
    yield self.sample_t(0) # close the loop
```

Now that we can sample points, we only need to stitch them together into a spline.

```python
fit_points = list(ellipsis.sample(n))
spline = ezdxf.math.fit_points_to_cubic_bezier(fit_points)
spline = msp.add_spline(fit_points)
```

**Et voilà!** We can view the results in [libreCAD](https://librecad.org/) - in red a standard ellipsis, in white our superellipsis with $p=2.5$, 1024 samples, using the correct $a$ and $b$ corresponding to the table's size:

{{< figure width=800 src="/images/super-ellipsis/librecad-superellipsis-shape-vs-ellipsis.png" caption="Super-ellipsis (white) and Ellipse (red) in libreCAD.">}}

> We could have checked we're approximating the curve closely enough, but it looked overkill... The real issue we could have faced is that some tools don't support splines, and require using circular arcs instead... Dealing with this would have required just a little more work.

## Final result
While we decided the table legs we wanted, the machinist confirmed it would all work out. Here are some pictures of the tools used:


{{< figure width=500 src="/images/super-ellipsis/cutting-stone.jpg" caption="Close-up: [Water jet cutter](https://en.wikipedia.org/wiki/Water_jet_cutter).">}}

{{< figure width=500 src="/images/super-ellipsis/cnc-machine.jpg" caption="It's unlikely you can do it at home... (our job was done on an identical machine)">}}

After a couple of weeks the table arrived!

![Super-ellipsis table](/images/super-ellipsis/table-super-ellipsis.jpg)

> It was really nice working with Yoni from Matab Design (on 3 projects already!). Check out their [instagram](https://www.instagram.com/matabdesign/) if you liked the article!
