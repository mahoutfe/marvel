import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/App';

import './style/style.scss';

// Получаем элемент с id 'root'
const container = document.getElementById('root');

// Создаем корень
const root = createRoot(container);

// Рендерим приложение
root.render(<App />);
