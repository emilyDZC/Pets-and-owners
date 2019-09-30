const express = require("express");
const app = express();
const { getOwners, getOwner, patchOwner, addOwner } = require('./controllers/owners');
const { getPets, getPetByOwner, getPetById } = require('./controllers/pets');
app.use(express.json());


app.get('/api/owners', getOwners);
app.get('/api/owners/:id', getOwner);
app.patch('/api/owners/:id', patchOwner);
app.get('/api/pets', getPets);
app.get('/api/pets/owner/:id', getPetByOwner);
app.get('/api/pets/:id', getPetById);
app.post('/api/newOwner', addOwner);


module.exports = app;
