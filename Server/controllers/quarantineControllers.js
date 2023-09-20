const Quarantine = require('../models/quarantine');

const getAllQuarantines = async (request, response) => {
  try {
    const quarantines = await Quarantine.find({ user: request.user._id });
    response.json({ quarantines });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const createQuarantine = async (request, response) => {
  try {
    const animal = request.body.animal;
    const condition = request.body.condition;
    const outcome = request.body.outcome;
    const startDate = request.body.startDate;
    const endDate = request.body.endDate;

    const quarantine = await Quarantine.create({
      animal,
      condition,
      outcome,
      startDate,
      endDate,

      user: request.user._id,
    });
    response.json({ quarantine });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const editQuarantine = async (request, response) => {
  try {
    const quarantineId = request.params.id;
    const animal = request.body.animal;
    const condition = request.body.condition;
    const outcome = request.body.outcome;
    const startDate = request.body.startDate;
    const endDate = request.body.endDate;
    await Quarantine.findOneAndUpdate(
      { _id: quarantineId, user: request.user._id },
      {
        animal,
        condition,
        outcome,
        startDate,
        endDate,
      }
    );

    const quarantine = await Quarantine.findById(quarantineId);

    response.json({ quarantine });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const deleteQuarantine = async (request, response) => {
  try {
    const quarantineId = request.params.id;
    await Quarantine.deleteOne({ _id: quarantineId, user: request.user._id });
    response.send('Deleted!');
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

module.exports = {
  getAllQuarantines,
  createQuarantine,
  deleteQuarantine,
  editQuarantine,
};
