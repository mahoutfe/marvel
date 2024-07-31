import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/App';

import './style/style.scss';

// отключаю предупреждение <<
const suppressedWarnings = ['Warning: findDOMNode is deprecated'];

const realConsoleError = console.error;
console.error = function (message, ...args) {
	if (
		typeof message === 'string' &&
		suppressedWarnings.some((warning) => message.includes(warning))
	) {
		return;
	}
	realConsoleError(message, ...args);
};
// >> отключаю предупреждение

// Получаем элемент с id 'root'
const container = document.getElementById('root');

// Создаем корень
const root = createRoot(container);

// Рендерим приложение
root.render(<App />);
