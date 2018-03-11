import React from 'react';
import PropTypes from 'prop-types';

import './Item.css';

import Button_delete from './Button_delete.js';
import Button_edit from './Button_edit.js';

export class Item extends React.Component{
    // displayName: 'item',

    state = {
        
    }

    static propTypes = {
        itemInfo:PropTypes.object,
        items:PropTypes.array,
        cbIsDeleted:PropTypes.func,
        mode:PropTypes.string
    }

    isselectedItemCode = (EO) => {
        if (this.props.mode != 'edit' && this.props.mode != 'editNew')
            this.props.cbIsSelected(this.props.itemInfo);
        
    }

    render (){
        // console.log((this.props.itemInfo.code, this.props.selectedItemCode))
        return  <div key={this.props.itemInfo.code} 
                    className= {
                                    (this.props.itemInfo.code == this.props.selectedItemCode && this.props.mode != 'edit' && this.props.mode !='editNew') 
                                ? 
                                    'itemTr selected' 
                                : 
                                    'itemTr'
                                }>
            <label>
                    <input className= 'hiddenRadio' 
                                    // code:this.props.itemInfo.code, 
                            type= 'radio'
                            name='item' 
                            value={this.props.itemInfo.name}
                            onClick= {this.isselectedItemCode}/>
                        
                        <div className='itemTd'>{this.props.itemInfo.name}</div>
                        <div className='itemTd'>{this.props.itemInfo.price}</div>
                        <div className='itemTd'>{this.props.itemInfo.left}</div>
                        <div className='itemTd'>
                            <Button_edit itemInfoOld = {this.props.itemInfo}
                                                        itemInfo = {this.props.itemInfo} 
                                                        items = {this.props.items} 
                                                        cbCardItemEdit = {this.props.cbCardItemEdit}
                                                        mode = {this.props.mode}
                                                        validName = {this.state.validName}
                                                        validPrice = {this.state.validPrice}
                                                        validDescription = {this.state.validDescription}
                            />
                        </div>
                        <div className= 'itemTd'>
                            <Button_delete items = {this.props.items} 
                                                    itemInfo = {this.props.itemInfo} 
                                                    cbIsDeleted = {this.props.cbIsDeleted}
                                                    mode = {this.props.mode}
                            />
                        </div>
                    </label>       
            </div>
    }
};
export default Item;