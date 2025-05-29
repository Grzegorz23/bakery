import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import "../App.css";

interface Cake {
    name: string;
    price: number;
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

function AddCakeModal() {
    const [form, setForm] = useState<Cake>({name: '', price: 0});
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('http://localhost:5000/cakes/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form),
        });
        //navigate('/add');
    };


    return (
        <div style={modalStyle}>
            <h2>Dodaj Tort</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Nazwa" required/><br/>
                <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Cena" required/>
                <br/>
                <br/>
                <button type="submit">Dodaj</button>
                <button type="button" onClick={() => navigate('/orders')} style={{marginLeft: '10px'}}>Anuluj</button>
            </form>
        </div>
    );
}

export default AddCakeModal;
