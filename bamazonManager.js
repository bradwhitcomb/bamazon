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
    
  });
}

function lowInventory(){

  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("The following items may need to be reordered soon");
    for (var i = 0; i < res.length; i++) {
    	if(res[i].stock_quantity < 50){console.log ("This item need possible reorder: " + res[i].item_id + " | " + res[i].product_name +  " | " + "Quantity on hand: "+res[i].stock_quantity);}	
    }
    
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
      // when finished prompting, insert a new item into the db with that info
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
          // re-prompt the user for if they want to bid or post
          
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



// connection.query("UPDATE products SET ? WHERE ?",
// 			 			[
// 			 				{
// 			 					stock_quantity: res.stock_quantity - answer.quantity,
// 			 				},
// 			 				{
// 			 					item_id: answer.item_id
// 			 				}
// 			 			], function ( err, results ) {
			 				
// 			 			});		

 // .then(function(answer) {
 //      // when finished prompting, insert a new item into the db with that info
 //      connection.query(
 //        "INSERT INTO auctions SET ?",
 //        {
 //          item_name: answer.item,
 //          category: answer.category,
 //          starting_bid: answer.startingBid,
 //          highest_bid: answer.startingBid
 //        },
 //        function(err) {
 //          if (err) throw err;
 //          console.log("Your auction was created successfully!");
 //          // re-prompt the user for if they want to bid or post
 //          start();
 //        }
 //      );
 //    });
// Create a new Node application called `bamazonManager.js`. Running this application will:

//   * List a set of menu options:

//     * View Products for Sale
    
//     * View Low Inventory
    
//     * Add to Inventory
    
//     * Add New Product

//   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

// - - -