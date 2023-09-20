const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
  feedName: { type: String, required: true },
  feedQuantity: { type: Number, required: true },
  feedServing: { type: Number, required: true },
  feedDatePurchased: { type: Date, required: false },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Feed = mongoose.model('Feed', feedSchema);

module.exports = Feed;
