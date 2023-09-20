const Inventory = require('../models/inventory');

const getAllInventories = async (request, response) => {
  try {
    const inventories = await Inventory.find({ user: request.user._id });
    response.json({ inventories });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const createInventory = async (request, response) => {
  try {
    const inventoryName = request.body.inventoryName;
    const inventoryPrice = request.body.inventoryPrice;
    const inventoryNumber = request.body.inventoryNumber;
    const inventoryDate = request.body.inventoryDate;
    const inventorySalePrice = request.body.inventorySalePrice;

    const inventory = await Inventory.create({
      inventoryName,
      inventoryPrice,
      inventoryNumber,
      inventoryDate,
      inventorySalePrice,
      user: request.user._id,
    });
    response.json({ inventory });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const editInventory = async (request, response) => {
  try {
    const inventoryId = request.params.id;

    const inventoryName = request.body.inventoryName;
    const inventoryPrice = request.body.inventoryPrice;
    const inventoryNumber = request.body.inventoryNumber;
    const inventoryDate = request.body.inventoryDate;
    const inventorySalePrice = request.body.inventorySalePrice;

    await Inventory.findOneAndUpdate(
      { _id: inventoryId, user: request.user._id },
      {
        inventoryName,
        inventoryPrice,
        inventoryNumber,
        inventorySalePrice,
        inventoryDate,
      }
    );

    const inventory = await Inventory.findById(inventoryId);
    response.json({ inventory });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const deleteInventory = async (request, response) => {
  try {
    const inventoryId = request.params.id;
    await Inventory.deleteOne({ _id: inventoryId, user: request.user._id });
    response.send('Deleted!');
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

module.exports = {
  getAllInventories,
  createInventory,
  deleteInventory,
  editInventory,
};
