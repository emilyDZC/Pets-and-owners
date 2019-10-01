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


function addPetToOwner(req, res) {
  const { id } = req.params;
  let newPet = req.body.map((pet, idx) => {
    pet.id = 'p'+Date.now()+idx;
    pet.owner = id;
    return pet;
  });
  createPet(id, newPet, (err, data) => {
    if (err) throw err;
    else res.status(201).send(data);
  })
}

function deletePet(req, res) {
  const { id } = req.params;
  deletePetById(id, (err, data) => {
    if (err) throw err;
    else res.status(200).send(data);
  })
}

module.exports = { getPets, getPetByOwner, getPetById, addPetToOwner, deletePet };
