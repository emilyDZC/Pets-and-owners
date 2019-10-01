const fs = require("fs");
const { fetchPetsByOwnerId } = require("./pets");

const createOwner = (data, cb) => {
  fs.writeFile(
    `./data/owners/${data.id}.json`,
    JSON.stringify(data, null, 2),
    err => {
      if (err) cb(err);
      else {
        cb(null, data);
      }
    }
  );
};

const fetchAllOwners = cb => {
  let owners = [];
  fs.readdir("./data/owners", (err, data) => {
    if (err) cb(err);
    else {
      for (let i = 0; i < data.length; i++) {
        fs.readFile(`data/owners/${data[i]}`, (err, contents) => {
          if (err) cb(err);
          else {
            const parsed = JSON.parse(contents);
            owners[i - 1] = parsed;
            if (Object.keys(owners).length === data.length) {
              cb(null, owners);
            }
          }
        });
      }
    }
  });
};

const fetchOwnerById = (id, cb) => {
  fetchAllOwners((err, data) => {
    if (err) cb(err);
    else {
      let filtered = data.filter(owner => {
        return owner.id === id;
      });
      cb(null, ...filtered);
    }
  });
};

const updateOwner = (id, data, cb) => {
  fs.readFile(`./daa/owners/${id}.json`, "utf-8", (err, owner) => {
    if (err) cb(err);
    else {
      let parsedOwner = JSON.parse(owner);
      for (let key in data) {
        parsedOwner[key] = data[key];
      }
      fs.writeFile(
        `data/owners/${id}.json`,
        JSON.stringify(parsedOwner, null, 2),
        err => {
          if (err) cb(err);
          else {
            cb(null, parsedOwner);
          }
        }
      );
    }
  });
};

const deleteOwnerById = (id, cb) => {
  fetchPetsByOwnerId(id, (err, pets) => {
    if (err) cb(err);
    else {
      pets.forEach(pet => {
        fs.unlink(`data/pets/${pet.id}.json`, err => {
          if (err) cb(err);
        });
      });
      fs.unlink(`data/owners/${id}.json`, err => {
        if (err) cb(err);
        else {
          cb(null, { msg: "user successfully deleted" })
        }
      });
    }
  });
};

module.exports = {
  createOwner,
  fetchAllOwners,
  fetchOwnerById,
  updateOwner,
  deleteOwnerById
};
