import OrderPage from './pages/OrderPage';
import OrdersListPage from './pages/OrdersListPage';
import GalleryPage from './pages/GalleryPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <Router>
            <nav style={{textAlign: 'center', margin: '20px'}}>
                <Link to="/">🏠 Strona główna</Link> |
                <Link to="/gallery">🖼️ Galeria</Link> |
                <Link to="/order">📋 Zamów tort</Link> |
                <Link to="/orders">📋 Zobacz zamówienia</Link>
            </nav>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/gallery" element={<GalleryPage/>}/>
                <Route path="/order" element={<OrderPage/>}/>
                <Route path="/orders" element={<OrdersListPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
