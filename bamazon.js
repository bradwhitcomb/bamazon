var mysql = require("mysql");
var inquirer = require("inquirer")
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  //afterConnection();
  userMode();
});

// function afterConnection() {
//   connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//     //console.log("HERE ARE OUR CURRENT PRODUCTS AND PRICES");
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
//     }
   
//     //connection.end();
//   });
  
// }


function userMode(){
	inquirer
	.prompt([{
		name: "item_id",
		type: "input",
		message: "Enter the id of the item you'd like to buy."
	},	
	{
		name: "quantity",
		type: "input",
		message: "How many would you like to buy?"
	}

	])
 	.then(function(answer){
 		var query = "SELECT product_name, price, stock_quantity FROM products WHERE ?";
 		connection.query (query, {item_id: answer.item_id}, function(err, res){
 			for (i = 0; i < res.length; i ++){
 				console.log( "You have selected "+answer.quantity+" "+ res[i].product_name + " at a unit price of $" + res[i].price + " for a total cost of $"+answer.quantity*res[i].price+".");
 				
 			}
 		});


 	});
 }

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.