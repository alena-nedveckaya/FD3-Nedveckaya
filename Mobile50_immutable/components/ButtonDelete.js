import React from 'react'
import PropTypes from 'prop-types';

import {clientsEvents} from './events'

class ButtonDelete extends React.PureComponent
{
    static
    propTypes = {
        info: PropTypes.shape({
            id: PropTypes.number.isRequired,
            fio: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
        }),
    };
    deleteClient = (EO) =>{
        clientsEvents.emit('deleteClient', this.props.info)
    };

    render(){
        return <button onClick={this.deleteClient}>Удалить</button>
    }

}
export default ButtonDelete;