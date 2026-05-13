import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CreateProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Отправляем запрос на создание проекта
      const res = await api.post('/projects', { title, description });
      alert("Проект создан!");
      // После создания переходим на главную
      navigate('/'); 
    } catch (err) {
      console.error(err.response?.data);
      alert("Ошибка при создании проекта");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Создать новый проект</h2>
        <form onSubmit={handleSubmit}>
          <input 
            className="input-field"
            placeholder="Название проекта"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea 
            className="input-field"
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" className="btn-primary">Создать проект</button>
        </form>
      </div>
    </div>
  );
}