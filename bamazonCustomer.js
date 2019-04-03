var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

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
  showProducts();
});

function showProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // console.log(res);
    var showTable = new Table({
      head: ["Product ID", "Product Name", "Department", "Price", "In Stock"],
      colWidths: [10, 15, 20, 20, 10]
    });
    for (var i = 0; i < res.length; i++) {
      showTable.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        "$" + res[i].price.toFixed(2),
        res[i].stock_quantity
      ]);
    }
    // console.log(res[0]);
    // console.log([res[0]]); //trying to get into this object.  Why need array? around [res]?
    console.log(showTable.toString());
    shoppingPrompt();
  });
}

function shoppingPrompt() {
  inquirer
    .prompt([
      {
        name: "productId",
        type: "input",
        message: "What is the Product ID?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many items do you want to purchase??"
      }
    ])
    .then(function(ans) {
      //console.log(ans);
      //store ans in array?
      var productID = ans.productId;
      var productNeeded = ans.quantity;

      placeOrder(productID, productNeeded);
    });
}

function placeOrder(productID, productNeeded) {
  connection.query(
    "SELECT * FROM products WHERE item_id = " + productID,
    function(err, res) {
      if (err) {
        console.log(err);
      }
      if (productNeeded <= res[0].stock_quantity) {
        var totalCost = res[0].price * productNeeded;
        console.log("IN STOCK! We are able to complete your purchase!");
      } else {
        console.log(
          "Unable to complete purchase: not enough product in stock."
        );
      }
      showProducts();
    }
  );
}
