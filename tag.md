---
layout: page
title: Most Common Tags 
permalink: /tag
description: The topics on JamesHoward.us
sitemap:
  exclude:      yes
redirect_from:
  - /tags/
---

<div class="page">
   {% comment %} Creates an empty array {% endcomment %}
   {% assign tags = "" | split:"" %}

   {% comment %}Creates an array of tags names{% endcomment %}
   {% for t in site.tags %}
      {% assign tags = tags | push: t[0] %}
   {% endfor %}

   {% assign n = tags | size %}
   {% assign random_tags = tags | sample: n %}

   <div class="tag-cloud">
   {% for tag in random_tags %}
      {% capture tagslug %}{{ tag | slugify }}{% endcapture %}
      {% assign tagsize = site.tags[tag] | size %}
      {% assign minposts = n | divided_by: 4 %}
      {% if tagsize > 12 %}
         <span style="font-size: {{ tagsize | times: 1000 | divided_by: site.tags.size | plus: 60 }}%">
            <a href="#{{tagslug}}"><nobr>{{tag}}</nobr></a>  
         </span>
      {% endif %}
   {% endfor %}
   </div>

   <h1>All Posts by Tag</h1>

   {% assign sorted_tags = tags | sort_natural %}

   {% for tag in sorted_tags %}
      {% capture tagslug %}{{ tag | slugify }}{% endcapture %}
      <h2><a name="{{tagslug}}"></a>{{tag}}</h2>
      {% for post in site.tags[tag] %}
         <p><a href="{{ post.url | absolute_url }}">{{ post.title }}</a>
         <span class="post-date">{{ post.date | date_to_string }}</span></p>
      {% endfor %}
   {% endfor %}
   </div>
