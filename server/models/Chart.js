const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Chart
let Chart = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  }
},{
    collection: 'charts'
});

module.exports = mongoose.model('Chart', Chart);