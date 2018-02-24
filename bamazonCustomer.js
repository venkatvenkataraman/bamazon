var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Gautam10",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayProducts();
});

var itemIDG;
var itemUnitsG;
var itemPriceG;
var productTableG;
var updatedStockQuantityG;

function displayProducts() {
    console.log("Selecting all products...\n");
    // connection.query("SELECT item_id, product_name, price FROM products", 
    connection.query("SELECT * FROM products", 
    function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      // console.log(res);
      console.table(res);
      productTableG = res;
      // for (var i = 0; i < res.length; i++) {
      // console.Writeline(" | " + '("--{0,-10}--",res[i].item_id)' + " | " + res[i].product_name + " | " + res[i].price + " | ");
      // console.log("--{0,-10}--",res[i].item_id);
      //   }
      requestPurchaseItems();
    });
  }

  function requestPurchaseItems() {
    inquirer
      .prompt([{
        name: "itemID",
        type: "input",
        message: "Provide the ID of the product you would like to buy.",
        validate: function validateItemID(input) {
            // var regEx = new RegExp(/^(?[1-9]\d*|0)$/);
            var regEx = new RegExp(/^[1-9]{1,6}$/);
            if (regEx.test(input)) {
                if (input > productTableG.length) {
                    console.log(" ERROR: There is no such ID. Please enter a valid ID within the displayed range!");
                    return false;
                }
                itemIDG = input;
                return true;
            } else {
                console.log(' ERROR: Please enter a valid ID "Number" within the displayed range!');
                return false;
            }
        }
      },
      {
        name: "itemUnits",
        type: "input",
        message: "How many units of the product would you like to buy?",
        validate: function validateItemID(input) {
            // var regEx = new RegExp(/^(?[1-9]\d*|0)$/);
            var regEx = new RegExp(/^[0-9]{1,6}$/);
            if (regEx.test(input)) {
                if (input > productTableG[itemIDG-1].stock_quantity) {
                    console.log(" ERROR: Sorry! INSUFFICIENT QUANTITY! Your unit order exceeds the units we have available. Please enter a lower quantity!");
                    return false;
                }
                updatedStockQuantityG = (productTableG[itemIDG-1].stock_quantity - input);
                itemUnitsG = input;
                itemPriceG = productTableG[itemIDG-1].price;
                console.log ("\n Need to update stock qunatity to: ", updatedStockQuantityG );
                return true;
            } else {
                console.log(' ERROR: Please enter a valid unit quantity "Number" within the displayed range!');
                return false;
            }
        }
      }
      ])
      .then(function(answer) {
        var itemID = answer.itemID;
        var itemUnits = answer.itemUnits;
        console.log("Inputs captured", itemID, itemUnits);
        commitPurchaseItems(itemID, updatedStockQuantityG);
      });
  }

  function commitPurchaseItems(itemID, updatedStockQuantity){
        console.log("Updating the database for items purchased...\n");
        var query = connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: updatedStockQuantity
            },
            {
              item_id: itemID
            }
          ],
          function(err, res) {
            if (err) {
                console.log("Oops! An error in the database UPDATE operation!");
                throw err;
                //Try again until it goes through?
                // commitPurchaseItems(itemID, itemUnits, updatedStockQuantity);
            } else {
            console.log(res.affectedRows + " Product quantities of purchased item updated!\n");
            console.log("THE TOTAL COST OF YOUR PURCHASE IS: "+ itemUnitsG + " (Units) x $" 
                 + itemPriceG + " = $" + (itemUnitsG*itemPriceG));
            console.log("THANK YOU AND BUY AGAIN!");
            //Would they like to make another purchase?
            inquirer
              .prompt([{
                  name: "continue",
                  type: "input",
                  message: "Interested in making another purchase? Type yes (y) or no (n).",
                  validate: function(input) {
                            var regExYes = new RegExp(/(y(?:es)?|1)/);
                            var regExNo = new RegExp(/(n(?:o)?|1)/)
                            if (regExYes.test(input) || regExNo.test(input)){
                              return true;
                            } else {
                            return false;
                            } //if
                  } //validate
                }]) //.prompt
                .then (function(answer) {
                  switch (answer.continue.split("")[0]) {
                    case "y":
                      displayProducts();
                      break;
                    case "n":
                      connection.end();
                      return;
                  } //switch
                }) // .then
            

            //HOUSEKEEPING
            //Delete the product record if we find that updatedStockQuantityG happens to be 0.
            // if (updatedStockQuantityG === 0) {
                  
            // }
            // connection.end();
            // console.log("Below is the updated product and availability picture\n");
            // console.table(res);
            // console.log(res);
            }
          }
        );
      
        // logs the actual query being run
        console.log(query.sql);
      }
  