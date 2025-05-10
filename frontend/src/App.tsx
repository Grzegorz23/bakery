import React, {type CSSProperties, useEffect, useState} from 'react';

interface Order {
    id?: number;
    name: string;
    cost: number;
    delivery_date: string;
}

const centerStyle: CSSProperties = {
    position: 'relative',
        left: '50%',
        transform: 'translate(-50%, -50%)'}

const Button = () => <button id="add_button" type="submit" style={centerStyle}>Dodaj</button>;



function App() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [form, setForm] = useState<Order>({
        name: '',
        cost: 0,
        delivery_date: '',
    });

    const fetchOrders = async () => {
        const res = await fetch('http://localhost:5000/orders');
        const data = await res.json();
        setOrders(data);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        setForm({ name: '', cost: 0, delivery_date: '' });
        await fetchOrders();
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <h1 style={centerStyle}>Dodaj zamówienie </h1>
            <form onSubmit={handleSubmit}>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Nazwa" style={centerStyle}
                       required/>
                <br/>
                <input name="cost" type="number" value={form.cost} onChange={handleChange} style={centerStyle}
                       required/>
                <br/>
                <input name="delivery_date" type="date" value={form.delivery_date} onChange={handleChange}
                       style={centerStyle}
                       required/>
                <br/>
                <br/>
                <Button/>
            </form>

            <h2 style={centerStyle}>Zamówienia</h2>
            <br/>
            <ul style={centerStyle}>
                {orders.map(order => (
                    <li key={order.id} style={centerStyle}>
                        {order.name} - {order.cost} PLN - {order.delivery_date}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
