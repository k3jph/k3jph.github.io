---
id: 660
title: A RESTful interface for MD5 hashes
date: 2011-07-21T22:56:01-04:00
author: k3jph
layout: post
permalink: /2011/07/21/a-restful-interface-for-md5-hashes/
dsq_thread_id:
  - "2268134979"
tumblr_howardjp_permalink:
  - http://howardjp.tumblr.com/post/7902524663/a-restful-interface-for-md5-hashes
tumblr_howardjp_id:
  - "7902524663"
categories:
  - Blog
tags:
  - computer science
  - information technology
  - rails
  - Ruby
  - software
  - software engineering
  - systems science
  - web
  - webservices
---
Or not quite.  I had a need to generate MD5 hashes inside a Google Spreadsheet, but Google does not include an MD5 function (and neither does OpenOffice.org).  Google does, however, support a function to get XML data and process it with Xpath.  So assuming someone had created an MD5 generator on the web that was accessible via XML, I set to work.  It turns out, nobody has ever needed this before.  But that's okay, I am a Real Programmer.

I installed Ruby on Rails and created a very simple controller for hashes:

{% highlight ruby %}
class HashController &lt; ApplicationController
    def md5
    result = { }
    result['data'] = params[:id]
    result['md5'] = Digest::MD5.hexdigest(params[:id])

    respond_to do |format|
        format.json { render :json => result }
        format.xml { render :xml => result }
    end
end
{% endhighlight %}

Which is now accessible via [](http://api.jameshoward.us/hash/md5/foo.json)[http://api.jameshoward.us/hash/md5/foo.json](http://api.jameshoward.us/hash/md5/foo.json) or [foo.xml](http://api.jameshoward.us/hash/md5/foo.xml) as appropriate. In addition, there is an sha1 method available. It's all running on a minimal instance with [Heroku](http://www.heroku.com), so please use it to your heart's content.
