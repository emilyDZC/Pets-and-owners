const fs = require("fs");
const createPet = (ownerId, data, cb) => {
  fs.readdir("./data/owners", (err, owner) => {
    if (err) cb (err);
    else {
      if (owner.includes(`${ownerId}.json`)) {
        data.forEach(pet => {
          fs.writeFile(`data/pets/${pet.id}.json`, JSON.stringify(pet, null, 2), err => {
            if (err) cb(err);
          })
        })
        cb(null, data);
      } else cb(null, { "error": "Please enter a valid owner" });
    }
    })
};

const fetchAllPets = (cb) => {
   let pets = [];
  fs.readdir("./data/pets", (err, data) => {
    if (err) cb (err);
    else {
      for (let i = 0; i < data.length; i++) {
        fs.readFile(`data/pets/${data[i]}`, (err, contents) => {
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

const deletePetById = (id, cb) => {
  fs.unlink(`data/pets/${id}.json`, (err, data) => {
    if (err) cb(err);
    else cb(null, { "msg": "Pet successfully deleted" });
  })
};

module.exports = {
  createPet,
  fetchPetById,
  fetchPetsByOwnerId,
  deletePetById,
  fetchAllPets
};
