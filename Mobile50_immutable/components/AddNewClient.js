import React from 'react';
import PropTypes from 'prop-types';

import {clientsEvents} from './events'
import './AddNewClient.css'

class AddNewClient extends React.PureComponent{

    state={
        familyName:null, name:null,fatherName:null, balance:null
    };
    componentWillReceiveProps = (newProps) =>{
        console.log('AddNewClient componentWillReceiveProps')
    };
    changeFamilyName = (EO) =>{
        this.state.familyName= EO.target.value
    };
    changeBalance = (EO) => {
        this.state.balance = Number(EO.target.value);
    };
    saveChanges = (EO) => {
        let id = Math.floor(Math.random()*(1000)) + 1000;
        clientsEvents.emit('saveChangesNewClient', this.state.familyName, this.state.balance,id);
    };
    cancelChanges = (EO) => {
        clientsEvents.emit('cancelChanges', )
    };
    render(){
        console.log("addNewClient render");
        return <table className='newClient'>
            <tbody>
                    <tr>
                        <td><label for ='fio'> ФИО</label> </td>
                        <td><input type='text' name ='fio' onChange = {this.changeFamilyName}/></td>
                    </tr>
                    <tr>
                        <td>
                            <label for='balance'>
                                Баланс

                            </label>
                        </td>
                        <td><input type='text' name='balance' onChange = {this.changeBalance}/></td>
                    </tr>
                    <tr>
                        <td><button onClick={this.saveChanges}>Сохранить</button></td>
                        <td><button onClick={this.cancelChanges}>Отмена</button></td>
                    </tr>
            </tbody>
        </table>
    }
}

export default AddNewClient