import React from 'react';
import PropTypes from 'prop-types'

import './CardItem.css';
import './CardItemEdit.css';

import Btn_save from './btn_save.js';
import Btn_cancel from './Btn_cancel.js';

class cardItemEdit extends React.Component{
    // displayName: 'cardItemEdit',



    static propTypes = {
        itemInfo:PropTypes.object,
        cbIsClosedCardItem:PropTypes.func
    } 
    state = {
        itemInfo:this.props.itemInfo, 
        validName:true, 
        validPrice:true, 
        validDescription:true, 
        newName:'',
        validLeft:true, 
        newPrice:null, 
        newDescription:'', 
        newCode:null, 
        newLeft:null
    }

    isChangedName = (EO) =>{
        // console.log(EO.target.value.length)
        if (this.state.itemInfo.name.length > 50 || EO.target.value.length == 0){
            this.setState({validName:false});
        }
        else{
            this.setState({validName:true});
            this.state.newName = EO.target.value
        }
    }

    isChangedPrice = (EO) =>{
        // console.log(EO.target.value.length)
        if (isNaN(EO.target.value) || EO.target.value.length == 0){
            this.setState({validPrice: false}) ;

        }
        else{
            this.setState({validPrice:true});
            this.state.newPrice = EO.target.value;
        }

    }

    isChangedLeft = (EO) =>{
        if (isNaN(EO.target.value) || EO.target.value.length == 0){
            this.setState({validLeft: false}) ;

        }
        else{
            this.setState({validLeft:true});
            this.state.newLeft = EO.target.value;
        }
    }

    isChangedTextarea = (EO) =>{
        
        this.setState({itemInfo:this.state.description});
        this.state.newDescription = EO.target.value;
    }
    addNewImg = (EO) =>{
        // console.log(EO.target.value);
        this.state.itemInfo.url =  EO.target.value
        
        
    }
    render(){
        return <div className ='cardItem'>
                    {(this.props.mode == 'edit')
                    ?
                        <div className='imgWrapper'>
                            <img className= 'img' src={this.props.itemInfo.url}/>
                        </div>
                    :
                            <input type='file' onChange={this.addNewImg}/>
                    }
                   <div className='cardItemInfo'>
                        <div className='cardItemTitle'> 
                            <div className= 'cardItemHeader'>Название</div> 
                           <input defaultValue= {this.props.itemInfo.name} 
                                    onChange={this.isChangedName}/>
                            {
                            (!this.state.validName) &&
                                <div className='error'>Введите корретиное название</div>
                            }
                    </div> 
                    <div className = 'cardItemLeft'>  
                        <div className='cardItemHeader'>Цена</div>
                        <input defaultValue = {this.props.itemInfo.price}
                                 onChange={this.isChangedPrice}/>
                        {
                            (!this.state.validPrice)&&
                                <div className= 'error'>Введите число</div>
                        }
                    </div>
                    <div className={'cardItemLeft'}> 
                        <div className='cardItemHeader'>Осталось</div> 
                        <input defaultValue={this.props.itemInfo.left}
                                 onChange={this.isChangedLeft}/>
                        {
                            (!this.state.validLeft)&&
                                <div className='error'>Введите число</div>
                        }
                    </div>
                    <div className='cardItemDesription'>  
                        <div className='cardItemHeader'>Описание</div>
                        <textarea defaultValue={this.props.itemInfo.description}
                                 onChange={this.isChangedTextarea}/>
                    </div>
                    <div className='btns_save_cancel'>
                            <Btn_save itemInfo={this.state.itemInfo}
                                        newPrice={this.state.newPrice}
                                        newName={this.state.newName}
                                        newDescription={this.state.newDescription}
                                        newLeft={this.state.newLeft}
                                        // cbIsSavedChanges={this.props.cbIsSavedChanges}
                                        validName={this.state.validName}
                                        validPrice={this.state.validPrice}
                                        mode={this.props.mode}
                            />

                            <Btn_cancel cbIsClosedCardItem={this.props.cbIsClosedCardItem}
                                         itemInfo={this.props.itemInfo}
                                         mode={this.props.mode}
                            />
                        </div>
                    </div>   

                </div>
            }
}
export default cardItemEdit;