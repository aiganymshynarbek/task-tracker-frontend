import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data); // Сохраняем пользователя и токен
      navigate('/profile');
    } catch (err) {
      alert("Неверный логин или пароль");
    }
  };

  return (
    <div className="auth-card">
      <h2>С возвращением</h2>
      <form onSubmit={handleLogin}>
        <input className="input-field" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        <input className="input-field" type="password" placeholder="Пароль" onChange={e => setPassword(e.target.value)} required />
        <button className="btn-primary">Войти</button>
      </form>
    </div>
  );
}