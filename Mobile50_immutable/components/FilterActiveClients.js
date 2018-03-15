import React from 'react';
import PropTypes from 'prop-types';
import {clientsEvents} from "./events";

class FilterActiveClients extends React.PureComponent {
    static propTypes = {
        clients: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                fio: PropTypes.string.isRequired,
                balance: PropTypes.number.isRequired,
            })
        )
    };
    state ={
        clients:this.props.clients
    };
    componentWillReceiveProps = (newProps) => {
        console.log("FilterActiveClients componentWillReceiveProps");

        this.setState({clients: newProps.clients})

    };

    filterActive = () => {
        let filterClients = this.state.clients.filter(client => {
           return client.balance >= 0  }
        );
        clientsEvents.emit('FilterClients', filterClients)

    };

    render (){
        console.log('FilterActiveClients render');
        console.log(this.state.clients);
        return <button onClick={this.filterActive}>Показать активных клиентов</button>
    }
}
export default FilterActiveClients;