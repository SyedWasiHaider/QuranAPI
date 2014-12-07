QuranAPI
============

My first  attempt at a REST API for the Holy Quran. I know that a Quran API already exists but I wished to learn some REST API stuff and also just make a Quran API for my own future projects. Open to suggestions and changes.

Requirements
=================

-nodejs

-mongodb service running

Usage
===================
Run the command from the command line:

1- nodejs server.js

2- Go to your browser and type localhost:3000

3- Type in any of the paths from the API below after the url

So for example to get the surah 3, verse 2 you would do:

localhost:3000/Quran/bySurahVerse/3/2

OR (for English)

localhost:3000/Quran/bySurahVerse/English/3/2

API
===============================

Note that the language parameter is optional and set to Arabic by default. Currently English is the only
other language available.

Get all verses

/quran/all/language

Get the verses for the given surah

/Quran/bySurah/language/SurahNumber 

Get the verse by surah and verse number:

/Quran/bySurahVerse/language/SurahNumber/VerseNumber   

Get the verse by index (0 being the first verse and 6236 being the last)

/Quran/byIndex/language/IndexNumber

Get the verse in the range of two indices

/Quran/byRange/language/From/To

Get all verses that match the search term

/Quran/bySearchTerm/language/term

Get a random verse

/Quran/randomVerse/language


TODO
=================================

-Add more languages

-Conform to proper REST API standards

-Add more functions

KNOWN ISSUES
===================================

-Bismillah is not present in the translation
(which I assume was intentionally by the authors
who made the original .txt file)


Acknowledgements
===============================

Thanks to Tanzil.info for the English translation database

