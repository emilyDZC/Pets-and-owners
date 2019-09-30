const {
  createPet,
  fetchPetById,
  fetchPetsByOwnerId,
  deletePetById,
  fetchAllPets
} = require("../models/pets.js");

function getPets(req, res) {
  fetchAllPets((err, data) => {
    if (err) throw err;
    else {
      res.status(200);
      res.send(data);
    }
  });
}

function getPetByOwner(req, res) {
  const { id } = req.params;
  fetchPetsByOwnerId(id, (err, data) => {
    if (err) throw err;
    else {
      res.status(200);
      res.send(data);
    }
  });
}

function getPetById(req, res) {
  const { id } = req.params;
  fetchPetById(id, (err, data) => {
    if (err) throw err;
    else {
      res.status(200);
      res.send(data);
    }
  })
}

module.exports = { getPets, getPetByOwner, getPetById };
