﻿import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';
import AddClientButton from './addClientButton.js'

import './MobileCompany.css';
import AddNewClient from './AddNewClient';
import EditForm from './EditForm.js';
import {clientsEvents} from './events';
import FilterActiveClients from './FilterActiveClients.js';
import FilterInactiveClients from './FilterInactiveClients.js';


class MobileCompany extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    clients:PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        fio: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    name: this.props.name,
    clients: this.props.clients,
    mode:null, //1 - newClientForm, 2- edit
    selectedClient:null,
    allclients: null
  };

  componentWillMount = () =>{
    clientsEvents.addListener('saveChangesNewClient', this.saveChangesNewClient);
    clientsEvents.addListener('sageChangesEditClient', this.sageChangesEditClient);
    clientsEvents.addListener('cancelChangesEditClient', this.cancelChangesEditClient);
    clientsEvents.addListener('openEditForm', this.openEditForm);
    clientsEvents.addListener('deleteClient', this.deleteClient);
    clientsEvents.addListener('FilterClients', this.filterClients);
  };

  componentWillUnmount = () =>{
    clientsEvents.removeListener('saveChangesNewClient', this.saveChangesNewClient);
    clientsEvents.removeListener('sageChangesEditClient', this.sageChangesEditClient);
    clientsEvents.removeListener('cancelChangesEditClient', this.cancelChangesEditClient);
    clientsEvents.removeListener('openEditForm', this.openEditForm);
    clientsEvents.removeListener('deleteClient', this.deleteClient);
    clientsEvents.removeListener('FilterClients', this.filterClients);
  };

  newClientForm = (newClient) =>{
    if (newClient){
      this.setState({mode:1})
    }
  } ;

  openEditForm = (clientInfo)=> {
    console.log('openEditForm');
    console.log(clientInfo);
    // this.state.selectedClient=null;
    this.setState({mode:2, selectedClient:clientInfo});
    
  };

  deleteClient = (isDeleteClient) =>{
      let clients = [...this.state.clients];
      let indexDeletedClient = clients.indexOf(isDeleteClient);
      clients.splice(indexDeletedClient,1);
      this.setState({clients:clients});

  };

    filterClients = (isFilteredClients) =>{
        if (!this.state.allclients)
            this.state.allclients = [...this.state.clients];
        this.setState({clients:isFilteredClients})
    };

  saveChangesNewClient = (newFamilyName, newName, newFatherName, newBalance, id) => {
    let newClientsA = [...this.state.clients, {id:id, fio:newFamilyName+' '+newName+' '+newFatherName, balance:newBalance}];
    console.log(newClientsA);
    if (!this.state.allclients)
        this.state.allclients = newClientsA;
    this.setState({clients:newClientsA, mode:null})
  };

    sageChangesEditClient = (client, newName, newBalance) =>{
        let newClientsA = [...this.state.clients];
        let indexChangedClient = newClientsA.indexOf(client);
        let changedClient = {id: newClientsA[indexChangedClient].id, fio:newName, balance:newBalance};
        newClientsA.splice(indexChangedClient,1,changedClient);
        // newClientsA[indexChangedClient].fio = newName;
        // newClientsA[indexChangedClient].balance = newBalance;
        if (!this.state.allclients)
            this.state.allclients = newClientsA;
        this.setState({clients:newClientsA, mode:null})
        // console.log(newClientsA)

    };

    cancelChangesEditClient = () => {
        this.setState({mode:null})
    };
  setName1 = () => {
    this.setState({name:'МТС'});
  };

  setName2 = () => {
    this.setState({name:'Velcom'});
  };
  
  // setBalance = (clientId,newBalance) => {
  //   let newClients=[...this.state.clients]; // копия самого массива клиентов
  //   newClients.forEach( (c,i) => {
  //     if ( c.id==clientId ) {
  //     //if ( c.id==clientId && c.balance!=newBalance ) {
  //       let newClient={...c}; // копия хэша изменившегося клиента
  //       newClient.balance=newBalance;
  //       newClients[i]=newClient;
  //     }
  //   } );
  //   this.setState({clients:newClients});
  // };


  setBalance = (clientId,newBalance) => {
    let changed=false;
    let newClients=[...this.state.clients]; // копия самого массива клиентов
    newClients.forEach( (c,i) => {
      if ( c.id==clientId && c.balance!=newBalance ) {
        let newClient={...c}; // копия хэша изменившегося клиента
        newClient.balance=newBalance;
        newClients[i]=newClient;
        changed=true;
      }
    } );
    if ( changed )
      this.setState({clients:newClients});
  };

    ShowAllClients = () => {
        this.setState({clients:this.state.allclients, allclients:null});

    };

  
  setBalance1 = () => {
    this.setBalance(105,230);
  };

  setBalance2 = () => {
    this.setBalance(105,250);
  };
  
  render() {

    console.log("MobileCompany render");
    console.log(this.state.clients);

    let clientsCode=this.state.clients.map( client =>
      <MobileClient key={client.id} info={client}  />
    );

    return (<div>
              <div className='MobileCompany'>
                <input type="button" value="=МТС" onClick={this.setName1} />
                <input type="button" value="=Velcom" onClick={this.setName2} />
                <div className='MobileCompanyName'>Компания &laquo;{this.state.name}&raquo;</div>
                <div className='MobileCompanyClients'>
                <table className='MobileClient'>
                   <tbody>
                    {clientsCode}
                    </tbody>
                </table>
                {/*<input type="button" value="Сидоров=230" onClick={this.setBalance1} />*/}
                {/*<input type="button" value="Сидоров=250" onClick={this.setBalance2} />*/}
                <FilterActiveClients clients ={this.state.clients}/>
                    <FilterInactiveClients clients ={this.state.clients}/>
                    <button onClick={this.ShowAllClients}>Показать всех клиентов</button>
                <AddClientButton cbNewClientForm={this.newClientForm}/>
                {(this.state.mode == 1)&&
                  <AddNewClient/>
                }
                {(this.state.mode == 2)&&
                  <EditForm client={this.state.selectedClient}/>
                }
              </div>
             </div>
            </div>
      
    )
    ;

  }

}

export default MobileCompany;
