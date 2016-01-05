# Project Overview

About:
=====

Tests were added in jasmine/spec/feedreader.js to test for functionality of the website.The tests are included:

Tests:
======

RSS Feeds:
==========
Test feeds are defined
Test feed URLs are defined and contain content
Test feed names are defined and contain content

Menu:
=====
Test is hidden on page load
Test menu icon appears on click

Initial Entries:
================
Test at least one entry displays on load after async call

New Feed Selection:
===================
Test RSS entry changes on menu select

How to Run:
==========
Download or clone the repository and open it in your browser locally. All needed Jasmine libraries are included, and you will see a section below the page showing the test results.

To add or edit the feed sources, open js/app.js and change the allFeeds object. Ensure that you have at least 2 feeds, or else the 'New Feed Selection' test will fail.

Sources:
========
http://jasmine.github.io/2.0/introduction.html
