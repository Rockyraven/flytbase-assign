const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userModal = require("./userModal");

const waypointSchema = new Schema({
  alt: {
    type: Number,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
});

const missionSchema = new Schema({
  alt: {
    type: Number,
    required: true
  },
  speed: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: userModal,
  },
  waypoints: {
    type: [waypointSchema],
    required: true
  }
}, {
    timestamps: true // Add timestamps automatically
  });

const Mission = mongoose.model('Mission', missionSchema);

module.exports = Mission;
