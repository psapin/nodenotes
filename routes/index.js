var express = require('express');
var router = express.Router();

/* GET home page. 
router.get('/', function(req, res, next) {
    
    //res.render('index', { title: 'Express' });
});*/

/* GET List of notes. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('notecollection');
    collection.find({},{},function(e,docs){
        res.render('notelist', {
            "notelist" : docs
        });
    });
});

/* GET New Note page. */
router.get('/newnote', function(req, res) {
    res.render('newnote', { title: 'Add/Edit Note' });
});

/* POST to Add Note */
router.post('/addnote', function(req, res) {
    // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "name" attributes
    var noteName = req.body.notename;
    var noteTitle = req.body.notetitle;
    var noteText = req.body.notetext;
    // Set our collection
    var collection = db.get('notecollection');
    collection.update({ notename: noteName }, {"notename" : noteName, "notetitle" : noteTitle, "text" : noteText}, {upsert : true}, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("/");
        }
    });
    
});

/* POST to Update Note */
router.post('/updatenote', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var noteName = req.body.notename;
    var noteTitle = req.body.notetitle;
    var noteText = req.body.notetext;

    // Set our collection
    var collection = db.get('notecollection');

    collection.update({ notename: noteName }, {"notename" : noteName, "notetitle" : noteTitle, "text" : noteText}, {upsert : true}, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("/note/"+noteName+"/edit");
        }
    });
    
});

router.get('/note/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('notecollection');
    collection.findOne({ notename: req.params.id }).on('success', function (doc) {
        res.render('note', {
            "title" : doc.notetitle,
            "note" : doc
        })
    });
  //res.render('note', {title: id});
});

router.get('/note/:id/edit', function(req, res) {
    var db = req.db;
    var collection = db.get('notecollection');
    collection.findOne({ notename: req.params.id }).on('success', function (doc) {
        res.render('editnote', {
            "title" : doc.notename,
            "note" : doc
        })
    });
  //res.render('note', {title: id});
});

module.exports = router;
