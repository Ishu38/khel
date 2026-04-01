import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './hooks/useAuth.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import Create from './pages/Create.jsx';
import Play from './pages/Play.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Editor from './pages/Editor.jsx';
import Assets from './pages/Assets.jsx';
import Leaderboards from './pages/Leaderboards.jsx';
import Multiplayer from './pages/Multiplayer.jsx';
import TeacherDashboard from './pages/TeacherDashboard.jsx';
import Progress from './pages/Progress.jsx';
import LearningGaps from './pages/LearningGaps.jsx';
import Subscription from './pages/Subscription.jsx';
import Contact from './pages/Contact.jsx';
import ChatBot from './components/ChatBot.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <main style={{ flex: 1, minHeight: 'calc(100vh - var(--nav-height))' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
            <Route path="/editor" element={<ProtectedRoute><Editor /></ProtectedRoute>} />
            <Route path="/editor/:id" element={<ProtectedRoute><Editor /></ProtectedRoute>} />
            <Route path="/assets" element={<ProtectedRoute><Assets /></ProtectedRoute>} />
            <Route path="/play/:id" element={<Play />} />
            <Route path="/multiplayer/:id" element={<Multiplayer />} />
            <Route path="/leaderboards" element={<Leaderboards />} />
            <Route path="/leaderboards/:gameId" element={<Leaderboards />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/teacher" element={<ProtectedRoute roles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
            <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
            <Route path="/progress/:childId" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
            <Route path="/learning-gaps/:childId" element={<ProtectedRoute><LearningGaps /></ProtectedRoute>} />
<Route path="/subscription" element={<Subscription />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </BrowserRouter>
    </AuthProvider>
  );
}
