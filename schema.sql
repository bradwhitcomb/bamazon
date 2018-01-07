DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(13,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("long underwear", "clothing", 95.00, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tents", "camping", 325.00, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mountain-bikes", "bikes", 1250.00, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pants", "clothing", 120.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sleeping bags", "camping", 59.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cycling shorts", "bikes", 95.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("outer wear", "clothing", 115.25, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("boots", "clothing", 230.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("headlamps", "camping", 49.95, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("road bike helmets", "bikes", 120.00, 70);





SELECT * FROM products;




2. Then create a Table inside of that database called `products`.

3. The products table should have each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
