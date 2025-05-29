import unittest
from unittest.mock import patch, MagicMock
from app import app
import json

class FlaskAppTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_health_check(self):
        response = self.app.get('/')
        self.assertEqual(200, response.status_code)
        self.assertEqual({"status": "OK"}, response.get_json())

    @patch('app.orders_engine')
    def test_get_orders(self, mock_engine):
        mock_conn = MagicMock()
        mock_engine.connect.return_value.__enter__.return_value = mock_conn
        mock_conn.execute.return_value = [(1, 'John', 'Doe', 'Chocolate', '2023-12-01')]

        response = self.app.get('/orders')
        self.assertEqual(200, response.status_code)
        self.assertEqual([{
            "id": 1,
            "name": "John",
            "cost": "Doe",
            "taste": "Chocolate",
            "delivery_date": "2023-12-01"
        }], response.get_json())

    @patch('app.orders_engine')
    def test_add_order_success(self, mock_engine):
        mock_conn = MagicMock()
        mock_engine.connect.return_value.__enter__.return_value = mock_conn

        order_data = {
            "name": "Alice",
            "surname": "Smith",
            "taste": "Vanilla",
            "delivery_date": "2023-12-10"
        }

        response = self.app.post('/orders', data=json.dumps(order_data), content_type='application/json')
        self.assertEqual(201, response.status_code)
        self.assertIn("Order 'Alice' added successfully", response.get_json()['message'])

    def test_add_order_missing_fields(self):
        order_data = {"name": "Alice"}  # Missing surname and delivery_date
        response = self.app.post('/orders', data=json.dumps(order_data), content_type='application/json')
        self.assertEqual(400, response.status_code)
        self.assertIn("Missing required fields", response.get_json()['error'])

    @patch('app.cakes_engine')
    def test_get_cakes(self, mock_engine):
        mock_conn = MagicMock()
        mock_engine.connect.return_value.__enter__.return_value = mock_conn
        mock_conn.execute.return_value = [
            (1, 'Cheesecake', 25.0),
            (2, 'Brownie', 15.0)
        ]

        response = self.app.get('/cakes')
        self.assertEqual(200, response.status_code)
        self.assertEqual([
            {"id": 1, "name": "Cheesecake", "price": 25.0},
            {"id": 2, "name": "Brownie", "price": 15.0}
        ], response.get_json())

    @patch('app.cakes_engine')
    def test_add_cake_success(self, mock_engine):
        mock_conn = MagicMock()
        mock_engine.connect.return_value.__enter__.return_value = mock_conn

        cake_data = {
            "name": "Cheesecake",
            "price": 25.0
        }

        response = self.app.post('/cakes/add', data=json.dumps(cake_data), content_type='application/json')
        self.assertEqual(201, response.status_code)
        self.assertIn("Cake 'Cheesecake' added successfully", response.get_json()['message'])

    def test_add_cake_missing_fields(self):
        cake_data = {"name": "Brownie"}  # Missing price
        response = self.app.post('/cakes/add', data=json.dumps(cake_data), content_type='application/json')
        self.assertEqual(400, response.status_code)
        self.assertIn("Missing required fields", response.get_json()['error'])

    @patch('app.cakes_engine')
    def test_add_cake_success_old_endpoint(self, mock_engine):
        mock_conn = MagicMock()
        mock_engine.connect.return_value.__enter__.return_value = mock_conn

        cake_data = {
            "name": "Red Velvet",
            "price": 15.0
        }

        response = self.app.post('/cakes/add', data=json.dumps(cake_data), content_type='application/json')
        self.assertEqual(201, response.status_code)
        self.assertIn("Cake 'Red Velvet' added successfully", response.get_json()['message'])

if __name__ == '__main__':
    unittest.main()
