import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      alert("Аккаунт создан!");
      navigate('/login');
    } catch (err) {
      alert("Ошибка регистрации");
    }
  };

  return (
    <div className="auth-card">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '50%', color: 'var(--primary)' }}>
          <UserPlus size={32} />
        </div>
      </div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
        <div style={{ position: 'relative' }}>
          <User size={18} style={{ position: 'absolute', left: '12px', top: '20px', color: 'var(--text-dim)' }} />
          <input className="input-field" style={{ paddingLeft: '40px' }} type="text" placeholder="Имя" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        </div>
        <div style={{ position: 'relative' }}>
          <Mail size={18} style={{ position: 'absolute', left: '12px', top: '20px', color: 'var(--text-dim)' }} />
          <input className="input-field" style={{ paddingLeft: '40px' }} type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        </div>
        <div style={{ position: 'relative' }}>
          <Lock size={18} style={{ position: 'absolute', left: '12px', top: '20px', color: 'var(--text-dim)' }} />
          <input className="input-field" style={{ paddingLeft: '40px' }} type="password" placeholder="Пароль" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        </div>
        <button type="submit" className="btn-primary">Создать аккаунт</button>
      </form>
      <p style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>Есть аккаунт? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Войти</Link></p>
    </div>
  );
}