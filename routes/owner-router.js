const ownerRouter = require("express").Router();
const {
  getOwners,
  getOwner,
  patchOwner,
  addOwner,
  deleteOwner
} = require("../controllers/owners");

ownerRouter.route("/").get(getOwners).post(addOwner);
ownerRouter
  .route("/:id")
  .get(getOwner)
  .patch(patchOwner)
  .delete(deleteOwner);


module.exports = ownerRouter;
