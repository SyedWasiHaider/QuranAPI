QuranAPI
============

A first (and probably poor) attempt at a REST API for the Holy Quran. Open to suggestions and changes.

Requirements
=================

-nodejs
-mongodb service running

Usage
===================
Run the command from the command line:

1- nodejs server.js
2- Go to your browser and type localhost:3000
3- Type in any of the paths from the API below


API
===============================

Get the verse by surah and verse number:

/Quran/bySurahVerse/SurahNumber/VerseNumber   

Get the verse by index (0 being the first verse and 6236 being the last)

/Quran/byIndex/IndexNumber

Get the verse in the range of two indices

/Quran/byRange/From/To

Get all verses that match the search term

/Quran/bySearchTerm/term


TODO
=================================

-Add Arabic (of course!!)
-Add more languages
-Conform to proper REST API standards
-Add more functions


Acknowledgements
===============================

Thanks to Tanzil.info for the translation database

