const mongoose = require('mongoose');
const userModal = require("./userModal");

// Define the site schema
const siteSchema = new mongoose.Schema({
  site_name: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: userModal,
  },
  position: {
    type: {
      latitude: {
        type: String,
        required: true
      },
      longitude: {
        type: String,
        required: true
      }
    },
    required: true
  }
},{
    timestamps: true // Add timestamps automatically
  });

// Create a model based on the schema
module.exports =  mongoose.model('Site', siteSchema);

