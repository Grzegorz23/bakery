CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    cost DECIMAL(10, 2),
    delivery_date DATE
);