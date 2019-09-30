const fs = require("fs");

const createOwner = (data, cb) => {
  fs.writeFile(`./data/owners/${data.id}.json`, data, err => {
    if (err) cb(err);
    else {
      cb(null, data);
    }
  })
};

const fetchAllOwners = cb => {
  let owners = [];
  fs.readdir("./data/owners", (err, data) => {
    if (err) cb(err);
    else {
      for (let i = 1; i < data.length + 1; i++) {
        fs.readFile(`data/owners/o${i}.json`, (err, contents) => {
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
  fs.readFile(`./data/owners/${id}.json`, 'utf8', (err, owner) => {
    if (err) cb(err);
    else {
      let parsedOwner = JSON.parse(owner);
      parsedOwner.name = data.name;
      parsedOwner.age = data.age;
      fs.writeFile(`data/owners/${id}.json`, parsedOwner, err => {
        if (err) cb(err);
        else {
          cb(null, parsedOwner);
        }
      });
    }
  });
};

const deleteOwnerById = (id, cb) => {};

module.exports = {
  createOwner,
  fetchAllOwners,
  fetchOwnerById,
  updateOwner,
  deleteOwnerById
};
