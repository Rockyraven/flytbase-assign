// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        // Regular expression to validate email format
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        // Password must be at least 6 characters long
        return value.length >= 6;
      },
      message: props => `Password must be at least 6 characters long!`
    }
  },
  sites: [{
    type: String
  }],
  drones: [{
    type: String
  }]
}, {
  timestamps: true // Add timestamps automatically
});

module.exports = mongoose.model('User', userSchema);

