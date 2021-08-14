import './index.scss';

import React from 'react';
import myData from '../../../db.json';

const Title = () => {
  const {
    aboutMe: { nickName },
  } = myData;

  return (
    <div className='title'>
      <h1 className='title__h1'>{nickName}</h1>
    </div>
  );
};

export default Title;
