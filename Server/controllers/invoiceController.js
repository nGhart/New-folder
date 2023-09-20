const Invoice = require('../models/invoice');

const getAllInvoices = async (request, response) => {
  try {
    const invoices = await Invoice.find({ user: request.user._id });
    response.json({ invoices });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const getSingleInvoice = async (request, response) => {
  try {
    const invoiceId = request.params.id;
    const invoice = await Invoice.findOne({
      _id: invoiceId,
      user: request.user._id,
    });
    response.json({ invoice });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const createInvoice = async (request, response) => {
  try {
    const clientName = request.body.clientName;
    const clientEmail = request.body.clientEmail;
    const clientNumber = request.body.clientNumber;
    const buckPrice = request.body.buckPrice;
    const clientBuckCount = request.body.clientBuckCount;
    const doePrice = request.body.doePrice;
    const clientDoeCount = request.body.clientDoeCount;
    const kitPrice = request.body.kitPrice;
    const clientKitCount = request.body.clientKitCount;
    // const manurePrice = request.body.manurePrice;
    // const clientManureCount = request.body.clientManureCount;

    const invoice = await Invoice.create({
      clientName,
      clientEmail,
      clientNumber,
      buckPrice,
      clientBuckCount,
      doePrice,
      clientDoeCount,
      kitPrice,
      clientKitCount,
      // manurePrice,
      // clientManureCount,
      user: request.user._id,
    });
    response.json({ invoice });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const editInvoice = async (request, response) => {
  try {
    const invoiceId = request.params.id;
    const clientName = request.body.clientName;
    const clientEmail = request.body.clientEmail;
    const clientNumber = request.body.clientNumber;
    const buckPrice = request.body.buckPrice;
    const clientBuckCount = request.body.clientBuckCount;
    const doePrice = request.body.doePrice;
    const clientDoeCount = request.body.clientDoeCount;
    const kitPrice = request.body.kitPrice;
    const clientKitCount = request.body.clientKitCount;
    // const manurePrice = request.body.manurePrice;
    // const clientManureCount = request.body.clientManureCount;
    await Invoice.findOneAndUpdate(
      { _id: invoiceId, user: request.user._id },
      {
        clientName,
        clientEmail,
        clientNumber,
        buckPrice,
        clientBuckCount,
        doePrice,
        clientDoeCount,
        kitPrice,
        clientKitCount,
        // manurePrice,
        // clientManureCount,
      }
    );
    const invoice = await Invoice.findById(invoiceId);
    response.json({ invoice });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const deleteInvoice = async (request, response) => {
  try {
    const invoiceId = request.params.id;
    await Invoice.deleteOne({ _id: invoiceId, user: request.user._id });
    response.send('Deleted!');
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

module.exports = {
  getAllInvoices,
  createInvoice,
  getSingleInvoice,
  deleteInvoice,
  editInvoice,
};
