import React from 'react';
import PropTypes from 'prop-types';

import {changesTable} from './events'

class Button_delete extends React.Component{
    // displayName: 'button_delete',

    static propTypes = {
        items:PropTypes.array,
        itemInfo:PropTypes.object,
        cbIsDeleted:PropTypes.func
    }
    state = {
        items:this.props.items
        
    }

    isDeleted = ()=>{
        var delete_bool = confirm('Вы действительно хотите удалить позицию')
        if (delete_bool){
            var indexDeleteElement = this.state.items.indexOf(this.props.itemInfo);
            this.state.items.splice(indexDeleteElement, 1);
            // this.props.cbIsDeleted(this.state.items)
            changesTable.emit('deleteItem', this.state.items)
        }
    }

    render() {
        return <button className='btn_delete'
                        onClick= {this.isDeleted}
                        disabled= {(this.props.mode == 'edit' || this.props.mode == 'editNew')}>
                        Удалить
                </button>
    }
}
export default Button_delete;