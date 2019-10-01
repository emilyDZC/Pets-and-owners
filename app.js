const express = require("express");
const app = express();
const apiRouter = require('./routes/api-router');
const fs = require('fs');

app.use(express.json());
app.use('/api', apiRouter);
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send({ msg: err.code });
    const errorString = `-=-=-=-=-=-=-=-ERROR=-=-=-=-=-=-=-\nMETHOD: ${req.method}\nURL: ${req.url}\nTIME:${Date(Date.now()).toString()}\n`
    fs.appendFile('log.txt', errorString,(err) => {
      if(err) throw err;
    })
  }
})

module.exports = app;
