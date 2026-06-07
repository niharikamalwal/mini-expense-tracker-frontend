import React, { useState, useEffect } from 'react';

const themes = [
  { name: 'Purple', color: '#667eea', value: 'purple' },
  { name: 'Pink', color: '#f5576c', value: 'pink' },
  { name: 'Green', color: '#48bb78', value: 'green' },
  { name: 'Maroon', color: '#800000', value: 'maroon' },
  { name: 'Red', color: '#ee5a24', value: 'red' },
  { name: 'Blue', color: '#4facfe', value: 'blue' },
  { name: 'Brown', color: '#8b5a2b', value: 'brown' },
  { name: 'Yellow', color: '#f6d365', value: 'yellow' },
  { name: 'Orange', color: '#ff6b6b', value: 'orange' },
  { name: 'Teal', color: '#319795', value: 'teal' },
  { name: 'Indigo', color: '#5a67d8', value: 'indigo' }
];

const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('purple');

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'purple';
    setCurrentTheme(savedTheme);
    document.body.className = `theme-${savedTheme}`;
  }, []);

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    document.body.className = `theme-${theme}`;
    localStorage.setItem('theme', theme);
    setIsOpen(false);
  };

  return (
    <div className="theme-selector">
      <button 
        className="theme-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        style={{ background: 'white' }}
      >
        🎨
      </button>
      <div className={`theme-menu ${isOpen ? 'open' : ''}`}>
        {themes.map(theme => (
          <button
            key={theme.value}
            className={`theme-option ${currentTheme === theme.value ? 'active' : ''}`}
            style={{ backgroundColor: theme.color }}
            onClick={() => changeTheme(theme.value)}
            title={theme.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;