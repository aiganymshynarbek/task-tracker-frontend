import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Plus, CheckCircle, Circle, Trash2, X, Filter } from 'lucide-react';

export default function TaskDetail() {
  const [searchQuery, setSearchQuery] = useState(''); 
  const [statusFilter, setStatusFilter] = useState('All'); 
  const [priorityFilter, setPriorityFilter] = useState('All'); 

  const { id } = useParams(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState(''); 
  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState('Medium'); 

  const getPriorityColor = (p) => {
    switch (p) {
      case 'High': return '#ef4444';   
      case 'Medium': return '#f59e0b'; 
      case 'Low': return '#3b82f6';    
      default: return '#94a3b8';
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get(`/tasks?projectId=${id}`);
        setTasks(res.data);
      } catch (err) {
        console.error("Ошибка загрузки задач:", err.response?.data);
      }
    };
    if (id) fetchTasks();
  }, [id]);

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const res = await api.post('/tasks', { 
        title: newTask, 
        description: description, 
        projectId: id,
        status: 'Todo',
        priority: priority 
      });
      setTasks([res.data, ...tasks]);
      setNewTask('');
      setDescription('');
      setPriority('Medium');
      setIsModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || "Ошибка при создании задачи");
    }
  };

  const toggleTask = async (task) => {
    try {
      const newStatus = task.status === 'Done' ? 'Todo' : 'Done';
      const res = await api.put(`/tasks/${task._id}`, { status: newStatus });
      setTasks(tasks.map(t => t._id === task._id ? res.data : t));
    } catch (err) {
      console.error("Не удалось обновить статус:", err.response?.data);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (err) {
      alert("Ошибка при удалении");
    }
  };

  const displayTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' ? true : task.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' ? true : task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: 0 }}>Задачи проекта</h1>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ width: 'auto', display: 'flex', gap: '8px' }}>
          <Plus size={20} /> Добавить
        </button>
      </header>

      <div style={{ marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* Поиск */}
        <input 
          className="input-field"
          placeholder="Поиск по названию..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* ПАНЕЛЬ ФИЛЬТРОВ В ОДНУ СТРОКУ */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          
          {/* Статус-фильтр */}
          <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '10px', gap: '4px' }}>
            {['All', 'Todo', 'Done'].map(f => (
              <button 
                key={f}
                onClick={() => setStatusFilter(f)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: statusFilter === f ? 'white' : 'transparent',
                  color: statusFilter === f ? 'var(--primary)' : '#64748b',
                  boxShadow: statusFilter === f ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: statusFilter === f ? '600' : '500',
                  transition: 'all 0.2s'
                }}
              >
                {f === 'All' ? 'Все' : f === 'Todo' ? 'В работе' : 'Готово'}
              </button>
            ))}
          </div>

          {/* Вертикальный разделитель */}
          <div style={{ width: '1px', height: '24px', background: '#e2e8f0', margin: '0 5px' }} />

          {/* Приоритет-фильтр (Select вместо кнопок) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
            <Filter size={16} />
            <select 
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: 'white',
                color: '#1e293b',
                fontSize: '0.85rem',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="All">Все приоритеты</option>
              <option value="High">Высокий</option>
              <option value="Medium">Средний</option>
              <option value="Low">Низкий</option>
            </select>
          </div>
        </div>
      </div>

      {/* Список задач */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {tasks.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-dim)' }}>Задач пока нет</p>}
        
        {displayTasks.map(task => (
          <div 
            key={task._id} 
            className="card" 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              borderLeft: `5px solid ${getPriorityColor(task.priority)}`,
              padding: '16px' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div onClick={() => toggleTask(task)} style={{ cursor: 'pointer', display: 'flex' }}>
                {task.status === 'Done' ? <CheckCircle color="#10b981" /> : <Circle color="#94a3b8" />}
              </div>
              <div>
                <span style={{ 
                  textDecoration: task.status === 'Done' ? 'line-through' : 'none', 
                  color: task.status === 'Done' ? '#94a3b8' : 'inherit',
                  display: 'block',
                  fontWeight: '500'
                }}>
                  {task.title}
                </span>
                {task.description && (
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0' }}>
                    {task.description}
                  </p>
                )}
                <span style={{ 
                  fontSize: '0.65rem', 
                  color: getPriorityColor(task.priority), 
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  background: `${getPriorityColor(task.priority)}15`,
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {task.priority}
                </span>
              </div>
            </div>
            
            <button onClick={() => deleteTask(task._id)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '5px' }}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}

        {displayTasks.length === 0 && tasks.length > 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
            <p>Задачи не найдены</p>
            <button onClick={() => {setStatusFilter('All'); setPriorityFilter('All'); setSearchQuery('')}} style={{ color: 'var(--primary)', border: 'none', background: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>

      {/* Модалка (без изменений в логике) */}
      {isModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div className="auth-card" style={{ margin: 0, position: 'relative', width: '90%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', right: '15px', top: '15px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X /></button>
            <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Новая задача</h2>
            <form onSubmit={addTask} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#475569', marginBottom: '6px', display: 'block' }}>НАЗВАНИЕ</label>
                <input className="input-field" placeholder="Что нужно сделать?" value={newTask} onChange={(e) => setNewTask(e.target.value)} autoFocus required />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#475569', marginBottom: '6px', display: 'block' }}>ОПИСАНИЕ</label>
                <textarea className="input-field" placeholder="Детали задачи..." value={description} onChange={(e) => setDescription(e.target.value)} style={{ minHeight: '80px', resize: 'none' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#475569', marginBottom: '6px', display: 'block' }}>ПРИОРИТЕТ</label>
                <select className="input-field" value={priority} onChange={(e) => setPriority(e.target.value)} style={{ cursor: 'pointer' }}>
                  <option value="Low">Низкий (Low)</option>
                  <option value="Medium">Средний (Medium)</option>
                  <option value="High">Высокий (High)</option>
                </select>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '10px', height: '45px' }}>Создать задачу</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
