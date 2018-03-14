import React from 'react';
import PropTypes from 'prop-types';

import {clientsEvents} from "./events";

class EditForm extends React.PureComponent{
    static propTypes = {
        client:PropTypes.shape({
          id: PropTypes.number.isRequired,
          fio: PropTypes.string.isRequired,
          balance: PropTypes.number.isRequired,
        }),
      };

      state = {
        client: this.props.client, newName:this.props.client.fio, newBalance:this.props.client.balance
      };

    componentWillReceiveProps = (newProps) => {
        console.log("EditForm componentWillReceiveProps");

        this.setState({client: newProps.client, newName:newProps.client.fio, newBalance:this.props.client.balance})

    };
      changeFIO = (EO) =>{

          this.setState({newName:EO.target.value});
          console.log(this.state.newName)
      };
        changeBalance = (EO) =>{
            this.setState({newBalance:Number(EO.target.value)});
        };

        saveChanges = (EO) =>{
            clientsEvents.emit('sageChangesEditClient', this.state.client, this.state.newName, this.state.newBalance)
        };

        cancelChanges = (EO) =>{
            clientsEvents.emit('cancelChangesEditClient')
        };


    render(){
        console.log('EditForm render');
        console.log(this.state.newName, this.state.client, this.props.client);
        return  <div>
                    <div>
                        <label>
                            ФИО

                            <input value={this.state.newName} onChange={this.changeFIO}/>
                        </label>
                    </div>

                    <div>
                        <label>
                            Баланс
                            <input value={this.state.newBalance} onChange={this.changeBalance}/>
                        </label>
                    </div>

                    <button onClick={this.saveChanges}>Сохранить</button>
                    <button onClick={this.cancelChanges}>Отмена</button>

                </div>
    }

}

export default EditForm;