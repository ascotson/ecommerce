var product = require('./../models/productModel');

module.exports = {
  create: function(req, res) {
    product.create(req.body, function(err, result) {
      if(err) {
        res.status(500).send('Failed to add new record');
        console.log('POST request failed');
      }
      else {
        res.send(result);
        console.log('POST success');
      }
    });
  },

  read: function(req, res) {
    product.find({}, function(err, result) {
      if(err) {
        res.status(500).send('Failed to get requested record');
        console.log('GET request failed');
      }
      else {
        res.send(result);
        console.log('GET success');
      }
    });
  },

  update: function(req, res) {
    product.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
      if(err) {
        res.status(500).send('Failed to update requested record');
        console.log('PUT request failed');
      }
      else {
        res.send(result);
        console.log('PUT success');
      }
    });
  },

  delete: function(req, res) {
    product.findByIdAndRemove(req.params.id, function(err, result) {
      if(err) {
        res.status(500).send('Failed to delete requested record');
        console.log('DELETE request failed');
      }
      else {
        res.send(result);
        console.log('DELETE success');
      }
    });
  }
};
