import pytest
from app import app
from flask import json

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health_check(client):
    response = client.get('/')
    assert response.status_code == 200
    data = response.get_json()
    assert data == {"status": "OK"}

def test_add_order(client):
    new_order = {
        "name": "Tort czekoladowy",
        "cost": 120,
        "delivery_date": "2025-06-01"
    }
    response = client.post('/orders', json=new_order)
    assert response.status_code == 201
    data = response.get_json()
    assert "added successfully" in data["message"]

def test_get_orders(client):
    response = client.get('/orders')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)