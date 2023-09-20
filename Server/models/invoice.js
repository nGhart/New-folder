const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: false },
  clientNumber: { type: String, required: true },
  buckPrice: { type: Number, required: false, default: 0 },
  clientBuckCount: { type: Number, required: false, default: 0 },
  doePrice: { type: Number, required: false, default: 0 },
  clientDoeCount: { type: Number, required: false, default: 0 },
  kitPrice: { type: Number, required: false, default: 0 },
  clientKitCount: { type: Number, required: false, default: 0 },
  // manurePrice: { type: Number, required: false, default: 0 },
  // clientManureCount: { type: Number, required: false, default: 0 },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
