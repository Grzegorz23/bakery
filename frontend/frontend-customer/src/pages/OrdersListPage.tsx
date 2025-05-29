import { useEffect, useState } from 'react';

interface Order {
    id?: number;
    name: string;
    cost: number;
    delivery_date: string;
}

function OrdersListPage() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await fetch('http://localhost:5000/orders');
            const data = await res.json();
            setOrders(data);
        };
        fetchOrders();
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Zamów Tort</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {orders.map(order => (
                    <li key={order.id}>
                        <strong>{order.name}</strong> – {order.cost} PLN – {order.delivery_date}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrdersListPage;
