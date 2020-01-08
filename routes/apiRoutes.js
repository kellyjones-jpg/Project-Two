var db = require("../models");

module.exports = function(app) {
  // Get all notes
  app.get("/api/notes", function(req, res) {
    db.Example.findAll({}).then(function(dbidea_db) {
      res.json(dbidea_db);
    });
  });

   // Get all notes
   app.get("/api/notes/:authid", function(req, res) {
    db.Example.findAll({ where: { author_id: req.params.authid } }).then(function(dbidea_db) {
      res.json(dbidea_db);
    });
  });

  // Create a new notes
  app.post("/api/notes", function(req, res) {

    console.log(req.body);

    console.log(db.Example)

    db.Example.create(req.body).then(function(responseFromDB) {
      // Response
      res.json(responseFromDB);
    });

  });

  // Delete a note by id
  app.delete("/api/notes/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbidea_db) {
      res.json(dbidea_db);
    });
  });

};
