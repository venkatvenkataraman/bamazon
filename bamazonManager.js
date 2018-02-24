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
  displayManagerMenu();
});

var itemIDG;
var itemUnitsG;
var itemPriceG;
var productTableG;
var updatedStockQuantityG;


  function displayManagerMenu() {
    inquirer
      .prompt([{
        type: "list",
        name: "managerMenu",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "Quit"
        ]
      }])
      .then(function(answer) {
        switch (answer.managerMenu) {
          case "View Products for Sale":
            displayProducts();
            break;
  
          case "View Low Inventory":
            displayProductsOnLowInventory();
            break;
  
          case "Add to Inventory":
            addToInventory();
            break;
  
          case "Add New Product":
            addNewProduct();
            break;

          case "Quit": quit();
        }
      });
  }

  function displayProducts(){
      console.log("Selecting all products...\n");
      // connection.query("SELECT item_id, product_name, price FROM products", 
      connection.query("SELECT * FROM products", 
      function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("\n");
        console.table(res);
        displayManagerMenu();
      });
  }

  function displayProductsOnLowInventory(){
    console.log("Selecting low inventory products (available units less than 25)...\n");
    // connection.query("SELECT item_id, product_name, price FROM products", 
    connection.query("SELECT * FROM products WHERE (stock_quantity<25)", 
    function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log("\n");
      console.table(res);
      displayManagerMenu();
    });
  }

  function addToInventory(){
    inquirer
    .prompt([{
      name: "itemID",
      type: "input",
      message: "Provide the ID of the product you would like to add inventory for:",
      validate: function validateItemID(input) {
          // var regEx = new RegExp(/^(?[1-9]\d*|0)$/);
          var regEx = new RegExp(/^[1-9]{1,6}$/);
          if (regEx.test(input)) {
              // if (input > productTableG.length) {
              //     console.log(" ERROR: There is no such ID. Please enter a valid ID within the displayed range!");
              //     return false;
              // }
              itemIDG = input;
              return true;
          } else {
              console.log(' ERROR: Please enter a valid ID "Number" within the range!');
              return false;
          }
      }
    },
    {
      name: "itemUnits",
      type: "input",
      message: "How many units of the product needs to be added(+) or subtracted(-)?",
      validate: function validateItemID(input) {
          var regEx = new RegExp(/^[+\-]?\d+$/);
          if (regEx.test(input)) {
            var addOrSubtract = input.split("")[0];
            console.log("\n ", addOrSubtract);
            var unitsArr = [];
            var unitsStr;
            var unitsNum;
            switch (addOrSubtract) {
              case "+": 
                // console.log("It is a + case");
                for (let index = 1; index < input.split("").length; index++) {
                  unitsArr.push(input.split("")[index]);
                }
                unitsStr=unitsArr.join('');
                unitsNum = parseInt(unitsStr);
                //Add to inventory
                break;
      
              case "-":
                // console.log("It is a - case");
                for (let index = 1; index < input.split("").length; index++) {
                  unitsArr.push(input.split("")[index]);
                }
                unitsStr=unitsArr.join('');
                unitsNum = parseInt(unitsStr);
                //subtract from inventory
                break;

              case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": 
                // console.log("It is a Number case");
                for (let index = 0; index < input.split("").length; index++) {
                  unitsArr.push(input.split("")[index]);
                }
                unitsStr=unitsArr.join('');
                unitsNum = parseInt(unitsStr);
                addOrSubtract = "+";
                //Add to inventory
                break;
            } //switch statement
            //love notes to ourselves
            // console.log("\n the UnitsArray", unitsArr);
            // console.log("\n Parsed sign = ", addOrSubtract);
            // console.log("\n Parsed number = ", unitsNum );
            return true;
        } //regex test
      } //validate
    }//this object
    ]) //inquirer .prompt
    .then(function(addOrSubtract, unitsNum) {
      console.log("Updating item quantities...at item_id " + itemIDG + "\n");
      connection.query("SELECT * FROM products WHERE (item_id='itemIDG')", 
        function (err, res) {
            if (err) {console.log("First error spot!"); throw err;}
            console.log(res);
            switch (addOrSubtract) {
              case "+":  updatedStockQuantityG = res.stock_quantity + unitsNum;
                         break;

              case "-":  updatedStockQuantityG = res.stock_quantity - unitsNum;
                         break;
            }
            var query = connection.query(
               "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: updatedStockQuantityG
                  },
                  {
                    item_id: itemIDG
                  }
                ],
                function(err, res) {
                      // if (err) throw err;
                      if (err) {console.log("Second error spot!"); throw err;}
                      console.log(res.affectedRows + " Products updated!\n");
                      displayManagerMenu();
                  }
              ); //var query
        }

        ); //connection.query
    })//.then(function(addOrSubtract...))
  }  //function addToInventory

  function addNewProduct(){
    inquirer
    .prompt([{
        name: "productName",
        type: "input",
        message: "Provide the name of the product you would like to add: "
      },
      {
        name: "departmentName",
        type: "input",
        message: "Provide the name of the department where product will reside: " 
      },
      {
        name: "price",
        type: "input",
        message: "Provide the price of the product: " 
      },
      {
        name: "quantity",
        type: "input",
        message: "Provide the stock quantity: " 
      }
    ]) //inquirer .prompt
   .then (function (answer) {
    //take some action
    console.log("Inserting a new product...\n");
    var query = connection.query(
         "INSERT INTO products SET ?",
        {
          product_name: answer.productName,
          department_name: answer.departmentName,
          price: answer.price,
          stock_quantity: answer.quantity
        },
          function(err, res) {
            console.log(res.affectedRows + " product inserted!\n");
            displayManagerMenu();
          }
  ); //connection.query
}); //.then
} //addNewProduct()

  function quit(){
    connection.end();
  }
