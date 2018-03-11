import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './itemTable.css'

import Item from './Item.js'
import CardItem from './CardItem.js';
import CardItemEdit from './CardItemEdit.js';
import NewItem from './NewItem.js'

import {changesTable} from './events'

class ItemsTable extends React.Component{
    // displayName: 'itemsTable',

    static propTypes = {
        items:PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                price: PropTypes.string.isRequired,
                url:PropTypes.string.isRequired,
                left: PropTypes.number.isRequired
            })
        )
    }

    state = {
        selectedItemCode:null, selectedItem: null, items:this.props.items, mode:null
    }

    isSelected = (itemInfo) => {
        if (itemInfo.code == this.state.selectedItemCode){
            this.setState({selectedItemCode:null, selectedItem:null,});
            
        }
        else
            this.setState({selectedItemCode:itemInfo.code, selectedItem:itemInfo,  mode:'selected'});
    }

    isDeleted = (newItemsArray)=>{
        this.setState({items:newItemsArray, mode:null, selectedItem:null, selectedItemCode:null })
    }


    isClosedCardItem = (items) =>{
        if (this.state.mode != 'editNew')
            this.state.items.splice(this.state.items.indexOf(this.state.selectedItem),1, items)
        this.setState({selectedItem:null, selectedItemCode:null, mode:null,})
    }

    cardItemEdit = (selectedItemNumber) => {
        this.setState({mode:'edit', selectedItem:this.state.items[selectedItemNumber]})
    }

    isSavedChanges = (chandedItemInfo) => {
        if (this.state.mode == 'editNew'){
            this.state.items.push(chandedItemInfo);
            this.state.mode = null;
            this.state.selectedItem = null;
        }
        else{
            this.state.items.splice(this.state.items.indexOf(this.state.selectedItem),1, chandedItemInfo)
        }
        this.setState({mode:null,selectedItem:null})
    }
    openNewItemCard = () => {

        this.setState({selectedItem:{name:'', price:'', description:'', code:null, url:'', left:''}, mode:'editNew'})
    }

    componentDidMount = () =>{
        changesTable.addListener('deleteItem', this.isDeleted);
        changesTable.addListener('saveChanges', this.isSavedChanges)
    }
    componentWillUnmount = ()=> {
        changesTable.removeListener('deleteItem', this.isDeleted);
        changesTable.removeListener('saveChanges', this.isSavedChanges)
    }

    render() {

        var itemInformation = this.state.items.map ((v) =>
           <Item itemInfo= {v}  cbIsSelected= {this.isSelected}
                selectedItemCode= {this.state.selectedItemCode}
                items= {this.state.items}
                // cbIsDeleted = {this.isDeleted}
                cbCardItemEdit = {this.cardItemEdit}
                mode = {this.state.mode}
                key = {v.code}
            />
        );
    
        return (
            <div className ="wrapper">
                    <h3 className = "title"> {this.props.title} </h3>
                    <div className= 'itemsTableWrapper'>
                        <div className = "itemsTable"> {itemInformation} </div>
                        <NewItem cbOpenNewItemCard = {this.openNewItemCard} mode= {this.state.mode}/>
                    </div>
                    {
                        (this.state.selectedItemCode && this.state.mode == 'selected') 
                        ? 
                             <CardItem itemInfo = {this.state.selectedItem} 
                                        mode = {this.state.mode} 
                                        cbIsClosedCardItem = {this.isClosedCardItem}/>
                        :
                            null
                    }
                    {
                        (this.state.mode == 'edit' || this.state.mode == 'editNew') 
                            ? 
                                <CardItemEdit itemInfo = {this.state.selectedItem}  
                                                mode = {this.state.mode} 
                                                cbIsClosedCardItem = {this.isClosedCardItem} 
                                                // cbIsSavedChanges = {this.isSavedChanges}
                                />
                            :
                                null
                    }
                
                
                
            </div>
            
        )  

    }
};

export default ItemsTable;