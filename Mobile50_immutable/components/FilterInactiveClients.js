import React from 'react';
import PropTypes from 'prop-types';
import {clientsEvents} from "./events";

class FilterInactiveClients extends React.PureComponent {
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
        console.log("FilterInactiveClients componentWillReceiveProps");

        this.setState({clients: newProps.clients})

    };

    filterInactive = () => {
        let filterClients = this.state.clients.filter(client => {
            return client.balance < 0  }
        );
        clientsEvents.emit('FilterClients', filterClients);

        console.log(filterClients)
    };

    render (){
        console.log('FilterInactiveClients render');
        return <button onClick={this.filterInactive}>Показать заблокированных клиентов</button>
    }
}
export default FilterInactiveClients;