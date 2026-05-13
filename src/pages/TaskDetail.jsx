import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// Проверь, что lucide-react установлен! (npm install lucide-react)
import { Plus, CheckCircle, Circle, Trash2, X } from 'lucide-react';

export default function TaskDetail() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Изучить документацию', completed: false },
    { id: 2, title: 'Настроить окружение', completed: true },
  ]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task = { id: Date.now(), title: newTask, completed: false };
    setTasks([...tasks, task]);
    setNewTask('');
    setIsModalOpen(false);
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: 'var(--text-main)' }}>Задачи проекта #{id}</h1>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="btn-primary" 
          style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
        >
          <Plus size={20} /> Добавить задачу
        </button>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {tasks.map(task => (
          <div key={task.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div onClick={() => toggleTask(task.id)} style={{ cursor: 'pointer', display: 'flex' }}>
                {task.completed ? <CheckCircle color="#10b981" /> : <Circle color="#94a3b8" />}
              </div>
              <span style={{ 
                textDecoration: task.completed ? 'line-through' : 'none', 
                color: task.completed ? '#94a3b8' : 'inherit' 
              }}>
                {task.title}
              </span>
            </div>
            <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
          background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 
        }}>
          <div className="auth-card" style={{ margin: 0, position: 'relative', width: '90%', maxWidth: '400px' }}>
            <button 
              onClick={() => setIsModalOpen(false)} 
              style={{ position: 'absolute', right: '15px', top: '15px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
            <h2 style={{ marginTop: 0, color: 'var(--text-main)' }}>Новая задача</h2>
            <form onSubmit={addTask}>
              <input 
                className="input-field" 
                placeholder="Что нужно сделать?" 
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                autoFocus
                style={{ marginBottom: '20px' }}
              />
              <button type="submit" className="btn-primary">Создать</button>
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