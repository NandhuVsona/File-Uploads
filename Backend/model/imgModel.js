const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  image: {
    type: String, // Use String for Base64 data
    
  },
  
});

module.exports = mongoose.model("Images", imgSchema);
