import React from 'react';
import PropTypes from 'prop-types';

import './btn_cancel.css'

class Btn_cancel extends React.Component{
    // как сюда предать состояние itemInfo (хэш с информацией о продукте) до изменения input??
    // displayName:'btn_cancel',

    state={
        itemInfo:this.props.itemInfo
    }

    static propTypes={
        cbIsClosedCardItem:PropTypes.func
    }

    isClosedCardItem = () =>{
            this.props.cbIsClosedCardItem(this.state.itemInfo)
    }

    render() {
        return <button className='btn_cancel' onClick={this.isClosedCardItem}>Отмена</button>

    }
}
export default Btn_cancel;