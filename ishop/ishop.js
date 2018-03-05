var itemsTable = React.createClass({
    displayName: 'itemsTable',

    propTypes:{
        items:React.PropTypes.arrayOf(
            React.PropTypes.shape({
                name: React.PropTypes.string.isRequired,
                price: React.PropTypes.string.isRequired,
                url:React.PropTypes.string.isRequired,
                left: React.PropTypes.number.isRequired
            })
        )
    },
    getInitialState: function(){
        return {selectedItemCode:null, selectedItem: null, items:this.props.items}
    },
    isSelected:function(itemInfo){
        if (itemInfo.code == this.state.selectedItemCode){
            this.setState({selectedItemCode:null, selectedItem:null, mode:null});
        }
        else
            this.setState({selectedItemCode:itemInfo.code, selectedItem:itemInfo});
        
    },
    isDeleted: function(newItemsArray){
        this.setState({items:newItemsArray})
    },

    isClosedCardItem:function(items) {
        
        this.state.items.splice(this.state.items.indexOf(this.state.selectedItem),1, items)
        this.setState({selectedItem:null, selectedItemCode:null, mode:null,})
    },

    cardItemEdit: function(selectedItemNumber){
        this.setState({mode:'edit', selectedItem:this.state.items[selectedItemNumber]})
    },

    isSavedChanges:function(chandedItemInfo){
        this.state.items.splice(this.state.items.indexOf(this.state.selectedItem),1, chandedItemInfo)
        this.setState({mode:null})
    },
    render: function(){
        console.log(this.state.items)
        var itemInformation = this.state.items.map ((v) =>
           React.createElement (item, {itemInfo: v, cbIsSelected:this.isSelected, 
                                        selectedItemCode:this.state.selectedItemCode, 
                                        items:this.state.items, cbIsDeleted:this.isDeleted,
                                        cbCardItemEdit:this.cardItemEdit, mode:this.state.mode,
                                        
                                        })
        );
    
        return   React.DOM.div({className:"wrapper"},
                React.DOM.h3({className:"title"}, this.props.title),
                React.DOM.div({className:"itemsTable"}, itemInformation),
                this.state.selectedItemCode ? React.createElement(cardItem, {itemInfo:this.state.selectedItem,  mode:this.state.mode, cbIsClosedCardItem:this.isClosedCardItem}):null,
                (this.state.mode == 'edit') ? React.createElement(cardItemEdit, {itemInfo:this.state.selectedItem, itemInfoOld:this.state.selectedItem, mode:this.state.mode, cbIsClosedCardItem:this.isClosedCardItem, cbIsSavedChanges:this.isSavedChanges}):null
            )
            

},

});

var item = React.createClass({
    displayName: 'item',

    getInitialState:function(){
        return {}
    },
    propTypes:{
        itemInfo:React.PropTypes.object,
        items:React.PropTypes.array,
        cbIsDeleted:React.PropTypes.func,
        mode:React.PropTypes.string
    },

    isselectedItemCode: function(EO){
        
        this.props.cbIsSelected(this.props.itemInfo);
        
    },

    render: function (){
        // console.log(this.props.itemInfo)
        return  React.DOM.div({key:this.props.itemInfo.code, className:(this.props.itemInfo.code == this.props.selectedItemCode) ? 'itemTr selected' : 'itemTr'},
            React.DOM.label(null,
                    React.DOM.input({className:'hiddenRadio', 
                                    // code:this.props.itemInfo.code, 
                                    type:'radio', name:'item', 
                                    value:this.props.itemInfo.name,
                                    onClick:this.isselectedItemCode}),
                        
                            React.DOM.div({className:'itemTd'}, this.props.itemInfo.name),
                          
                        React.DOM.div({className:'itemTd'}, this.props.itemInfo.price),
                        React.DOM.div({className:'itemTd'}, this.props.itemInfo.left),
                        React.DOM.div({className:'itemTd'},
                            React.createElement(button_edit, {itemInfoOld:this.props.itemInfo,
                                                                itemInfo:this.props.itemInfo, 
                                                                items:this.props.items, 
                                                                cbCardItemEdit:this.props.cbCardItemEdit,
                                                                mode:this.props.mode,
                                                                validName:this.state.validName,
                                                                validPrice:this.state.validPrice,
                                                                validDescription:this.state.validDescription,
                                                            })),
                        React.DOM.div({className:'itemTd'},
                            React.createElement(button_delete, {items:this.props.items, 
                                                                itemInfo:this.props.itemInfo, 
                                                                cbIsDeleted:this.props.cbIsDeleted})),
                    )       
            )
    }
});

