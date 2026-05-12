import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { LayoutDashboard, LogIn, UserPlus, LogOut, User as UserIcon } from 'lucide-react';
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import TaskDetail from './pages/TaskDetail';

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
      <nav className="navbar">
  <Link to="/" className="logo">
    <LayoutDashboard size={28} /> <span>TaskTracker</span>
  </Link>
  
  <div className="nav-links">
    {user ? (
      <>
        <Link to="/profile" style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
          <UserIcon size={20} /> Профиль
        </Link>
        <button onClick={logout} className="logout-btn">
          <LogOut size={18} /> 
          <span>Выйти</span>
        </button>
      </>
    ) : (
      <>
        <Link to="/login">Вход</Link>
        <Link to="/register" className="btn-primary" style={{padding: '10px 20px', width: 'auto'}}>Регистрация</Link>
      </>
    )}
  </div>
</nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;