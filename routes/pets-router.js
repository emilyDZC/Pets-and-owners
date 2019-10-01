const petRouter = require("express").Router();
const {
  getPets,
  getPetByOwner,
  getPetById,
  deletePet,
  addPetToOwner
} = require("../controllers/pets");

petRouter.route("/").get(getPets);
petRouter.route("/owner/:id").get(getPetByOwner);
petRouter
  .route("/:id")
  .get(getPetById)
  .delete(deletePet)
  .post(addPetToOwner);

module.exports = petRouter;
