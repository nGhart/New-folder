const Employee = require('../models/employee');

const getAllEmployees = async (request, response) => {
  try {
    const employees = await Employee.find({ user: request.user._id });
    response.json({ employees });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const getSingleEmployee = async (request, response) => {
  try {
    const employeeId = request.params.id;
    const employee = await Employee.findOne({
      _id: employeeId,
      user: request.user._id,
    });
    response.json({ employee });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const createEmployee = async (request, response) => {
  try {
    const employeeName = request.body.employeeName;
    const employeeRole = request.body.employeeRole;
    const employeeNumber = request.body.employeeNumber;
    const employeeDepartment = request.body.employeeDepartment;
    const employeeSalary = request.body.employeeSalary;
    const employeeStartDate = request.body.employeeStartDate;
    const employeeEndDate = request.body.employeeEndDate;

    const employee = await Employee.create({
      employeeName,
      employeeRole,
      employeeNumber,
      employeeDepartment,
      employeeSalary,
      employeeStartDate,
      employeeEndDate,
      user: request.user._id,
    });
    response.json({ employee });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const editEmployee = async (request, response) => {
  try {
    const employeeId = request.params.id;

    const employeeName = request.body.employeeName;
    const employeeRole = request.body.employeeRole;
    const employeeNumber = request.body.employeeNumber;
    const employeeDepartment = request.body.employeeDepartment;
    const employeeSalary = request.body.employeeSalary;
    const employeeStartDate = request.body.employeeStartDate;
    const employeeEndDate = request.body.employeeEndDate;

    await Employee.findOneAndUpdate(
      { _id: employeeId, user: request.user._id },
      {
        employeeName,
        employeeRole,
        employeeNumber,
        employeeDepartment,
        employeeSalary,
        employeeStartDate,
        employeeEndDate,
      }
    );
    //find updated
    const employee = await Employee.findById(employeeId);
    //return updated
    response.json({ employee });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const deleteEmployee = async (request, response) => {
  try {
    const employeeId = request.params.id;
    await Employee.deleteOne({ _id: employeeId, user: request.user._id });
    response.send('Deleted!');
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

module.exports = {
  getAllEmployees,
  createEmployee,
  getSingleEmployee,
  deleteEmployee,
  editEmployee,
};
