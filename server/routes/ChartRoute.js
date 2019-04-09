const express = require('express');
const app = express();
const ChartRoute = express.Router();

// Require Chart model in our routes module
let Chart = require('../models/');

// Defined store route
ChartRoute.route('/add').post(function (req, res) {
  let post = new Chart(req.body);
  post.save()
    .then(post => {
    res.status(200).json(post);
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
ChartRoute.route('/').get(function (req, res) {
    Chart.find(function (err, charts){
    if(err){
      console.log(err);
    }
    else {
      res.json(charts);
    }
  });
});

// Defined delete | remove | destroy route
ChartRoute.route('/delete/:id').get(function (req, res) {
    Chart.findByIdAndRemove({_id: req.params.id}, function(err, post){
        if(err) res.json(err);
        else res.json(req.params.id);
    });
});

module.exports = ChartRoute;
