const Animal = require('../models/animal');

const getAllAnimals = async (request, response) => {
  try {
    const animals = await Animal.find({ user: request.user._id });
    response.json({ animals });
    //if the const and the object property's value match you don't need to repeat it
    //   const animals = await Animal.find();
    //   response.json({ animals: animals });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const getSingleAnimal = async (request, response) => {
  try {
    const animalId = request.params.id;
    const animal = await Animal.findOne({
      _id: animalId,
      user: request.user._id,
    });
    response.json({ animal });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const createAnimal = async (request, response) => {
  try {
    const name = request.body.name;
    const sex = request.body.sex;
    const dob = request.body.dob;
    const bred = request.body.bred;
    const breed = request.body.breed;
    const dame = request.body.dame;
    const sire = request.body.sire;
    const grandDame = request.body.grandDame;
    const grandSire = request.body.grandSire;
    const weaning = request.body.weaning;
    const weightBirth = request.body.weightBirth;
    const weightWean = request.body.weightWean;
    const weight8 = request.body.weight8;
    const weightCurrent = request.body.weightCurrent;
    const weightSale = request.body.weightSale;
    const firstService = request.body.firstService;
    const totalService = request.body.totalService;
    const totalLitters = request.body.totalLitters;
    const totalKits = request.body.totalKits;
    const aliveKits = request.body.aliveKits;
    const deadKits = request.body.deadKits;
    const soldKits = request.body.soldKits;
    const butcheredKits = request.body.butcheredKits;

    const animal = await Animal.create({
      name,
      sex,
      dob,
      bred,
      breed,
      dame,
      sire,
      grandDame,
      grandSire,
      weaning,
      weightBirth,
      weightWean,
      weight8,
      weightCurrent,
      weightSale,
      firstService,
      totalService,
      totalLitters,
      totalKits,
      aliveKits,
      deadKits,
      soldKits,
      butcheredKits,
      user: request.user._id,
    });
    response.json({ animal });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const editAnimal = async (request, response) => {
  try {
    //get ID
    const animalId = request.params.id;
    //get data
    const name = request.body.name;
    const sex = request.body.sex;
    const dob = request.body.dob;
    const bred = request.body.bred;
    const breed = request.body.breed;
    const dame = request.body.dame;
    const sire = request.body.sire;
    const grandDame = request.body.grandDame;
    const grandSire = request.body.grandSire;
    const weaning = request.body.weaning;
    const weightBirth = request.body.weightBirth;
    const weightWean = request.body.weightWean;
    const weight8 = request.body.weight8;
    const weightCurrent = request.body.weightCurrent;
    const weightSale = request.body.weightSale;
    const firstService = request.body.firstService;
    const totalService = request.body.totalService;
    const totalLitters = request.body.totalLitters;
    const totalKits = request.body.totalKits;
    const aliveKits = request.body.aliveKits;
    const deadKits = request.body.deadKits;
    const soldKits = request.body.soldKits;
    const butcheredKits = request.body.butcheredKits;
    //update
    await Animal.findOneAndUpdate(
      { _id: animalId, user: request.user._id },
      {
        name,
        sex,
        dob,
        bred,
        breed,
        dame,
        sire,
        grandDame,
        grandSire,
        weaning,
        weightBirth,
        weightWean,
        weight8,
        weightCurrent,
        weightSale,
        firstService,
        totalService,
        totalLitters,
        totalKits,
        aliveKits,
        deadKits,
        soldKits,
        butcheredKits,
      }
    );
    //find updated
    const animal = await Animal.findById(animalId);
    //return updated
    response.json({ animal });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const deleteAnimal = async (request, response) => {
  try {
    const animalId = request.params.id;
    await Animal.deleteOne({ _id: animalId, user: request.user._id });
    response.send('Deleted!');
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

module.exports = {
  getAllAnimals,
  getSingleAnimal,
  createAnimal,
  editAnimal,
  deleteAnimal,
};
