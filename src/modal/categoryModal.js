const mongoose = require('mongoose');

// Define the category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  tag_name: {
    type: String,
    required: true
  },
},{
  timestamps: true // Add timestamps automatically
});

// Create a model based on the schema
module.exports = mongoose.model('Category', categorySchema);

// module.exports = Category;
