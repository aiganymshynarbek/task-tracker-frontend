import { Folder, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const projects = [
    { id: 1, title: 'Веб-сайт магазина', tasks: 5 },
    { id: 2, title: 'Мобильное приложение', tasks: 12 },
    { id: 3, title: 'Дизайн системы', tasks: 3 }
  ];

  return (
    <div style={{padding: '20px'}}>
      <h1 style={{marginBottom: '30px'}}>Проекты команды</h1>
      <div className="project-grid">
        {projects.map(p => (
          <div key={p.id} className="card">
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', color: 'var(--primary)'}}>
              <Folder size={24} />
              <h3 style={{margin: 0}}>{p.title}</h3>
            </div>
            <p style={{color: 'var(--text-dim)', fontSize: '0.9rem'}}>Количество задач: {p.tasks}</p>
            <Link to={`/tasks/${p.id}`} style={{
              marginTop: '15px',
              color: 'var(--primary)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '5px', 
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              Смотреть задачи <ArrowRight size={16}/>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}