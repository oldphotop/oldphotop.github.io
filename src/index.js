import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Базовые стили (в основном для сброса или глобальных правил)
import App from './App';
import reportWebVitals from './reportWebVitals'; // Для отслеживания производительности

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Если вы хотите начать измерять производительность в вашем приложении,
// передайте функцию для логирования результатов (например: reportWebVitals(console.log))
// или отправьте их в аналитическую конечную точку. Узнайте больше: https://bit.ly/CRA-vitals
reportWebVitals();
