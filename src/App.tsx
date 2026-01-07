import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TextChatPage from './pages/TextChatPage';
import VideoChatPage from './pages/VideoChatPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/text" element={<TextChatPage />} />
        <Route path="/video" element={<VideoChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
