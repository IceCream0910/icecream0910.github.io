import './index.scss';

import React from 'react';
import useLanguage from '../../hooks/useLanguage';
import useTheme from '../../hooks/useTheme';

const ThemeMode = () => {
  const { toggleDarkTheme } = useTheme();
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <div className='container'>
      <div className='language'>
        <select defaultValue={currentLanguage} onChange={changeLanguage}>
          <option value='Korean'>한국어</option>
          <option value='English'>English</option>
        </select>
      </div>
      <div className='theme-container'>
        <button onClick={toggleDarkTheme}></button>
      </div>
    </div>
  );
};

export default ThemeMode;
