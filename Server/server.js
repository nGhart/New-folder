if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./config/connectToDb');
const animalController = require('./controllers/animalController');
const diseaseController = require('./controllers/diseaseController');
const transactionController = require('./controllers/transactionController');
const userController = require('./controllers/userController');
const invoiceController = require('./controllers/invoiceController');
const contactController = require('./controllers/contactController');
const employeeController = require('./controllers/employeeController');
const feedController = require('./controllers/feedController');
const inventoryController = require('./controllers/inventoryController');
const matingController = require('./controllers/matingController');
const medController = require('./controllers/medController');
const quarantineController = require('./controllers/quarantineControllers');
const vaccinationController = require('./controllers/vaccinationController');
const requireAuth = require('./middleware/requireAuth');

const app = express();

//enable express read json
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//DB connection
connectToDb();

//routes
//AUTH
app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.get('/logout', userController.logout);
app.get('/check-auth', requireAuth, userController.checkAuth);

//ANIMALS
//get all items
app.get('/animals', requireAuth, animalController.getAllAnimals);
//get a single item
app.get('/animals/:id', requireAuth, animalController.getSingleAnimal);
//create an item
app.post('/animals', requireAuth, animalController.createAnimal);
//edit an item
app.put('/animals/:id', requireAuth, animalController.editAnimal);
//delete
app.delete('/animals/:id', requireAuth, animalController.deleteAnimal);

//TRANSACTIONS
//get all items
app.get('/transactions', requireAuth, transactionController.getAllTransactions);
//get a single item
app.get(
  '/transactions/:id',
  requireAuth,
  transactionController.getSingleTransaction
);
//create an item
app.post('/transactions', requireAuth, transactionController.createTransaction);
//edit an item
app.put(
  '/transactions/:id',
  requireAuth,
  transactionController.editTransaction
);
//delete
app.delete(
  '/transactions/:id',
  requireAuth,
  transactionController.deleteTransaction
);

//invoice
app.get('/invoices', requireAuth, invoiceController.getAllInvoices);
//get a single item
app.get('/invoices/:id', requireAuth, invoiceController.getSingleInvoice);
//create an item
app.post('/invoices', requireAuth, invoiceController.createInvoice);
//edit an item
app.put('/invoices/:id', requireAuth, invoiceController.editInvoice);
//delete
app.delete('/invoices/:id', requireAuth, invoiceController.deleteInvoice);

//contact
app.get('/contacts', requireAuth, contactController.getAllContacts);
//create an item
app.post('/contacts', requireAuth, contactController.createContact);
//edit an item
app.put('/contacts/:id', requireAuth, contactController.editContact);
//delete
app.delete('/contacts/:id', requireAuth, contactController.deleteContact);

//Employee
app.get('/employees', requireAuth, employeeController.getAllEmployees);
app.get('/employees/:id', requireAuth, employeeController.getSingleEmployee);
app.post('/employees', requireAuth, employeeController.createEmployee);
app.put('/employees/:id', requireAuth, employeeController.editEmployee);
app.delete('/employees/:id', requireAuth, employeeController.deleteEmployee);

//Feed
app.get('/feeds', requireAuth, feedController.getAllFeeds);
app.post('/feeds', requireAuth, feedController.createFeed);
app.put('/feeds/:id', requireAuth, feedController.editFeed);
app.delete('/feeds/:id', requireAuth, feedController.deleteFeed);

//inventory
app.get('/inventories', requireAuth, inventoryController.getAllInventories);
app.post('/inventories', requireAuth, inventoryController.createInventory);
app.put('/inventories/:id', requireAuth, inventoryController.editInventory);
app.delete(
  '/inventories/:id',
  requireAuth,
  inventoryController.deleteInventory
);

//Disease
app.get('/diseases', requireAuth, diseaseController.getAllDiseases);
app.post('/diseases', requireAuth, diseaseController.createDisease);
app.put('/diseases/:id', requireAuth, diseaseController.editDisease);
app.delete('/diseases/:id', requireAuth, diseaseController.deleteDisease);

//mating
app.get('/matings', requireAuth, matingController.getAllMatings);
app.post('/matings', requireAuth, matingController.createMating);
app.put('/matings/:id', requireAuth, matingController.editMating);
app.delete('/matings/:id', requireAuth, matingController.deleteMating);

//meds
app.get('/meds', requireAuth, medController.getAllMeds);
app.post('/meds', requireAuth, medController.createMed);
app.put('/meds/:id', requireAuth, medController.editMed);
app.delete('/meds/:id', requireAuth, medController.deleteMed);

//quarantine
app.get('/quarantines', requireAuth, quarantineController.getAllQuarantines);
app.post('/quarantines', requireAuth, quarantineController.createQuarantine);
app.put('/quarantines/:id', requireAuth, quarantineController.editQuarantine);
app.delete(
  '/quarantines/:id',
  requireAuth,
  quarantineController.deleteQuarantine
);

//vaccination
app.get('/vaccinations', requireAuth, vaccinationController.getAllVaccinations);
app.post('/vaccinations', requireAuth, vaccinationController.createVaccination);
app.put(
  '/vaccinations/:id',
  requireAuth,
  vaccinationController.editVaccination
);
app.delete(
  '/vaccinations/:id',
  requireAuth,
  vaccinationController.deleteVaccination
);

app.use((req, res, next) => {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

//server start
app.listen(process.env.PORT, '127.0.0.1', function () {
  console.log('server is listening on ' + process.env.PORT);
});
