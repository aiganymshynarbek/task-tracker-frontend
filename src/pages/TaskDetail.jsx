import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Plus, CheckCircle, Circle, Trash2, X } from 'lucide-react';

export default function TaskDetail() {
  const { id } = useParams(); // Это ID проекта из URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // 1. Исправленный запрос на получение задач (используем Query-параметр)
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

  // 2. Исправленное добавление задачи
  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      // Напарник ждет минимум 2 символа в title
      const res = await api.post('/tasks', { 
        title: newTask, 
        projectId: id,
        status: 'Todo' // Явно указываем начальный статус
      });
      setTasks([res.data, ...tasks]);
      setNewTask('');
      setIsModalOpen(false);
    } catch (err) {
      console.error("Ошибка создания:", err.response?.data);
      alert(err.response?.data?.message || "Ошибка при создании задачи. Убедитесь, что ID проекта верный.");
    }
  };

  // 3. Исправленное переключение статуса (используем PUT и статус из модели)
  const toggleTask = async (task) => {
    try {
      const newStatus = task.status === 'Done' ? 'Todo' : 'Done';
      // Используем PUT, так как напарник не прописал PATCH
      const res = await api.put(`/tasks/${task._id}`, { 
        status: newStatus 
      });
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

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Задачи проекта</h1>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ width: 'auto', display: 'flex', gap: '8px' }}>
          <Plus size={20} /> Добавить
        </button>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {tasks.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-dim)' }}>Задач пока нет</p>}
        {tasks.map(task => (
          <div key={task._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div onClick={() => toggleTask(task)} style={{ cursor: 'pointer', display: 'flex' }}>
                {task.status === 'Done' ? <CheckCircle color="#10b981" /> : <Circle color="#94a3b8" />}
              </div>
              <span style={{ 
                textDecoration: task.status === 'Done' ? 'line-through' : 'none', 
                color: task.status === 'Done' ? '#94a3b8' : 'inherit' 
              }}>
                {task.title}
              </span>
            </div>
            <button onClick={() => deleteTask(task._id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="auth-card" style={{ margin: 0, position: 'relative', width: '90%', maxWidth: '400px' }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', right: '15px', top: '15px', background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
            <h2 style={{ marginTop: 0 }}>Новая задача</h2>
            <form onSubmit={addTask}>
              <input 
                className="input-field" 
                placeholder="Что нужно сделать?" 
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value)} 
                autoFocus 
              />
              <button type="submit" className="btn-primary" style={{ marginTop: '15px' }}>Создать задачу</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// // import API from '../services/api'; // Импортируем наш настроенный axios
// import axios from 'axios';
// import { Plus, CheckCircle } from 'lucide-react';

// export default function TaskDetail() {
//   const { id } = useParams();
//   const [tasks, setTasks] = useState([]);
//   const [taskTitle, setTaskTitle] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Загружаем задачи этого проекта с бэкенда
//   useEffect(() => {
//     API.get(`/projects/${id}/tasks`)
//       .then(res => setTasks(res.data))
//       .catch(err => console.log("Ошибка загрузки задач"));
//   }, [id]);

//   const handleAddTask = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post('/tasks', { 
//         title: taskTitle, 
//         projectId: id 
//       });
//       setTasks([...tasks, res.data]); // Добавляем новую задачу в список
//       setTaskTitle('');
//       setIsModalOpen(false); // Закрываем модалку
//     } catch (err) {
//       alert("Не удалось добавить задачу");
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <h1>Задачи проекта</h1>
//         <button 
//           onClick={() => setIsModalOpen(true)}
//           className="btn-primary" 
//           style={{ width: 'auto', display: 'flex', gap: '8px' }}
//         >
//           <Plus size={20} /> Новая задача
//         </button>
//       </div>

//       {/* Модальное окно (Интерактивный элемент №2) */}
//       {isModalOpen && (
//         <div style={{
//           position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
//           background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
//         }}>
//           <div className="auth-card" style={{ marginTop: 0 }}>
//             <h3>Добавить задачу</h3>
//             <form onSubmit={handleAddTask}>
//               <input 
//                 className="input-field"
//                 placeholder="Что нужно сделать?"
//                 value={taskTitle}
//                 onChange={(e) => setTaskTitle(e.target.value)}
//                 required
//               />
//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <button type="submit" className="btn-primary">Создать</button>
//                 <button 
//                   type="button" 
//                   onClick={() => setIsModalOpen(false)}
//                   style={{ background: '#e2e8f0', color: '#64748b', border: 'none', borderRadius: '10px', padding: '10px', cursor: 'pointer', flex: 1 }}
//                 >
//                   Отмена
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="project-grid">
//         {tasks.map(task => (
//           <div key={task._id} className="card" style={{ display: 'flex', justifyContent: 'space-between' }}>
//             <span>{task.title}</span>
//             <CheckCircle size={20} color="var(--text-dim)" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }