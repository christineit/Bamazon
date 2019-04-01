var mysql = require("mysql");
var inquirer = require("inquirer");

//create connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});
// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  showProduct();
});
//connection.end();

function showProduct() {}
