const fs = require("fs");
const createPet = (ownerId, data, cb) => {};

const fetchAllPets = (cb) => {
   let pets = [];
  fs.readdir("./data/pets", (err, data) => {
    if (err) cb (err);
    else {
      for (let i = 1; i < data.length + 1; i++) {
        fs.readFile(`data/pets/p${i}.json`, (err, contents) => {
          if (err) cb (err);
          else {
            const parsed = JSON.parse(contents);
            pets[i-1] = parsed;
            if (Object.keys(pets).length === data.length) {
              cb(null, pets);
            }
          }
        });
      }
    }
  });
};

const fetchPetById = (id, cb) => {
  if (id === 'owner') cb(null, { msg: 'Please provide an owner id'});
  fetchAllPets((err, pets) => {
    if (err) cb(err);
    else {
      let filtered = pets.filter(pet => pet.id === id);
      cb(null, ...filtered);
    }
  })
};

const fetchPetsByOwnerId = (ownerId, cb) => {
  fetchAllPets((err, pets) => {
    if (err) cb(err);
    else {
      let filtered = pets.filter(pet => pet.owner === ownerId);
      cb(null, filtered);
    }
  })
};

const deletePetById = (id, cb) => {};

module.exports = {
  createPet,
  fetchPetById,
  fetchPetsByOwnerId,
  deletePetById,
  fetchAllPets
};
