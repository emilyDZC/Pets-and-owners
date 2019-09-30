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
  console.log(Object.keys(req));
  console.log(req.params);
  fetchOwnerById(id, (err, data) => {
    if (err) throw err;
    else {
      res.status(200);
      res.send(data);
    }
  });
}

module.exports = { getOwners, getOwner };
