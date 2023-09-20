const Contact = require('../models/contact');

const getAllContacts = async (request, response) => {
  try {
    const contacts = await Contact.find({ user: request.user._id });
    response.json({ contacts });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const createContact = async (request, response) => {
  try {
    const contactName = request.body.contactName;
    const contactEmail = request.body.contactEmail;
    const contactNumber = request.body.contactNumber;
    const contactGroup = request.body.contactGroup;

    const contact = await Contact.create({
      contactName,
      contactEmail,
      contactNumber,
      contactGroup,
      user: request.user._id,
    });
    response.json({ contact });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const editContact = async (request, response) => {
  try {
    const contactId = request.params.id;
    const contactName = request.body.contactName;
    const contactEmail = request.body.contactEmail;
    const contactNumber = request.body.contactNumber;
    const contactGroup = request.body.contactGroup;

    await Contact.findOneAndUpdate(
      { _id: contactId, user: request.user._id },
      {
        contactName,
        contactEmail,
        contactNumber,
        contactGroup,
      }
    );
    //find updated
    const contact = await Contact.findById(contactId);
    //return updated
    response.json({ contact });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const deleteContact = async (request, response) => {
  try {
    const contactId = request.params.id;
    await Contact.deleteOne({ _id: contactId, user: request.user._id });
    response.send('Deleted!');
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

module.exports = {
  getAllContacts,
  createContact,
  deleteContact,
  editContact,
};
