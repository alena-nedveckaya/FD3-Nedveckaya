import React from 'react';
import PropTypes from 'prop-types';
import Btn_cancel from './Btn_cancel';

import './NewItem.css'

class NewItem extends React.Component{
    // displayName:'newItem',

    // getInitialState:function(){
    //     return {mode:this.props.mode}
    // },

    cbOpenNewItemCard = () =>{
       this.props.cbOpenNewItemCard();
    }

    render(){
        // console.log(this.props.mode)
        return <div> 
            <button className='newItem'
                    onClick={this.cbOpenNewItemCard}
                    disabled={(this.props.mode == 'edit' || this.props.mode == 'editNew')}>Новый товар</button>
            </div>
    }
}

export default NewItem;