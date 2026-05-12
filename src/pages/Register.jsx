import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Когда бэкенд будет готов, раскомментируй строку ниже:
      // await axios.post('http://localhost:5000/api/auth/register', formData);
      alert("Аккаунт успешно создан! Теперь войдите в систему.");
      navigate('/login');
    } catch (err) {
      alert("Ошибка при регистрации. Возможно, такой email уже занят.");
    }
  };

  return (
    <div className="auth-card">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '50%', color: 'var(--primary)' }}>
          <UserPlus size={32} />
        </div>
      </div>
      
      <h2 style={{ marginBottom: '0.5rem' }}>Создать аккаунт</h2>
      <p style={{ color: 'var(--text-dim)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Зарегистрируйтесь, чтобы управлять проектами
      </p>

      <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '5px' }}>
            Ваше имя
          </label>
          <div style={{ position: 'relative' }}>
            <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-dim)' }} />
            <input 
              className="input-field" 
              style={{ paddingLeft: '40px' }}
              type="text" 
              placeholder="Айганым" 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '5px' }}>
            Электронная почта
          </label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-dim)' }} />
            <input 
              className="input-field" 
              style={{ paddingLeft: '40px' }}
              type="email" 
              placeholder="example@mail.com" 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '5px' }}>
            Пароль
          </label>
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-dim)' }} />
            <input 
              className="input-field" 
              style={{ paddingLeft: '40px' }}
              type="password" 
              placeholder="••••••••" 
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-primary">
          Создать аккаунт
        </button>
      </form>

      <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
        Уже есть аккаунт? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Войти</Link>
      </p>
    </div>
  );
}