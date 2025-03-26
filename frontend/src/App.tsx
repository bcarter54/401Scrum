import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Blessings from './Blessings';
import Videos from './pages/VideosPage';
import Admin from './Admin';
import EditStudyGroup from './EditStudyGroup';
import Login from './Login';
import RequestScripture from './RequestScripture';
import RequestStudyGroup from './RequestStudyGroup';
import EditVerse from './EditVerse';
// Uncomment these if you have the components for them
/* import Testimony from './Testimony'; */
import StudyGroups from './StudyGroups';
import Faqs from './faqs';
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="navbar">
      {/* Logo on the left */}
      <img src="/images/logo.jpg" alt="Logo" className="logo" />
      {/* Hamburger Icon */}
      <div
        className={`hamburger ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/* Navbar Links */}
      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link
          to="/Blessings"
          className="nav-link"
          onClick={() => setIsOpen(false)}
        >
          Blessings
        </Link>
        <Link
          to="/testimony"
          className="nav-link"
          onClick={() => setIsOpen(false)}
        >
          Testimony
        </Link>
        <Link
          to="/study-groups"
          className="nav-link"
          onClick={() => setIsOpen(false)}
        >
          Study Groups
        </Link>
        <Link
          to="/videos"
          className="nav-link"
          onClick={() => setIsOpen(false)}
        >
          Videos
        </Link>
        <Link to="/faqs" className="nav-link" onClick={() => setIsOpen(false)}>
          FAQs
        </Link>
      </div>
    </nav>
  );
};
// Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; 2025 Stalwart Saints. All Rights Reserved.</p>
    </footer>
  );
};
// HomePage Component
const HomePage: React.FC = () => {
  return (
    <div className="container">
      {/* Welcome Section */}
      <h1 className="welcome">Stalwart Saints</h1>
      {/* Image of Christ */}
      <div className="image-box">
        <img src="/images/christ.jpg" alt="Christ" />
      </div>
      {/* Links Section */}
      <div className="grid-container">
        <Link to="/blessings" className="link-box">
          <img src="/images/book-of-mormon.jpg" alt="Book of Mormon" />
          <h2>Blessings</h2>
        </Link>
        <Link to="/testimony" className="link-box">
          <img src="/images/testimony.jpg" alt="Testimony" />
          <h2>Testimony</h2>
        </Link>
        <Link to="/study-groups" className="link-box">
          <img src="/images/study-groups.jpg" alt="Study Groups" />
          <h2>Study Groups</h2>
        </Link>
        <Link to="/videos" className="link-box">
          <img src="/images/videos.jpg" alt="Videos" />
          <h2>Videos</h2>
        </Link>
        <Link to="/faqs" className="link-box">
          <img src="/images/faqs.jpg" alt="FAQs" />
          <h2>FAQs</h2>
        </Link>
      </div>
    </div>
  );
};
// Main App Component
const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Default HomePage route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/edit/:studyGroupId" element={<EditStudyGroup />} />
        <Route path="/edit/pending/:verseId" element={<EditVerse/>} />

        {/* Other Routes */}
        <Route path="/blessings" element={<Blessings />} />
        <Route path="/request-scripture" element={<RequestScripture />} />
        <Route path="/videos" element={<Videos />} />
        {/* Uncomment these when you have the components ready */}
        {/* <Route path="/testimony" element={<Testimony />} /> */}
        <Route path="/study-groups" element={<StudyGroups />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/login" element={<Login />} />
        <Route path="request-group" element={<RequestStudyGroup/>} />
      </Routes>
      <Footer />
    </Router>
  );
};
export default App;
