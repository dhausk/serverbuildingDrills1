var express = require('express');
var cors = require('cors');
var App = express();
const cohortDatabase = require('./Data/Gcohorts');
var port = process.env.PORT || 3000;

function idFinder(cohortDatabase, id) {
  for (let i = 0; i < cohortDatabase.length; i++) {
    if (cohortDatabase[i].id == id) {
      return cohortDatabase[i];
    }
  };
  return false;
}
App.use(cors());
App.get('/', (req, res) => {
  res.status(200).json({
    data: cohortDatabase
  });
});
App.get('/:id', (req, res) => {
  var dataEntry = idFinder(cohortDatabase, req.params.id);
  if (dataEntry === false) {
    res.status(404).json({
      error: {
        "message": "No record found!"
      }
    });
  }
  else {
    res.status(200).json({
      data: dataEntry
    });
  };
});
App.listen(port)
