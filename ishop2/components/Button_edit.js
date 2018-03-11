import React from 'react';
import PropTypes from 'prop-types'

class Button_edit extends React.Component{
    // displayName: 'button_edit',

    static propTypes = {
        itemInfo:PropTypes.object,
        cbCardItemEdit:PropTypes.func,
        cbIsClosedCardItem:PropTypes.func,
        mode:PropTypes.string
    }

    isEdited = () =>{
        var selectedItem = this.props.items.indexOf(this.props.itemInfo);
        this.props.cbCardItemEdit(selectedItem)
    }

    render(){
        
        return <button className ='btn_edit'
                      onClick = {this.isEdited}
                      disabled =  {(this.props.mode == 'edit' || this.props.mode == 'editNew')}>
                      Редактировать
                </button>
    }
}
export default Button_edit;