var cardItem = React.createClass({
    displayName: 'cardItem', 

    propTypes: {
        itemInfo:React.PropTypes.object.isRequired
    },

    render: function (){

        return React.DOM.div({className:'cardItem'},
            React.DOM.div({className:'imgWrapper'}, 
                React.DOM.img({className:'img', src:this.props.itemInfo.url},)
            ),
            React.DOM.div({className:'cardItemInfo'},
                React.DOM.div({className:'cardItemTitle'}, React.DOM.span({className:'cardItemHeader'}, 'Название') , React.DOM.span(null, ': ' + this.props.itemInfo.name)),
                React.DOM.div({className:'cardItemLeft'},  React.DOM.span({className:'cardItemHeader'},'Цена') , React.DOM.span(null, ': ' + this.props.itemInfo.price)),
                React.DOM.div({className:'cardItemDesription'},  React.DOM.span({className:'cardItemHeader'}, 'Описание'), React.DOM.span(null,': ' + this.props.itemInfo.description))
        )

        )
    }
})

var button_delete = React.createClass({
    displayName: 'button_delete',

    propTypes:{
        items:React.PropTypes.array,
        itemInfo:React.PropTypes.object,
        cbIsDeleted:React.PropTypes.func
    },

    isDeleted: function(){
        var delete_bool = confirm('Вы действительно хотите удалить позицию')
        if (delete_bool){
            var indexDeleteElement = this.props.items.indexOf(this.props.itemInfo);
            this.props.items.splice(indexDeleteElement, 1);
            this.props.cbIsDeleted(this.props.items)
        }
    },

    render: function(){
        
        return React.DOM.button({className:'btn_delete', onClick: this.isDeleted},'Удалить')
    }
})

var button_edit = React.createClass({
    displayName: 'button_edit',

    propTypes: {
        itemInfo:React.PropTypes.object,
        cbCardItemEdit:React.PropTypes.func,
        cbIsClosedCardItem:React.PropTypes.func,
        mode:React.PropTypes.string
    },

    isEdited:function(){
        var selectedItem = this.props.items.indexOf(this.props.itemInfo);
        this.props.cbCardItemEdit(selectedItem)
    },

    render: function(){
        
        return React.DOM.button({className:'btn_edit',  onClick:this.isEdited, disabled: (this.props.mode == 'edit')},'Редактировать')
    }
})

