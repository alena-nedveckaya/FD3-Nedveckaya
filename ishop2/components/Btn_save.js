import React from 'react';
import PropTypes from 'prop-types';

import './btn_save.css';
import {changesTable} from './events'
class Btn_save extends React.Component{
    // displayName:'btn_save',

    state = {
        itemInfo:this.props.itemInfo
    }

    isSavedChanges = () =>{
        // console.log(this.state.itemInfo)
        if (this.props.newPrice)
            this.state.itemInfo.price = this.props.newPrice;
        if (this.props.newName)
            this.state.itemInfo.name = this.props.newName;
        if (this.props.newDescription)
            this.state.itemInfo.description = this.props.newDescription;
        if (this.props.newLeft)
            this.state.itemInfo.left = this.props.newLeft;
        if (!this.state.itemInfo.code)
            this.state.itemInfo.code = Math.floor(Math.random()*(1000)) + 1000;
        changesTable.emit('saveChanges', this.state.itemInfo)
        // this.props.cbIsSavedChanges(this.state.itemInfo)
    }

    render(){
        // console.log(this.props.mode);
        // console.log(this.props.newName.length ==0 , (!this.props.newPrice) , !this.props.newLeft)
        if (this.props.mode == 'edit')
            return <button className='btn_save'  onClick={this.isSavedChanges}
                    disabled= {(!this.props.validName || !this.props.validPrice || 
                            !(this.props.newName.length ==0 || (!this.props.newPrice) || !this.props.newLeft ))}> Сохранить</button>
        if (this.props.mode == 'editNew')
            return <button className='btn_save' onClick={this.isSavedChanges}
                        disabled= {(!this.props.validName || !this.props.validPrice || 
                            this.props.newName.length ==0 || (!this.props.newPrice) || !this.props.newLeft )}>Сохранить</button>                    
    }
}

export default Btn_save;