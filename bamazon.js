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
  productDisplay();
  
});

function productDisplay() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    console.log("HERE ARE OUR CURRENT PRODUCTS AND PRICES");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].stock_quantity + " " + res[i].product_name + " | " + "$"+res[i].price);
    }
    userMode();
  });
}
function userMode(){
	inquirer
	.prompt([{
		name: "item_id",
		type: "input",
		message: "Enter the id of the item you'd like to view."
	},	
	{
		name: "quantity",
		type: "input",
		message: "What quantity would you like to check?"
	}
	])
 	.then(function(answer){
 		var query = "SELECT product_name, price, stock_quantity FROM products WHERE ?";
 		connection.query (query, {item_id: answer.item_id}, function(err, res){
 				if (answer.quantity > res[0].stock_quantity){
 					console.log ("Insufficient quantity on-hand!! Re-try");
 					userMode();
 				} else {
 					console.log("You hit the else statement")
 					console.log(answer);
 					console.log( "You have selected "+answer.quantity+" "+ res[0].product_name + " at a unit price of $" + res[0].price + " for a total cost of $"+answer.quantity*res[0].price+".");
			 	
			 		var query = "UPDATE products SET ? WHERE ?";
			 		
			 		connection.query("UPDATE products SET ? WHERE ?",
			 			[
			 				{
			 					stock_quantity: res[0].stock_quantity - answer.quantity,
			 				},
			 				{
			 					item_id: answer.item_id
			 				}
			 			], function ( err, results ) {
			 				
			 			});		
			 	}		
			
		});

 	});
 }

