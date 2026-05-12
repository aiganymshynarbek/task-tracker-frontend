import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, ChevronLeft } from 'lucide-react';

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px' }}>
        <ChevronLeft size={18} /> Назад к списку
      </button>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <span style={{ background: '#3b82f633', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>
            ID Проекта: {id}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#f59e0b' }}>
            <Clock size={16} /> В работе
          </span>
        </div>
        
        <h1 style={{ marginTop: 0 }}>Детальный обзор задач проекта</h1>
        <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
          На этой странице в будущем будут отображаться все задачи, подгруженные с бэкенда для проекта номер {id}. 
          Вы сможете менять их статус, назначать теги и удалять.
        </p>

        <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
          <button className="btn-primary" style={{ width: 'auto', padding: '10px 20px' }}>
            <CheckCircle size={18} style={{ marginRight: '8px' }} /> Завершить проект
          </button>
        </div>
      </div>
    </div>
  );
}