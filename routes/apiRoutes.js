var db = require("../models");

module.exports = function(app) {
  // Get all notes
  app.get("/api/notes", function(req, res) {
    db.idea_board.findAll({}).then(function(dbidea_board) {
      res.json(dbidea_board);
    });
  });

   // Get all notes
   app.get("/api/notes/:authid", function(req, res) {
    db.idea_board.findAll({ where: { author_id: req.params.authid } }).then(function(dbidea_board) {
      res.json(dbidea_board);
    });
  });

  // Create a new notes
  app.post("/api/notes", function(req, res) {
    db.idea_board.create(req.body).then(function(dbidea_board) {
      res.json(dbidea_board);
    });
  });

  // Delete a note by id
  app.delete("/api/notes/:id", function(req, res) {
    db.idea_board.destroy({ where: { id: req.params.id } }).then(function(dbidea_board) {
      res.json(dbidea_board);
    });
  });

};
