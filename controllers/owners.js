const {
  createOwner,
  fetchAllOwners,
  fetchOwnerById,
  updateOwner,
  deleteOwnerById
} = require("../models/owners.js");

function getOwners(req, res) {
  fetchAllOwners((err, data) => {
    if (err) throw err;
    else {
      res.status(200);
      res.send(data);
    }
  });  
}

function getOwner(req, res) {
  const { id } = req.params;
  fetchOwnerById(id, (err, data) => {
    if (err) throw err;
    else {
      res.status(200);
      res.send(data);
    }
  });
}

function patchOwner(req, res) {
  const { id } = req.params;
  updateOwner(id, req.body, (err, data) => {
    if (err) throw err;
    else {
      res.status(200);
      res.send(data);
    }
  })
}

function addOwner(req, res) {
  // req.body["id"] = `o${Date.now()}`;
  let obj = {
    id: 'o'+ Date.now(),
    name: req.body.name,
    age: req.body.age
  };
  createOwner(obj, (err, data) => {
    if (err) throw err;
    else {
      res.status(201);
      res.send(data);
    }
  })
}

module.exports = { getOwners, getOwner, patchOwner, addOwner };
