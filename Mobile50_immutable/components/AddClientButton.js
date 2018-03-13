import React from 'react';
import PropTypes from 'prop-types';

class AddClientButton extends React.PureComponent{

    addClient = () =>{
        this.props.cbNewClientForm(true)
    }

    render(){
        return <div>
            <button onClick={this.addClient}>Добавить клиента</button>
        </div>
    }
}
export default AddClientButton