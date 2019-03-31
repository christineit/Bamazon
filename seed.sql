-- adding data will be seed commends that go in a separate seed file --
USE amazon_db;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Red Dress", "Women's Clothing", 49.99, 100),
("Men's Romper", "Men's Clothing", 79.99, 10),
("Skinny Jeans", "Women's Clothing", 99.99, 80),
("Sunglasses", "Accessories", 10.50, 70),
("Necklace", "Accessories", 9.99, 50),
("Pens", "Office", 5.25, 30),
("Washer", "Appliances", 599.90, 50),
("Dryer", "Appliances", 499.90, 60),
("Couch", "Furniture", 399.99, 20),
("Desk", "Furniture", 100.00, 50);

