var mysql = require("mysql");
var inquirer = require("inquirer")
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
 
runSearch();

  
});



function productsForSale(){

  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("HERE ARE OUR CURRENT PRODUCTS AND PRICES");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + "per unit price: $"+res[i].price + " | " + "Quantity on hand: "+res[i].stock_quantity);
    }
    runSearch();
  });

}

function lowInventory(){

  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("The following items may need to be reordered soon");
    for (var i = 0; i < res.length; i++) {
    	if(res[i].stock_quantity < 5){console.log ("This item need possible reorder: " + res[i].item_id + " | " + res[i].product_name +  " | " + "Quantity on hand: "+res[i].stock_quantity);}	
      
    }
    runSearch();
  });
}
 
function addToInventory(){
	inquirer
	.prompt([{
		name: "item_id",
		type: "input",
		message: "Enter the id of the item you'd like to increase."
	},	
	{
		name: "quantity",
		type: "input",
		message: "How much would you like to add to the inventory level?"
	}
	])

 	.then(function(answer){
    var query = "SELECT product_name, price, stock_quantity FROM products WHERE ?";
    connection.query (query, {item_id: answer.item_id, }, function(err, res){      
          console.log( "You wish to add "+answer.quantity+" "+ res[0].product_name + " into inventory");
        
          var query = "UPDATE products SET ? WHERE ?";
          
          connection.query("UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: res[0].stock_quantity + parseInt(answer.quantity),
              },
              {
                item_id: answer.item_id
              }
            ], function ( err, results ) {
              console.log("You have successfully added to inventory"

                );
              runSearch();
            });         
    });
    
});

}

function newProduct() {
  
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the new product you'd like to add?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many units would you like to add to inventory?"
      },
      {
        name: "department",
        type: "input",
        message: "Which department?"
      },
      {
        name: "price",
        type: "input",
        message: "What price?",
        validate: function(value) {
          
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.item,
          stock_quantity: answer.quantity,
          department_name: answer.department,
          price: answer.price
        
        },
        function(err) {
          if (err) throw err;
          console.log("Your product was created successfully!");
          runSearch();
        }

      );
    });
}


function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View products for sale",
        "View low inventory",
        "Add new inventory",
        "Add new product"
        
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View products for sale":
          productsForSale();
          break;

        case "View low inventory":
          lowInventory();
          break;

        case "Add new inventory":
          addToInventory();
          break;

        case "Add new product":
          newProduct();
          break;

        
      }
    });
}



