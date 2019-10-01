const apiRouter = require('express').Router();
const ownerRouter = require('./owner-router');
const petsRouter = require('./pets-router');
apiRouter.get('/', (req, res) => {
  res.status(200).send('hello');
});

apiRouter.use('/owners', ownerRouter);
apiRouter.use('/pets', petsRouter);



module.exports = apiRouter;