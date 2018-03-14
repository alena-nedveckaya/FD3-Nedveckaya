import React from 'react';
import PropTypes from 'prop-types';

import {clientsEvents} from './events'

class AddNewClient extends React.PureComponent{

    state={
        familyName:null, name:null,fatherName:null, balance:null
    }
    changeFamilyName = (EO) =>{
        this.state.familyName= EO.target.value
    }
    changeName = (EO) =>{
        this.state.name = EO.target.value
    }
    changeFatherName = (EO) =>{
        this.state.fatherName = EO.target.value;
    }
    changeBalance = (EO) => {
        this.state.balance = Number(EO.target.value);
    }
    saveChanges = (EO) => {
        let id = Math.floor(Math.random()*(1000)) + 1000;
        clientsEvents.emit('saveChanges', this.state.familyName, this.state.name, this.state.fatherName, this.state.balance,id);
    }
    render(){
        console.log("addNewClient render");
        return <div className='newClient'>
                    <div>
                        <label>
                            Фамилия
                            <input type='text' onChange = {this.changeFamilyName}/>
                        </label>
                    </div>
                    <div>
                        <label>
                        Имя
                        <input type='text' onChange = {this.changeName}/>
                        </label>
                    </div>
                    <div>
                            <label>
                            Отчество
                            <input type='text' onChange = {this.changeFatherName}/>
                            </label>
                    </div>
                    <div>
                            <label>
                            Баланс
                            <input type='text' onChange = {this.changeBalance}/>
                            </label>
                    </div>
                    <button onClick={this.saveChanges}>Сохранить</button>
                    <button onClick={this.cancelChanges}>Отмена</button>
                </div>
    }
}

export default AddNewClient