const mongoose = require('mongoose');
const userModal = require("./userModal");

// Define the drone schema
const droneSchema = new mongoose.Schema({
  drone_type: {
    type: String,
    required: true
  },
  make_name: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: userModal,
  },
  site: {
    type: String
  }
},{
    timestamps: true // Add timestamps automatically
  });

// Create a model based on the schema
const Drone = mongoose.model('Drone', droneSchema);

module.exports = Drone;
