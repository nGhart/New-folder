const Vaccination = require('../models/vaccination');

const getAllVaccinations = async (request, response) => {
  try {
    const vaccinations = await Vaccination.find({ user: request.user._id });
    response.json({ vaccinations });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const createVaccination = async (request, response) => {
  try {
    const medication = request.body.medication;
    const date = request.body.date;
    const nextDate = request.body.nextDate;

    const vaccination = await Vaccination.create({
      medication,
      date,
      nextDate,

      user: request.user._id,
    });
    response.json({ vaccination });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const editVaccination = async (request, response) => {
  try {
    const vaccinationId = request.params.id;
    const medication = request.body.medication;
    const nextDate = request.body.nextDate;
    const date = request.body.date;
    await Vaccination.findOneAndUpdate(
      { _id: vaccinationId, user: request.user._id },
      {
        medication,
        date,
        nextDate,
      }
    );

    const vaccination = await Vaccination.findById(vaccinationId);

    response.json({ vaccination });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const deleteVaccination = async (request, response) => {
  try {
    const vaccinationId = request.params.id;
    await Vaccination.deleteOne({ _id: vaccinationId, user: request.user._id });
    response.send('Deleted!');
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

module.exports = {
  getAllVaccinations,
  createVaccination,
  deleteVaccination,
  editVaccination,
};
