import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <AlertCircle size={64} color="var(--text-dim)" style={{ marginBottom: '20px' }} />
      <h1>404 - Страница не найдена</h1>
      <p style={{ color: 'var(--text-dim)' }}>Упс! Похоже, вы зашли не туда.</p>
      <Link to="/" className="btn-primary" style={{ display: 'inline-block', width: 'auto', marginTop: '20px', textDecoration: 'none' }}>
        Вернуться на главную
      </Link>
    </div>
  );
}