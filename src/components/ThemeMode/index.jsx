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
        <a className='blog_nav' href="https://taein0910.github.io/blog" target="_blank"><li>Blog</li></a>
        <button onClick={toggleDarkTheme}></button>
      </div>
    </div>
  );
};

export default ThemeMode;
