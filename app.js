const express = require("express");
const app = express();
const { getOwners, getOwner } = require('./controllers/owners')

app.get('/api/owners', getOwners);
app.get('/api/owners/:id', getOwner);


module.exports = app;
