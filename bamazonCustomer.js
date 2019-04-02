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
    var showTable = new Table({
      head: ["Item ID", "Product Name", "Department", "Price", "In Stock"],
      colWidths: [10, 15, 15, 20, 10]
    });
    for (var i = 0; i < res.length; i++) {
      showTable.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity
      ]);
    }
    // console.log(res[0]);
    // console.log([res[0]]); //trying to get into this object.  Why need array? around [res]?
    console.log(showTable.toString());
  });
}

//connection.end();

/* function showProduct() {
    inquirer.prompt({
        name: 
    })
}
 */
