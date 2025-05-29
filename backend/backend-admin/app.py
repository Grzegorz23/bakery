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

cakes_engine = create_app_engine('CAKES')

@app.route('/')
def health_check():
    return jsonify({"status": "OK"})

@app.route('/cakes/add', methods=['POST'])
def add_cake():
    data = request.get_json()
    name = data.get("name")
    price = data.get("price")
    if not name or not price:
        return jsonify({"error": "Missing required fields"}), 400
    with cakes_engine.connect() as conn:
        conn.execute(
            text("INSERT INTO cakes (name, price) VALUES (:name, :price)"),
            {"name": name, "price": price})
        conn.commit()
    return jsonify({"message": f"Cake '{name}' added successfully"}), 201

# TODO: Add endpoints for cake management, addons, admin order listing

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
