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

      placeOrder();
        }
      );
    

// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.
function placeOrder(){

}
// //if else statement:
//     // if qty id(user) <= available(DB) quantity {
//       update database
//       console.log(Thank you for shopping)
//       showProducts()
//   }else {console.log(Insufficient qty, please buy something else)
