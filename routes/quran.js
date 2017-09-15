var mongo = require('mongodb');
var fs = require('fs')
var _ = require('underscore');
var mongoose = require('mongoose');

/*********SOME CONSTANTS****************/
var englishCollectionName = "englishCollectionName";
var quranArabicCollectionName = "quranArabicCollectionName";
var maxVerses = 6236
var dbName = "quran-database";
var uri = `mongodb://admin:admin@ds137054.mlab.com:37054/quran-database`;
mongoose.connect(uri);

mongoose.connection.db.on('error', console.error.bind(console, 'connection error:'));

mongoose.connection.db.once('open', function(err, database) {
	
	if(!err) {
		console.log("Connected to database");
		mongoose.connection.db.collection(englishCollectionName, {strict:true}, function(err, collection) {
			if (err) {
				console.log("The 'verses' collection doesn't exist. Creating now...");
				populateTranslation();
			}
		});

		mongoose.connection.db.collection(quranArabicCollectionName, {strict:true}, function(err, collection) {
			if (err) {
				console.log("The 'quran Arabic' collection doesn't exist. Creating now...");
				populateQuran();
			}
		});

	}
  });

/*********************THIS PROVIDES THE MAIN FUNCTIONALITY OF THE API*********************/

function getCollectionNameFromLanguage(language){
	var collectionToUse = quranArabicCollectionName;
	if (language){
		
		if (language.toUpperCase() === "ENGLISH"){
			collectionToUse = englishCollectionName;
		}
	}
	return collectionToUse;
} 


exports.findAll = function(req, res) {
	var collectionToUse = getCollectionNameFromLanguage(req.params.language); 
	mongoose.connection.db.collection(collectionToUse, function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
}; 

exports.findByIndex = function(req, res) {
	var collectionToUse = getCollectionNameFromLanguage(req.params.language); 
	mongoose.connection.db.collection(collectionToUse, function(err, collection) {
		var _index =  parseInt(req.params.id);
		console.log(_index);
		collection.find({index: _index}).toArray(function(err, items) {
			res.send(items);
		});
	});
}; 


exports.findBySurah = function (req, res){
	var collectionToUse = getCollectionNameFromLanguage(req.params.language); 
	mongoose.connection.db.collection(collectionToUse, function(err, collection) {
		var _surah = parseInt(req.params.surah);
		collection.find({surah: _surah}).toArray(function(err, items) {
			res.send(items);
		});
	});
}


exports.findBySurahVerse = function (req, res){
	var collectionToUse = getCollectionNameFromLanguage(req.params.language); 
	mongoose.connection.db.collection(collectionToUse, function(err, collection) {
		var _verse =  parseInt(req.params.verse);
		var _surah = parseInt(req.params.surah);
		console.log(_surah + ":" + _verse);
		collection.find({surah: _surah, verse:_verse}).toArray(function(err, items) {
			res.send(items);
		});
	});
}


exports.findByIndexRange = function(req, res) {
	var collectionToUse = getCollectionNameFromLanguage(req.params.language); 
	mongoose.connection.db.collection(collectionToUse, function(err, collection) {
		var _indexFrom =  parseInt(req.params.from);
		var _indexTo = parseInt(req.params.to);
		collection.find({index: {$gte: _indexFrom, $lte: _indexTo}}).toArray(function(err, items) {
			res.send(items);
		});
	});
}; 


exports.findBySearchTerm = function(req, res) {
	var collectionToUse = getCollectionNameFromLanguage(req.params.language); 
	mongoose.connection.db.collection(collectionToUse, function(err, collection) {
		var _text = req.params.term;
		console.log(_text);
		collection.find({text : {$regex : ".*" + _text+ ".*", $options: "i"}}).toArray(function(err, items) {
			res.send(items);
		});
	});
}; 

exports.findRandomVerse = function (req, res){
	var collectionToUse = getCollectionNameFromLanguage(req.params.language); 
	mongoose.connection.db.collection(collectionToUse, function(err, collection) {
		var _index =  Math.floor((Math.random() * maxVerses));
		console.log("index calculated was"+_index);
		collection.find({index: _index}).toArray(function(err, items) {
			res.send(items);
		});
	});
}





//-------------THIS SHOULD ONLY BE REALLY CALLED ONCE --------/
//TODO: In fact it might better to just take it out once the database has been populated.

var populateTranslation = function() {

	console.log("populateTranslation")

	fs.readFile('./assets/en.ahmedali.txt', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}

		var lines = data.split('\n');

		mongoose.connection.db.collection(englishCollectionName, function(err, collection) {
			_.each(lines, function(row, idx){

				var members = row.split('|');
				var _surah = parseInt(members[0]);
				var _verse = parseInt(members[1]);
				var _text = members[2];
				console.log(members);
				collection.insert({index: idx, surah: _surah, verse : _verse, text : _text}, {safe:true}, function(err, result) {});
			})
		});
	});
}; 


var populateQuran = function() {

	console.log("populateQuran")

	fs.readFile('./assets/quran-simple-enhanced.txt', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}

		var lines = data.split('\n');

		mongoose.connection.db.collection(quranArabicCollectionName, function(err, collection) {
			_.each(lines, function(row, idx){
				if (idx < maxVerses){
					var members = row.split('|');
					var _surah = parseInt(members[0]);
					var _verse = parseInt(members[1]);
					var _text = members[2];
					console.log(members);
					collection.insert({index: idx, surah: _surah, verse : _verse, text : _text}, {safe:true}, function(err, result) {});
				}
			})
		});
	});



}; 