import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Dropdown} from "../components/dropdown/Dropdown";
import "./../App.css";

interface Order {
    name: string;
    surname: string;
    taste: string;
    delivery_date: Date;
}

const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
};

interface Cake {
    id: string | number; // use correct type
    name: string;
    // ...other properties
}
function OrderPage() {
    const [form, setForm] = useState<Order>({name: '', surname: '', taste: '', delivery_date: new Date()});
    const [cakes, setCakes] = useState<Cake[]>([]);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form),
        });
        navigate('/orders');
    };


    useEffect(() => {
        fetch('http://localhost:5000/cakes') // change port if needed
            .then(response => response.json())
            .then(data => setCakes(data))
            .catch(error => console.error('Error fetching cakes:', error));
    }, []);

    const handleMenuOne = () => {
        console.log('clicked one');
    };

    return (<div style={modalStyle}>
            <h2>Zamów Tort</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Imie" required/><br/>
                <input name="surname" value={form.surname} onChange={handleChange} placeholder="Nazwisko" required/><br/>
                <input name="delivery_date" type="date" value={form.delivery_date.toDateString()} onChange={handleChange}
                       required/><br/>
                <br/>
                <Dropdown
                    dropdown_text={'Wybierz smak'}
                    menu=
                    {cakes.map(cake => (
                        <button key={cake.id} onClick={handleMenuOne}>
                            {cake.name}
                        </button>
                    ))}
                />
                <br/>
                <br/>
                <button type="submit">Dodaj</button>
                <button type="button" onClick={() => navigate('/orders')} style={{marginLeft: '10px'}}>Anuluj</button>
            </form>
        </div>
    );
}

export default OrderPage;
