//var db = require("../models");
var path = require("path")

module.exports = function (app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"))
  })


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    //res.send("404");
    res.sendFile(path.join(__dirname, "/index.html"))
  });
};
