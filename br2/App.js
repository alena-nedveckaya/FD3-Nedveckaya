"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import   MyComponent from './MyComponent';


let text='JS относится к языкам со слабой типизацией. <br/> Это означает, что типы данных у значений переменных<br> могут изменться';


ReactDOM.render(
  <MyComponent
    text={text}
  />
  , document.getElementById('container') 
);

