import React from 'react';
import PropTypes from 'prop-types';

import './CardItem.css';


class CardItem extends React.Component{
    // displayName: 'cardItem', 

    static propTypes = {
        itemInfo:PropTypes.object.isRequired
    }

    render(){

        return <div className='cardItem'>
                    <div className='imgWrapper'> 
                        <img className='img' src={this.props.itemInfo.url}/>
                    </div>
                    <div className='cardItemInfo'>
                        <div className = 'cardItemTitle'> 
                            <div className='cardItemHeader'>Название</div> 
                            <span>{this.props.itemInfo.name}</span>
                        </div>
                        
                        <div className='cardItemPrice'>
                            <span className='cardItemHeader'>Цена</span>
                            <span>{this.props.itemInfo.price}</span>
                        </div>
                        <div className='cardItemLeft'>
                             <span className='cardItemHeader'>Осталось</span>
                             <span>{this.props.itemInfo.left}</span>
                        </div>
                        <div className='cardItemDesription'>  
                            <span className='cardItemHeader'>Описание</span>
                            <span>{this.props.itemInfo.description}</span>
                        </div>
                    </div>
                </div>
    }
}

export default CardItem;