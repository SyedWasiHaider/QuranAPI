var express = require('express');
var app = express();
verses = require('./routes/quran');

app.get('/quran', verses.findAll);
app.get('/quran/byIndex/:id', verses.findByIndex);
app.get('/quran/bySurahVerse/:surah/:verse', verses.findBySurahVerse)
app.get('/quran/byRange/:from/:to', verses.findByIndexRange);
app.get('/quran/bySearchTerm/:term', verses.findBySearchTerm)


app.listen(3000);
console.log('Listening on port 3000...'); 