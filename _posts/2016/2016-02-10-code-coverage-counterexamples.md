---
id: 3798
title: Code Coverage Counterexamples
date: 2016-02-10T21:25:50-05:00
author: k3jph
layout: post
permalink: /2016/02/10/code-coverage-counterexamples/
dsq_thread_id:
  - "4569179037"
image: /assets/images/8445190520_6830cb2c1e_k.jpg
categories:
  - Blog
tags:
  - CMNA
  - code coverage
  - computer science
  - information technology
  - phonics
  - software engineering
  - systems engineering
  - systems science
  - test-driven development
  - unit testing
---
Code coverage is not what it's cracked up to be.  As an experiment, I started using [Coveralls](http://coveralls.io) on two of my R projects, [`cmna`](/cmna) and [`phonics`](/software/phonics).  Both projects had unit testing with [testthat](https://github.com/hadley/testthat) included, both use [Travis](travis-ci.org/howardjp/) for continuous integration, and Coveralls supports R.  So this seemed like a logical experiment, and the results tell us something about code coverage.

First, `cmna` has miserable code coverage.  As of this writing, code coverage is only about 8 percent and I am surprised it is that high.  I basically gave up on writing unit tests while developing the package and the book to save time.  With the book back into editorial, I should add more unit tests, especially since the examples in the book are a good starting point.  However, the tests that are there are solid.

Second `phonics` has excellent code coverage.  When I first added Coveralls, I was at [97.05 percent](https://coveralls.io/builds/5012557), with complete coverage for most of the functions.  In fact, I have complete coverage for all of the functions written in R and those functions in C++ are less than perfect, though still 89 percent or better.  So what makes R and C++ different?  It's an implementation detail.  Those functions that are written in pure R code are those that are mostly implemented via regular expressions.

Unit testing is supposed to provide some basic tests to a function and determine if the function produces the correct, predetermined, output.  If not, something is wrong.  It's probably the function, though it could be the test.  You should check some primary cases and some edge cases.  

Code coverage estimates work by evaluating how thoroughly the code is checked.  It works on the presumption that every branch, basically if-then-else statements, follow all possible paths at least once.  It's important to realize, this does not mean all possible combinations within a functions are reached.  That's a combinatorial problem at scale.  But each branch must be reached.  

When the functions written in R use regular expressions, there is essentially no branching.  Take this implementation of the `statcan` function (with comments removed):

{% highlight r %}
statcan <- function(word, maxCodeLen = 4) {

    word <- gsub("[^[:alpha:]]*", "", word)
    word <- toupper(word)
    first <- substr(word, 1, 1)
    word <- substr(word, 2, nchar(word))

    word <- gsub("A|E|I|O|U|Y", "", word)
    word <- paste(first, word, sep = "")
    word <- gsub("([A-Z])\\1+", "\\1", word)
    word <--substr(word, 1, maxCodeLen)

    return(word)
}
{% endhighlight %}

Not a single branch.  Any input will hit everyone line.  The code coverage tool is very happy here.  But it's stupid.

This doesn't happen with the C++ based functions, where branching is normal and logic more interesting.  Consistently between the C++ functions, `soundex` and `metaphone`, the coverage holes were the same.  All of them contain, more or less, this code block:

{% highlight r %}
    if(x.length() == 0)
        return("");
    if(x.length() == 1)
        return(x);

    for(i = x.begin(); i != x.end() && !isalpha(*i); i++);
    if(i == x.end())
        return "";
{% endhighlight %}

I failed to test the `NULL` string, single letter strings, and strings with a single letter followed by nonalphabetical characters.  I added each of the three classes to the test suites.

Cases 1 and 2 passed with flying colors, increasing code coverage to [98.23 percent](https://coveralls.io/builds/5012991).  But the third, well, it didn't pass.  There's a bug where if any of the C++ functions get a string started by a letter and with trailing nonalphabetical characters, it crashes.  I would have never caught this without better testing.  And better testing was driven by code coverage checks.  

It's become a staple for programmers to ask how much code coverage is enough.  Here's a brief list of links:

* [What is a reasonable code coverage % for unit tests (and why)?](http://stackoverflow.com/questions/90002/what-is-a-reasonable-code-coverage-for-unit-tests-and-why)
* [Minimum Acceptable Code Coverage](http://www.bullseye.com/minimum.html)
* [Is 80% of code coverage any good?](http://www.sonarqube.org/is-80-of-code-coverage-any-good/)
* [How much Code Coverage is “enough”?](http://programmers.stackexchange.com/questions/1380/how-much-code-coverage-is-enough)
* [TestCoverage](http://martinfowler.com/bliki/TestCoverage.html), by Martin Fowler
* [Code coverage goal: 80% and no less!](http://googletesting.blogspot.com/2010/07/code-coverage-goal-80-and-no-less.html)
* [In pursuit of code quality: Don't be fooled by the coverage report](http://googletesting.blogspot.com/2010/07/code-coverage-goal-80-and-no-less.html)

There's a lot more out there, too.  Universally, the suggestion seems to be 80 percent is probably good enough.  But here, in a single small project, there's an example of a function with perfect code coverage which may or may not be tested correctly and another function with better than 90 percent coverage that is clearly insufficiently tested.

_Image by [Thomas Leuthard](https://www.flickr.com/photos/thomasleuthard/8445190520/)._
