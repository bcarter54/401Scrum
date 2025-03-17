import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Blessings from './Blessings';
import Admin from './Admin';

function App() {
  return (
    <>
      <Router>
        <nav>
          <Link to="/">Home</Link> | <Link to="/new">New Page</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Blessings />} />
          <Route path="/new" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
