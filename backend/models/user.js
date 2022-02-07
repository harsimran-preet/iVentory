const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  loginid: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length <= 5) throw new Error("Password must be 5 characters.");
    },
  },
  inventorylist: [{
    type : 'ObjectId', 
    ref: 'Inventory'
  }]
}, {collection : 'user_list'});

const User = mongoose.model("User", UserSchema);

module.exports = User;

