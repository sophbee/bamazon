DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(200) NOT NULL,
  department_name VARCHAR(200),
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER NOT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bamboo Dinner Table", "Furniture", 99.99, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gazebo", "Outdoor Furniture", 50.57, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coupe Cocktail Glass", "Drinkware", 12.99, 55);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Helena Sage Linen Napkins", "Dinnerware", 2.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DualZone Cuisinart Wine Cooler", "Kitchen", 235.67, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Platform shoes", "Shoes", 67.89, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog food", "Pets", 57.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Dove Soap", "Bath", 2.45, 1500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Heavy Duty Stainless Steel Whisk", "Kitchen", 15.78, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tangerines", "Produce", 0.99, 5700);