"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import ItemsTable from './components/itemTable.js'


var titleStr = 'Наличие товара на складе'
var itemsArr = require('./itemsArr.json')
ReactDOM.render(
    <ItemsTable items = {itemsArr} title = {titleStr}/>,
     document.getElementById('container')
)