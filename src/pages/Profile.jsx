import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { User, Mail, ShieldCheck } from 'lucide-react';

export default function Profile() {
  const { user } = useContext(AuthContext);

  // Если юзер не вошел — отправляем его на логин (защита роута)
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="auth-card" style={{ maxWidth: '600px', textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
        <div style={{ background: 'var(--primary)', padding: '15px', borderRadius: '50%' }}>
          <User size={40} color="white" />
        </div>
        <div>
          <h2 style={{ margin: 0 }}>{user.name}</h2>
          <p style={{ color: 'var(--text-dim)', margin: 0 }}>Участник команды</p>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <Mail size={18} color="var(--text-dim)" />
          <span>{user.email}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={18} color="#10b981" />
          <span>Статус: Авторизован (Admin: false)</span>
        </div>
      </div>
    </div>
  );
}