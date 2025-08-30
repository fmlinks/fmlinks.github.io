---
layout: page
permalink: /publications/
title: publications
description: Publications by categories in reversed chronological order.
nav: true
nav_order: 3
tabs: true
categories: [journals, conferences, preprints, patents, challenges]
---

<!-- _pages/publications.md -->

<div class="publications">

<!-- Bibsearch Feature -->
{% include bib_search.liquid %}


{% bibliography --query @* %}



</div>

