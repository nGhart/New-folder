const Disease = require('../models/disease');

const getAllDiseases = async (request, response) => {
  try {
    const diseases = await Disease.find({ user: request.user._id });
    response.json({ diseases });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const createDisease = async (request, response) => {
  try {
    const diseaseAnimal = request.body.diseaseAnimal;
    const diseaseCondition = request.body.diseaseCondition;
    const diseaseManagement = request.body.diseaseManagement;
    const diseaseDuration = request.body.diseaseDuration;
    const diseaseOutcome = request.body.diseaseOutcome;
    const diseaseDate = request.body.diseaseDate;

    const disease = await Disease.create({
      diseaseAnimal,
      diseaseCondition,
      diseaseManagement,
      diseaseDuration,
      diseaseOutcome,
      diseaseDate,
      user: request.user._id,
    });
    response.json({ disease });
    console.log(request.body);
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const editDisease = async (request, response) => {
  try {
    // Get ID
    const diseaseId = request.params.id;
    // Get data

    const diseaseAnimal = request.body.diseaseAnimal;
    const diseaseCondition = request.body.diseaseCondition;
    const diseaseManagement = request.body.diseaseManagement;
    const diseaseDuration = request.body.diseaseDuration;
    const diseaseOutcome = request.body.diseaseOutcome;
    const diseaseDate = request.body.diseaseDate;
    // Update
    await Disease.findOneAndUpdate(
      { _id: diseaseId, user: request.user._id },
      {
        diseaseAnimal,
        diseaseCondition,
        diseaseManagement,
        diseaseDuration,
        diseaseOutcome,
        diseaseDate,
      }
    );
    // Find updated
    const disease = await Disease.findById(diseaseId);
    // Return updated
    response.json({ disease });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const deleteDisease = async (request, response) => {
  try {
    const diseaseId = request.params.id;
    await Disease.deleteOne({ _id: diseaseId, user: request.user._id });
    response.send('Deleted!');
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

module.exports = {
  getAllDiseases,
  createDisease,
  editDisease,
  deleteDisease,
};
