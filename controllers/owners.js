const {
  createOwner,
  fetchAllOwners,
  fetchOwnerById,
  updateOwner,
  deleteOwnerById
} = require("../models/owners.js");

function getOwners(req, res, next) {
  fetchAllOwners((err, data) => {
    if (err) next(err);
    else {
      res.status(200);
      res.send(data);
    }
  });
}

function getOwner(req, res, next) {
  const { id } = req.params;
  fetchOwnerById(id, (err, data) => {
    if (err) next(err);
    else {
      res.status(200);
      res.send(data);
    }
  });
}

function patchOwner(req, res, next) {
  const { id } = req.params;
  updateOwner(id, req.body, (err, data) => {
    if (err) next(err);
    else {
      res.status(200);
      res.send(data);
    }
  });
}

function addOwner(req, res, next) {
  let obj = {
    id: "o" + Date.now(),
    name: req.body.name,
    age: req.body.age
  };
  createOwner(obj, (err, data) => {
    if (err) next(err);
    else {
      res.status(201);
      res.send(data);
    }
  });
}

function deleteOwner(req, res, next) {
  const { id } = req.params;
  deleteOwnerById(id, (err, data) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.status(200).send(data);
    }
  });
}

module.exports = { getOwners, getOwner, patchOwner, addOwner, deleteOwner };
