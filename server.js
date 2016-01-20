

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var productCtrl = require('./controllers/productCtrl');

var app = express();
app.use(bodyParser.json());

var mongoUri = 'mongodb://localhost:27017/products';

mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
  console.log('Mongoose is connected');
});

app.post('/api/product', productCtrl.create);
app.get('/api/product', productCtrl.read);
app.put('/api/product/:id', productCtrl.update);
app.delete('/api/product/:id', productCtrl.delete);

var port = 3000;

app.listen(port, function(){
  console.log('Listening on Port ' + port);
});
