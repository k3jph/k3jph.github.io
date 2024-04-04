---
id: 451
title: Recoding County-Level Data
date: 2012-01-04T02:41:00-05:00
author: k3jph
layout: post
permalink: /2012/01/04/recoding-county-level-data/
tumblr_jhresearchlog_permalink:
  - http://jhresearchlog.tumblr.com/post/30315034259/recoding-county-level-data
tumblr_jhresearchlog_id:
  - "30315034259"
dsq_thread_id:
  - "2262924197"
ampforwp_custom_content_editor_checkbox:
  - ""
instant_articles_submission_id:
  - "1860237564247440"
categories:
  - Blog
tags:
  - counties
  - data
  - data science
  - environmental policy
  - environmental studies
  - FEMA
  - flood mitigation
  - flood studies
  - mathematics
  - scientific computing
---
This evening I finished recoding a list of grants from [FEMA](http://www.fema.gov) for [Flood Mitigation Assistance](http://www.fema.gov/government/grant/fma/index.shtm). This dataset contains 2108 entries, and contains the following columns, among others:

| State    	| County    	| Subgrantee                                       	|
|----------	|-----------	|--------------------------------------------------	|
| Maryland 	| Garrett   	| Oakland, Town Of                                 	|
| Maryland 	|           	| Town of Bel Air                                  	|
| Maryland 	|           	| Howard County Department of Fire Rescue Services 	|
| Maryland 	| Worcester 	| Ocean City, Town Of                              	|

Because many of the subgrantee fields are filled even when the county is not and most of the subgrantees are local government agencies, I tried to recode the counties according to FIPS 6-4, "Counties and Equivalent Entities of the United States, Its Possessions, and Associated Areas." Local governments were recoded to their parent counties, as appropriate.

Going through this process by hand, I have some observations on the first-order divisions of states:

1.  There are five townships in Ohio with the name Scioto.
2.  There are two counties named Jeff Davis, one named Jefferson Davis, and a parish in Louisiana named Jefferson Davis.
3.  There are seven counties in the United States named Howard County.
4.  A remarkable number of states have cities and counties with the same name, but which are not near each other.
