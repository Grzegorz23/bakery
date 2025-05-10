from flask import Flask, jsonify, request
from sqlalchemy import create_engine, text
import os
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

def get_database_url():
    if os.environ.get('FLASK_ENV') == 'testing':  # Użyj SQLite in-memory dla testów
        return 'sqlite:///:memory:'
    else:
        db_user = os.environ.get('DB_USER')
        db_password = os.environ.get('DB_PASSWORD')
        db_host = os.environ.get('DB_HOST')
        db_name = os.environ.get('DB_NAME')
        return f'postgresql://{db_user}:{db_password}@{db_host}/{db_name}'

def create_app_engine(url):
    return create_engine(url)

DATABASE_URL = get_database_url()
engine = create_app_engine(DATABASE_URL)

def init_db():
    with engine.connect() as conn:
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                cost INTEGER,
                delivery_date DATE
            );
        """))
    return engine

@app.route('/')
def health_check():
    return jsonify({"status": "OK"})

@app.route('/orders')
def get_items():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT id, name, cost, delivery_date FROM orders"))
        orders = [{"id": row[0], "name": row[1], "cost": row[2], "delivery_date": row[3]} for row in result]
    return jsonify(orders)


@app.route('/orders', methods=['POST'])
def add_item():
    data = request.get_json()
    name = data.get("name")
    cost = data.get("cost")
    delivery_date = data.get("delivery_date")

    if not name or not cost or not delivery_date:
        return jsonify({"error": "Missing required fields"}), 400

    with engine.connect() as conn:
        conn.execute(text("INSERT INTO orders (name, cost, delivery_date) VALUES (:name, :cost, :delivery_date)"),
                     {"name": name, "cost": cost, "delivery_date": delivery_date})
        conn.commit()

    return jsonify({"message": f"Order '{name}' added successfully"}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)