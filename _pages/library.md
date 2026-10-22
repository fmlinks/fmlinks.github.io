---
layout: page
title: library
permalink: /library/
nav: true
nav_order: 4
---

<div class="projects library">
  {% assign entries = site.library | sort: "importance" %}
  {% if entries.size > 0 %}
    <div class="row row-cols-1 row-cols-md-3">
      {% for entry in entries %}
        {% include library_item.liquid item=entry %}
      {% endfor %}
    </div>
  {% endif %}
</div>
