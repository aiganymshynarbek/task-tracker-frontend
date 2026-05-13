import React, { useState, useEffect } from 'react';
import { Folder, ArrowRight, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Загружаем реальные проекты из базы данных
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке проектов:", err.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {/* Шапка с кнопкой создания */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px' 
      }}>
        <h1 style={{ margin: 0 }}>Проекты команды</h1>
        <button 
          onClick={() => navigate('/create-project')} 
          className="btn-primary" 
          style={{ width: 'auto', display: 'flex', gap: '8px', padding: '10px 20px' }}
        >
          <Plus size={20} /> Создать проект
        </button>
      </header>

      {loading ? (
        <p style={{ textAlign: 'center', color: 'var(--text-dim)' }}>Загрузка проектов...</p>
      ) : (
        <div className="project-grid">
          {projects.length === 0 ? (
            <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-dim)' }}>
              Проектов пока нет. Создайте первый!
            </p>
          ) : (
            projects.map(p => (
              <div key={p._id} className="card">
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  marginBottom: '15px', 
                  color: 'var(--primary)' 
                }}>
                  <Folder size={24} />
                  <h3 style={{ margin: 0 }}>{p.title}</h3>
                </div>
                
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                  {p.description || "Нет описания"}
                </p>

                {/* Используем p._id из MongoDB вместо p.id */}
                <Link to={`/tasks/${p._id}`} style={{
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
            ))
          )}
        </div>
      )}
    </div>
  );
}