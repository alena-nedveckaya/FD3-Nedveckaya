"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import VotesBlock from './components/VotesBlock';

let questionText='Как вы относитесь к программированию?';
let answersArr=require('./answers.json');
let defaultFreeAnswerText="???";
let colorArr = ['red', 'yellow', 'green', 'blue']

ReactDOM.render(
  <VotesBlock 
    question={questionText}
    answers={answersArr}
    deffreeanswertext={defaultFreeAnswerText}
    startWorkMode={1}
    colorArr = {colorArr}
  />
  , document.getElementById('container') 
);

