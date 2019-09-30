const fs = require("fs");

const createOwner = (data, cb) => {};

const fetchAllOwners = cb => {
  let owners = [];
  fs.readdir("./data/owners", (err, data) => {
    if (err) cb (err);
    else {
      for (let i = 1; i < data.length + 1; i++) {
        fs.readFile(`data/owners/o${i}.json`, (err, contents) => {
          if (err) cb (err);
          else {
            const parsed = JSON.parse(contents);
            owners[i-1] = parsed;
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
  cb(id);
};

const updateOwner = (id, data, cb) => {};

const deleteOwnerById = (id, cb) => {};

module.exports = {
  createOwner,
  fetchAllOwners,
  fetchOwnerById,
  updateOwner,
  deleteOwnerById
};
