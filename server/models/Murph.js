const mongoose = require("mongoose");

const MurphSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  mileOneTime: {
    type: String,
    required: true
  },
  calisthenicsTime: {
    type: String,
    required: true
  },
  mileTwoTime: {
    type: String,
    required: true
  },
  totalTime: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Murph = mongoose.model("murph", MurphSchema);
