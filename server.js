var express = require('express');
var app = express();
verses = require('./routes/quran');


//This sets up the routing for the Arabic.
app.get('/quran/all/:language?', verses.findAll);
app.get('/quran/byIndex/:language?/:id', verses.findByIndex);
app.get('/quran/bySurah/:language?/:surah', verses.findBySurah)
app.get('/quran/bySurahVerse/:language?/:surah/:verse', verses.findBySurahVerse)
app.get('/quran/byRange/:language?/:from/:to', verses.findByIndexRange);
app.get('/quran/bySearchTerm/:language?/:term', verses.findBySearchTerm);
app.get('/quran/randomVerse/:language?', verses.findRandomVerse);

app.listen(3000);
console.log('Listening on port 3000...'); 