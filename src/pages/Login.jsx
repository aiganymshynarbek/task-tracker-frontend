import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Имитация ответа сервера для теста фронта
    login({ name: 'Aiganym', email });
    navigate('/profile');
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