const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sex: { type: String, required: true },
  dob: { type: Date, required: true },
  bred: { type: String, required: false },
  breed: { type: String, required: false },
  dame: { type: String, required: true },
  sire: { type: String, required: true },
  grandDame: { type: String, required: false },
  grandSire: { type: String, required: false },
  weaning: { type: Number, required: false },
  weightBirth: { type: Number, required: false },
  weightWean: { type: Number, required: false },
  weight8: { type: Number, required: false },
  weightCurrent: { type: Number, required: false },
  weightSale: { type: Number, required: false },
  firstService: { type: Number, required: false },
  totalService: { type: Number, required: false },
  totalLitters: { type: Number, required: false },
  totalKits: { type: Number, required: false },
  aliveKits: { type: Number, required: false },
  deadKits: { type: Number, required: false },
  soldKits: { type: Number, required: false },
  butcheredKits: { type: Number, required: false },
  pic: { type: String, required: false, default: 'Image of animal' },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
