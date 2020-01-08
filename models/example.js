module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    title: DataTypes.STRING,
    text: DataTypes.TEXT
  });
  return Example;
};
