import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Blessings from './Blessings';
import Videos from './pages/VideosPage';
import Admin from './Admin';
import EditStudyGroup from './EditStudyGroup';
// Uncomment these if you have the components for them
/* import Testimony from './Testimony'; */
/* import StudyGroups from './StudyGroups'; */
/* import Faqs from './Faqs'; */

const HomePage: React.FC = () => {
  return (
    <div className="container">
      {/* Welcome Section */}
      <h1 className="welcome">Welcome</h1>

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

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default HomePage route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/edit/:id" element={<EditStudyGroup />} />

        {/* Other Routes */}
        <Route path="/blessings" element={<Blessings />} />
        <Route path="/videos" element={<Videos />} />
        {/* Uncomment these when you have the components ready */}
        {/* <Route path="/testimony" element={<Testimony />} /> */}
        {/* <Route path="/study-groups" element={<StudyGroups />} /> */}
        {/* <Route path="/faqs" element={<Faqs />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
