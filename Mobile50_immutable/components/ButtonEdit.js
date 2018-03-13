import React from 'react';
import PropTypes from 'prop-types';

import {clientsEvents} from './events'

class ButtonEdit extends React.PureComponent{
    static propTypes = {
        info:PropTypes.shape({
          id: PropTypes.number.isRequired,
          fio: PropTypes.string.isRequired,
          balance: PropTypes.number.isRequired,
        }),
      };

    editClients = (EO) => {
        console.log('ButtonEdit Click')
        console.log(this.props.info)
        clientsEvents.emit('openEditForm', this.props.info)
    }

    render(){

        return <button onClick={this.editClients}>Редактировать</button>
    }
}
export default ButtonEdit