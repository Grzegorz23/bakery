from flask import Flask, jsonify, request
from sqlalchemy import create_engine, text
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_database_url(db_name):
    if os.environ.get('FLASK_ENV') == 'testing':
        return 'sqlite:///:memory:'
    else:
        db_user = os.environ.get(f'DB_{db_name}_USER')
        db_password = os.environ.get(f'DB_{db_name}_PASSWORD')
        db_host = os.environ.get(f'DB_{db_name}_HOST')
        db_name = os.environ.get(f'DB_{db_name}_NAME')
        return f'postgresql://{db_user}:{db_password}@{db_host}/{db_name}'

def create_app_engine(db_name):
    return create_engine(get_database_url(db_name))

orders_engine = create_app_engine('ORDERS')
cakes_engine = create_app_engine('CAKES')

@app.route('/')
def health_check():
    return jsonify({"status": "OK"})

@app.route('/orders')
def get_items():
    with orders_engine.connect() as conn:
        result = conn.execute(text("SELECT id, name, surname, taste, delivery_date FROM orders"))
        orders = [{"id": row[0], "name": row[1], "surname": row[2],"taste": row[3], "delivery_date": row[4]} for row in result]
    return jsonify(orders)

@app.route('/orders', methods=['POST'])
def add_item():
    data = request.get_json()
    name = data.get("name")
    surname = data.get("surname")
    taste = data.get("taste")
    delivery_date = data.get("delivery_date")
    if not name or not surname or not delivery_date:
        return jsonify({"error": "Missing required fields"}), 400
    with orders_engine.connect() as conn:
        conn.execute(text("INSERT INTO orders (name, surname, taste, delivery_date) VALUES (:name, :surname, :taste, :delivery_date)"),
                     {"name": name, "surname": surname, "taste": taste, "delivery_date": delivery_date})
        conn.commit()
    return jsonify({"message": f"Order '{name}' added successfully"}), 201

@app.route('/cakes')
def get_cakes():
    with cakes_engine.connect() as conn:
        result = conn.execute(text("SELECT id, name, price FROM cakes"))
        cakes = [{"id": row[0], "name": row[1], "price": row[2]} for row in result]
    return jsonify(cakes)

# TODO: Add endpoints for gallery, customer logic

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
