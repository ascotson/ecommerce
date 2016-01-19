

var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var cors = require('cors');
var ObjectId = require('mongodb').ObjectId;

var app = express();
var db = mongojs('ecommerce', ['products']);

app.use(bodyParser.json());

app.post('/api/products', function(req, res) {
  var dataToInsert = req.body;
  db.products.insert(dataToInsert, function(err, result) {
    if(err) {
      res.status(500).send('Failed to add new record');
    }
    res.send(result);
  });
    console.log('POST success');
});

app.get('/api/products', function(req, res) {
  db.products.find({}, function(err, result) {
    if(err) {
      res.status(500).send('Failed to retrieve record');
    }
      res.send(result);
  });
    console.log('GET success');
});

app.get('/api/products/:id', function(req, res) {
  var idToFind = ObjectId(req.params.id);
  db.products.find({_id:idToFind}, function(err, result){
    if(err) {
      res.status(500).send('Failed to retrieve record');
    }
    res.send(result);
  });
  console.log('GET success');
});

app.put('/api/products/:id', function(req, res) {
  var idToModify = ObjectId(req.params.id);
  var updateObject = {
    query: {_id: idToModify},
    update: { $set: req.body},
    new: false
  };

  db.products.findAndModify(updateObject, function(err, result) {
    if(err) {
      res.status(500).send('Failed to modify record');
    }
    res.send('Data modification successful');
  });
  console.log('PUT success');
});

app.delete('/api/products/:id', function(req, res) {
  var idToDelete = ObjectId(req.params.id);
  db.products.remove({_id:idToDelete}, function(err, result) {
    if(err) {
      res.status(500).send('Failed to delete record');
    }
    res.send('Record deleted successfully');
  });
  console.log('DELETE success');
});

var port = 3000;
app.listen(port, function() {
  console.log('Listening on Port ' + port);
});