var cardItemEdit = React.createClass({
    displayName: 'cardItemEdit',



    propTypes:{
        itemInfo:React.PropTypes.object,
        cbIsClosedCardItem:React.PropTypes.func
    },
    getInitialState:function(){
        return {itemInfo:this.props.itemInfo, validName:true, validPrice:true, validDescription:true}
    },
    cbIsClosedCardItem:function(){

    },

    isChangedName:function(EO){
        var oldName = this.state.itemInfo.name
        this.state.itemInfo.name = EO.target.value;
        //console.log(this.state.itemInfo.name.length)
        if (this.state.itemInfo.name.length > 50){
            this.setState({validName:false});//здесь я обновляю состояние каждый раз, чтобы проверка срабатывала сразу, 
                                                // а не по нажатию кнопки Сохранить, но из-за этого почему-то изменяется itemInfo 
                                                // у верхнего блока и у меня не получается его прежнее состояние вернуть
            this.state.itemInfo.name = oldName
        }
        else{
            this.setState({validName:true});
            this.state.itemInfo.name = EO.target.value
        }
            

        // this.setState({itemInfo:this.state.itemInfo});
    },

    isChangedPrice:function(EO){
        
        var oldPrice = this.state.itemInfo.price
        this.state.itemInfo.price = EO.target.value;
        if (isNaN(this.state.itemInfo.price)){
            this.setState.validPrice= false ;
            this.state.itemInfo.price = oldPrice;
            console.log(this.state.validPrice)
        }
        else{
            this.setState.validPrice=true;
            this.state.itemInfo.price = EO.target.value;
        }
        
            
        // this.setState({itemInfo:this.state.itemInfo});
    },

    isChangedTextarea:function(EO){
        this.state.itemInfo.description = EO.target.value;
        this.setState({itemInfo:this.state.description});
    },



    render:function(){
        console.log(this.props.itemInfoOld);
        var oldItemArray = Object.assign({}, this.props.itemInfo);
        // console.log(oldItemArray)
        return React.DOM.div({className:'cardItem'},
                    React.DOM.div({className:'imgWrapper'}, 
                        React.DOM.img({className:'img', src:this.props.itemInfo.url},)
                    ),
                    React.DOM.div({className:'cardItemInfo'},
                        React.DOM.div({className:'cardItemTitle'}, 
                            React.DOM.span({className:'cardItemHeader'}, 'Название') , 
                            React.DOM.span(null, ': '), 
                            React.DOM.input({defaultValue:this.props.itemInfo.name, onChange:this.isChangedName}, ),
                            (!this.state.validName)?
                                React.DOM.div({className:'error'}, 'Слишком длинное название'):null
                    ), 
                        React.DOM.div({className:'cardItemLeft'},  
                            React.DOM.span({className:'cardItemHeader'},'Цена') , 
                            React.DOM.span(null, ': '), 
                            React.DOM.input({defaultValue:this.props.itemInfo.price, onChange:this.isChangedPrice}, ),
                            (!this.state.validPrice)?
                                React.DOM.div({className:'error'}, 'Введите число'):null
                        ),
                        React.DOM.div({className:'cardItemDesription'},  
                            React.DOM.span({className:'cardItemHeader'}, 'Описание'), 
                            React.DOM.span(null, ': '), 
                            React.DOM.textarea({defaultValue:this.props.itemInfo.description, onChange:this.isChangedTextarea},)),
                        React.DOM.div({className:'btns_save_cancel'},
                            React.createElement(btn_save, {itemInfo:this.state.itemInfo,  cbIsSavedChanges:this.props.cbIsSavedChanges, validName:this.state.validName, validPrice:this.state.validPrice}),
                            React.createElement(btn_cancel, {cbIsClosedCardItem:this.props.cbIsClosedCardItem, itemInfo:this.props.itemInfo,})
                            
                        )
                    )   

                )
            }
})

var btn_cancel = React.createClass({
    // как сюда предать состояние itemInfo (хэш с информацией о продукте) до изменения input??
    displayName:'btn_cancel',

    getInitialState:function (){
        return {itemInfo:this.props.itemInfo}
    },

    propTypes:{
        cbIsClosedCardItem:React.PropTypes.func
    },

    isClosedCardItem: function(){
        // this.setState( (prevState, props) => { return {itemInfo:prevState}; } )
        this.props.cbIsClosedCardItem(this.state.itemInfo)
    },

    render: function(){
        return React.DOM.button({className:'btn_cancel', onClick:this.isClosedCardItem}, 'Отмена')

    }
})

var btn_save = React.createClass({
    displayName:'btn_save',

    isSavedChanges:function(){
        this.props.cbIsSavedChanges(this.props.itemInfo)
    },

    render:function(){
        // console.log(this.props.itemInfo.name)
        return React.DOM.button({className:'btn_save', onClick:this.isSavedChanges, disabled: (!this.props.validName || !this.props.validPrice)}, 'Сохранить')
    }
})