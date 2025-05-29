import AdminCakesPage from './pages/AdminCakesPage.tsx';
import AdminAddonsPage from './pages/AdminAddonsPage.tsx';
import AdminOrdersPage from './pages/AdminOrdersPage.tsx';
import AddCakeModal from './pages/AddCakeModal.tsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <Router>
            <nav style={{textAlign: 'center', margin: '20px'}}>
                <Link to="/cakes/add">➕ Dodaj tort</Link> |
                <Link to="/admin/cakes">Torty</Link> |
                <Link to="/admin/addons">Dodatki</Link> |
                <Link to="/admin/orders">Zamówienia</Link>
            </nav>
            <Routes>
                <Route path="/cakes/add" element={<AddCakeModal/>}/>
                <Route path="/admin/cakes" element={<AdminCakesPage/>}/>
                <Route path="/admin/addons" element={<AdminAddonsPage/>}/>
                <Route path="/admin/orders" element={<AdminOrdersPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
