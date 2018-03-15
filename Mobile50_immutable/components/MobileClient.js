import React from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';
import ButtonEdit from './ButtonEdit.js';
// import ButtonDelete from './ButtonDelete'
import {clientsEvents} from "./events";

class MobileClient extends React.PureComponent {

  static propTypes = {
    info:PropTypes.shape({
      id: PropTypes.number.isRequired,
      fio: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }),
  };

  state = {
    info: this.props.info,
  };

  componentWillReceiveProps = (newProps) => {
    console.log("MobileClient id="+this.props.info.id+" componentWillReceiveProps");
    this.setState({info:newProps.info});
  };

    deleteClient = (EO) =>{
        clientsEvents.emit('deleteClient', this.props.info)
    };

  render() {

    console.log("MobileClient id="+this.state.info.id+" render");
    
    return (
          <tr>
            <td className='MobileClientBalance'>{this.state.info.fio}</td>
            <td><ButtonEdit info={this.state.info}/></td>
            <td><button onClick={this.deleteClient}>Удалить</button></td>
            <td className='MobileClientFIO'>{this.state.info.balance}</td>
          </tr>
    );

  }

}

export default MobileClient;
