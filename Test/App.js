"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import Container_images from './components/Container_images'

let images = [
    {id:1, src:'img/bolshoi-surpriz.jpg'},
    {id:2, src:'img/cveta-i-formy.jpg'}
];

ReactDOM.render(
        <Container_images img={images}/>
        , document.getElementById('container')
        )