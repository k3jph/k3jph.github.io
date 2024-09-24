---
layout: page
title: Search
description: Search jameshoward.us
---

<style type="text/css">
.main {
  width: 100%;
}
#search-input {
  width: 100%;
  font-size: 1.2em;
  padding: .5em;
}
.search-results b {
  background-color: #f2daa6;
}
.search-preview {
  margin-bottom: 2em;
}

.single .main a, .single .main h2 {
  border-bottom: none;
}
</style>
<input type="search" id="search-input">
<div class="search-results">
<section>
<h3 class="toc-line"><a target="_blank"></a><span class="dots"></span><span class="page-num small"></span></h3>
<h5 class="search-date"></h5>
<div class="search-preview"></div>
</section>
</div>
<script src="https://cdn.jsdelivr.net/npm/fuse.js@6.6.2" defer></script>
<script src="/assets/js/search.js" defer></script>
