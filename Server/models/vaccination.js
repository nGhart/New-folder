const mongoose = require('mongoose');

const vaccinationSchema = new mongoose.Schema({
  medication: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  nextDate: {
    type: String,
    required: true,
  },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Vaccination = mongoose.model('Vaccination', vaccinationSchema);

module.exports = Vaccination;
