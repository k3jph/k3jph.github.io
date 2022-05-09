---
id: 6681
title: Using Rust on the Open Science Grid
date: 2019-01-03T07:52:12-05:00
author: k3jph
layout: post
permalink: /2019/01/03/using-rust-on-the-open-science-grid/
image: /assets/images/using-rust-on-the-open-science-grid.jpg
categories:
  - Blog
tags:
  - HPC
  - mathematics
  - Open Science Grid
  - Rust
---
I will admit that the [Rust programming
language](https://www.rust-lang.org/) fascinates me. It's got all
the things I want in a programming language, that I normally get
from C, and also gives me some measure of protection against really
screwing up. Not that I do that much…or even have a use for, anymore.
I mean, my last round of "systems-level programming" was in C++ for
the Phonics package. But hey, I can dream, right?

But I also do not know Rust, beyond some basics, since I don't do
any systems programming. But I wanted to learn a bit more decided
to really have some fun. I ported the [Open Science Grid's R
tutorial](https://support.opensciencegrid.org/support/solutions/articles/5000674219-calcuating-pi-using-r)
to Rust, which I will then submit to the [Open Science
Grid](https://opensciencegrid.org/) (OSG) for parallel computation.
The program uses the shotgun method to estimate the value of
[latex]\pi[/latex], so this gives us a fun little project of no
value.

First, I am using OSG Connect for access to the OSG. Whatever
resource you are using must have Rust installed and OSG Connect
does not. Fortunately, we have a large quota and the standard
[installation instructions for
Rust](https://www.rust-lang.org/tools/install) work just fine, if
taking a few minutes.

{% highlight shell %}
curl https://sh.rustup.rs -sSf | sh
{% endhighlight %}

Once I installed Rust, I used Cargo to create a new project.

{% highlight shell %}
cargo new mcpi --binary
{% endhighlight %}

Then I did a straight port of the R Monte Carlo code, and got 
this for `main.rs`:

{% highlight rust %}
extern crate rand;

use rand::Rng;

fn montecarlo_pi(trials: u32) -> f64 {
    let mut count: u32 = 0;
    let mut rng = rand::thread_rng();

    for _i in 1..trials {
        let x: f64 = rng.gen::<f64>();
        let y: f64 = rng.gen::<f64>();
        let p: f64 = x * x + y * y;

        if p < 1.0 {
            count += 1;
        }
    }

    let pi_est: f64 = (count as f64) * 4.0 / (trials as f64);
    return pi_est;
}

fn main() {
    let pi_est: f64 = montecarlo_pi(1000000);

    println!("[1] {pi}", pi = pi_est);
}
{% endhighlight %}

Now, this Rust code is probably overspecified. But I was in a mood
and wanted to make sure I didn't really mess this up. This was good,
since the original version also kept calculating the final value
as 3, since it was being converted to an integer. So this was the
compromise with Rust. Another tick in this program is that the
result is prefaced by "[1]" to match the R output. The R demo uses
`awk` to average all the outputs and I didn't want to rewrite that
code.

Next up is the Condor submission file:

{% highlight shell %}
universe = vanilla
log = log/mcpi.log.$(Cluster).$(Process)
error = log/mcpi.err.$(Cluster).$(Process)
output = log/mcpi.out.$(Cluster).$(Process)

executable = mcpi/target/release/mcpi

requirements = OSGVO_OS_STRING == "RHEL 7" && Arch == "X86_64"
queue 100
{% endhighlight %}

As you can see, this code just calls the executable right out of
the Cargo build space and runs it 100 times. All over the world.
Or perhaps in my backyard. I don't know and I don't even have to
care! Using the averager function from the R tutorial, this is what
we get:

{% highlight shell %}
[howardjp@login03 tutorial-rust]$ grep "[1]" log/mcpi.out.* | 
> awk '{sum += $2} END { print "Average =", sum/NR}'
Average = 3.1417
[howardjp@login03 tutorial-rust]$
{% endhighlight %}

All-in-all, this is a pretty trivial exercise. But that's ultimately
the point of this post. Kicking Rust into action on the OSG should
not be a big deal. And in practice, it is not. Given Rust's increased
protections against programmer error (over C), it would not be
unwise to see more mathematical and scientific codes moving over.

_This research was done using resources provided by the Open Science
Grid, which is supported by the National Science Foundation award
1148698, and the U.S. Department of Energy’s Office of Science._
