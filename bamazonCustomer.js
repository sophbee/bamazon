// Needed dependencies
var inquirer = require("inquirer");
var mysql = require("mysql");

// MySQL connection info
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bamazon"
});

// Throw error if unable to connect otherwise console log the connection ID then start functions.
connection.connect(function(err) {
  if (err) throw err;
  queryAllProducts();
});

// Print all available items in inventory.
function queryAllProducts() {
  connection.query("SELECT * FROM products", function(err, result) {
    for (var i = 0; i < result.length; i++) {
      console.log(
        "Item ID: " +
          result[i].item_id +
          " | " +
          "Product name: " +
          result[i].product_name +
          " | " +
          "Price: " +
          result[i].price
      );
      console.log(
        "-----------------------------------------------------------------------------"
      );
    }
    customerQueryBuy();
  });
}

// Use Inquirer to ask questions so customer can buy items in inventory.
function customerQueryBuy() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which item would you like to buy? Please provide item ID.",
        name: "item",
        validate: function(value) {
          // Making sure the number entered by number is actually a number, less than 10 (since only 10 projects in inventory), and number isn't 0.
          var valid = !isNaN(parseFloat(value)) && value <= 10 && value !== 0;
          return valid || "Please enter a valid number.";
        },
        filter: Number
      },
      {
        type: "input",
        message: "How many would you like to buy?",
        name: "quantity",
        validate: function(value) {
          var valid = !isNaN(parseFloat(value)) && value !== 0;
          return valid || "Please enter a valid number.";
        },
        filter: Number
      }
    ])
    .then(function(answers) {
      // Store customer's answers into variables.
      var item = parseInt(answers.item);
      var quantity = parseInt(answers.quantity);

      connection.query(
        "SELECT * FROM products WHERE ?",
        { item_id: item },
        function(err, result) {
          if (err) throw err;

          for (var i = 0; i < result.length; i++) {
            // Stores inventory info into variables.
            var inventoryItem = parseInt(result[i].item_id);
            var inventoryStock = parseInt(result[i].stock_quantity);
            var itemPrice = parseFloat(result[i].price);

            // Checking to see if customer's needs and inventory match up.
            if (item === inventoryItem && quantity <= inventoryStock) {
              console.log("We can ship your order soon!");

              // Update numbers in MySQL.
              updateInventory();

              // Function to update numbers in MySQL and log the $ total for customer.
              function updateInventory() {
                // Store new inventory numbers after subtracting the # of items bought by customer.
                var updatedInventory = inventoryStock - quantity;

                var query = connection.query(
                  "UPDATE products SET ? WHERE ?",
                  [
                    {
                      stock_quantity: updatedInventory
                    },
                    {
                      item_id: item
                    }
                  ],
                  function(err, result) {
                    console.log(
                      "Your total is $" +
                        (quantity * itemPrice).toFixed(2) +
                        ". Please pay the piper. Thank you!"
                    );
                    console.log(
                      "----------------------------------------------------------------"
                    );
                    continueShopping();
                  }
                );
              }
            } else {
              console.log("I'm sorry. We do not have that in stock.");
              console.log(
                "-----------------------------------------------------------"
              );
              continueShopping();
            }
          }

          // After any transaction, ask if customer wants to keep on shopping. If so, run queryAllProducts function again to restart shopping experience.
          function continueShopping() {
            inquirer
              .prompt([
                {
                  type: "confirm",
                  message: "Would you like to continue shopping?",
                  name: "continue"
                }
              ])
              .then(function(answers) {
                if (answers.continue) {
                  queryAllProducts();
                } else {
                  console.log("Thanks for shopping! See you again next time!");
                  connection.end();
                }
              });
          }
        }
      );
    });
}
