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
        return {selectedItemCode:null, selectedItem: null, items:this.props.items, mode:null}
    },
    isSelected:function(itemInfo){
        if (itemInfo.code == this.state.selectedItemCode){
            this.setState({selectedItemCode:null, selectedItem:null,});
            
        }
        else
            this.setState({selectedItemCode:itemInfo.code, selectedItem:itemInfo,  mode:'selected'});
        
    },
    isDeleted: function(newItemsArray){
        this.setState({items:newItemsArray, mode:null})
    },

    isClosedCardItem:function(items) {
        // console.log(this.state.mode)
        if (this.state.mode != 'editNew')
            this.state.items.splice(this.state.items.indexOf(this.state.selectedItem),1, items)
        this.setState({selectedItem:null, selectedItemCode:null, mode:null,})
    },

    cardItemEdit: function(selectedItemNumber){
        this.setState({mode:'edit', selectedItem:this.state.items[selectedItemNumber]})
    },

    isSavedChanges:function(chandedItemInfo){
        if (this.state.mode == 'editNew'){
            this.state.items.push(chandedItemInfo);
            this.state.mode = null;
            this.state.selectedItem = null;

        }
        else{
            this.state.items.splice(this.state.items.indexOf(this.state.selectedItem),1, chandedItemInfo)
        }
        this.setState({mode:null,selectedItem:null})
    },
    openNewItemCard:function(){

        this.setState({selectedItem:{name:'', price:'', description:'', code:null, url:'', left:''}, mode:'editNew'})
    },
    render: function(){

        var itemInformation = this.state.items.map ((v) =>
           React.createElement (item, {itemInfo: v, 
                                        cbIsSelected:this.isSelected, 
                                        selectedItemCode:this.state.selectedItemCode, 
                                        items:this.state.items, 
                                        cbIsDeleted:this.isDeleted,
                                        cbCardItemEdit:this.cardItemEdit, 
                                        mode:this.state.mode,
                                        key:v.code
                                        
                                        })
        );
    
        return   React.DOM.div({className:"wrapper"},
                React.DOM.h3({className:"title"}, this.props.title),
                React.DOM.div({className:'itemsTableWrapper'},
                    React.DOM.div({className:"itemsTable"}, itemInformation),
                    React.createElement (newItem, {cbOpenNewItemCard:this.openNewItemCard, mode:this.state.mode,  })
                ),
                (this.state.selectedItemCode && this.state.mode == 'selected') ? React.createElement(cardItem, {itemInfo:this.state.selectedItem,  
                                                                                mode:this.state.mode, 
                                                                                cbIsClosedCardItem:this.isClosedCardItem}):null,
                (this.state.mode == 'edit' || this.state.mode == 'editNew') ? React.createElement(cardItemEdit, {itemInfo:this.state.selectedItem,  
                                                                                mode:this.state.mode, 
                                                                                cbIsClosedCardItem:this.isClosedCardItem, 
                                                                                cbIsSavedChanges:this.isSavedChanges}):null,
                
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
        if (this.props.mode != 'edit' && this.props.mode != 'editNew')
            this.props.cbIsSelected(this.props.itemInfo);
        
    },

    render: function (){
        // console.log((this.props.itemInfo.code, this.props.selectedItemCode))
        return  React.DOM.div({key:this.props.itemInfo.code, className:(this.props.itemInfo.code == this.props.selectedItemCode && this.props.mode != 'edit' && this.props.mode !='editNew') ? 'itemTr selected' : 'itemTr'},
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
                                                                cbIsDeleted:this.props.cbIsDeleted,
                                                                mode:this.props.mode})),
                    )       
            )
    }
});

var newItem = React.createClass({
    displayName:'newItem',

    // getInitialState:function(){
    //     return {mode:this.props.mode}
    // },

    cbOpenNewItemCard:function(){
       this.props.cbOpenNewItemCard();
    },

    render:function(){
        // console.log(this.props.mode)
        return React.DOM.div(null, 
            React.DOM.button({className:'newItem', onClick:this.cbOpenNewItemCard, disabled: (this.props.mode == 'edit' || this.props.mode == 'editNew')}, 'Новый товар'))
    }
})

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
                React.DOM.div({className:'cardItemTitle'}, React.DOM.div({className:'cardItemHeader'}, 'Название') , React.DOM.span(null,   this.props.itemInfo.name)),
                React.DOM.div({className:'cardItemPrice'},  React.DOM.span({className:'cardItemHeader'},'Цена') , React.DOM.span(null,   this.props.itemInfo.price)),
                React.DOM.div({className:'cardItemLeft'},  React.DOM.span({className:'cardItemHeader'},'Осталось') , React.DOM.span(null,   this.props.itemInfo.left)),
                React.DOM.div({className:'cardItemDesription'},  React.DOM.span({className:'cardItemHeader'}, 'Описание'), React.DOM.span(null,  this.props.itemInfo.description))
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
        
        return React.DOM.button({className:'btn_delete', onClick: this.isDeleted, disabled: (this.props.mode == 'edit' || this.props.mode == 'editNew')},'Удалить')
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
        
        return React.DOM.button({className:'btn_edit',  onClick:this.isEdited, disabled: (this.props.mode == 'edit' || this.props.mode == 'editNew')},'Редактировать')
    }
})

var cardItemEdit = React.createClass({
    displayName: 'cardItemEdit',



    propTypes:{
        itemInfo:React.PropTypes.object,
        cbIsClosedCardItem:React.PropTypes.func
    },
    getInitialState:function(){
        return {itemInfo:this.props.itemInfo, validName:true, validPrice:true, validDescription:true, newName:'',validLeft:true, newPrice:null, newDescription:'', newCode:null, newLeft:null}
    },
    cbIsClosedCardItem:function(){

    },

    isChangedName:function(EO){
        // console.log(EO.target.value.length)
        if (this.state.itemInfo.name.length > 50 || EO.target.value.length == 0){
            this.setState({validName:false});
        }
        else{
            this.setState({validName:true});
            this.state.newName = EO.target.value
        }
    },

    isChangedPrice:function(EO){
        // console.log(EO.target.value.length)
        if (isNaN(EO.target.value) || EO.target.value.length == 0){
            this.setState({validPrice: false}) ;

        }
        else{
            this.setState({validPrice:true});
            this.state.newPrice = EO.target.value;
        }

    },

    isChangedLeft:function(EO){
        if (isNaN(EO.target.value) || EO.target.value.length == 0){
            this.setState({validLeft: false}) ;

        }
        else{
            this.setState({validLeft:true});
            this.state.newLeft = EO.target.value;
        }
    },

    isChangedTextarea:function(EO){
        
        this.setState({itemInfo:this.state.description});
        this.state.newDescription = EO.target.value;
    },
    addNewImg:function(EO){
        // console.log(EO.target.value);
        this.state.itemInfo.url =  EO.target.value
        
        
    },



    render:function(){


        return React.DOM.div({className:'cardItem'},
                    (this.props.mode == 'edit')?
                        React.DOM.div({className:'imgWrapper'}, 
                            React.DOM.img({className:'img', src:this.props.itemInfo.url})):
                            React.DOM.input({type:'file', onChange:this.addNewImg}),
                    React.DOM.div({className:'cardItemInfo'},
                        React.DOM.div({className:'cardItemTitle'}, 
                            React.DOM.div({className:'cardItemHeader'}, 'Название' , React.DOM.span(null, ': '), ) , 
                            
                            React.DOM.input({defaultValue:this.props.itemInfo.name, onChange:this.isChangedName}, ),
                            (!this.state.validName)?
                                React.DOM.div({className:'error'}, 'Введите корретиное название'):null
                    ), 
                        React.DOM.div({className:'cardItemLeft'},  
                            React.DOM.div({className:'cardItemHeader'},'Цена' , React.DOM.span(null, ': '), ) , 
                            // React.DOM.span(null, ': '), 
                            React.DOM.input({defaultValue:this.props.itemInfo.price, onChange:this.isChangedPrice}, ),
                            (!this.state.validPrice)?
                                React.DOM.div({className:'error'}, 'Введите число'):null
                        ),
                        React.DOM.div({className:'cardItemLeft'},  
                            React.DOM.div({className:'cardItemHeader'},'Осталось' , React.DOM.span(null, ': '), ) , 
                            // React.DOM.span(null, ': '), 
                            React.DOM.input({defaultValue:this.props.itemInfo.left, onChange:this.isChangedLeft}, ),
                            (!this.state.validLeft)?
                                React.DOM.div({className:'error'}, 'Введите число'):null
                        ),
                        React.DOM.div({className:'cardItemDesription'},  
                            React.DOM.div({className:'cardItemHeader'}, 'Описание', React.DOM.span(null, ': '), ), 
                            // React.DOM.span(null, ': '), 
                            React.DOM.textarea({ defaultValue:this.props.itemInfo.description, onChange:this.isChangedTextarea},)),
                        React.DOM.div({className:'btns_save_cancel'},
                            React.createElement(btn_save, {itemInfo:this.state.itemInfo, 
                                                            newPrice:this.state.newPrice,
                                                            newName:this.state.newName,
                                                            newDescription:this.state.newDescription,
                                                            newLeft:this.state.newLeft,
                                                            cbIsSavedChanges:this.props.cbIsSavedChanges, 
                                                            validName:this.state.validName, 
                                                            validPrice:this.state.validPrice,
                                                            mode:this.props.mode}),
                            React.createElement(btn_cancel, {cbIsClosedCardItem:this.props.cbIsClosedCardItem, itemInfo:this.props.itemInfo, mode:this.props.mode})
                            
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
       
            this.props.cbIsClosedCardItem(this.state.itemInfo)
    },

    render: function(){
        return React.DOM.button({className:'btn_cancel', onClick:this.isClosedCardItem}, 'Отмена')

    }
})

var btn_save = React.createClass({
    displayName:'btn_save',

    getInitialState:function(){
        return {itemInfo:this.props.itemInfo}
    },

    isSavedChanges:function(){
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
        this.props.cbIsSavedChanges(this.state.itemInfo)
    },

    render:function(){
        // console.log(this.props.mode);
        // console.log(this.props.newName.length ==0 , (!this.props.newPrice) , !this.props.newLeft)
        if (this.props.mode == 'edit')
            return React.DOM.button({className:'btn_save', onClick:this.isSavedChanges, 
                                disabled: (!this.props.validName || !this.props.validPrice || 
                                    !(this.props.newName.length ==0 || (!this.props.newPrice) || !this.props.newLeft ))}, 'Сохранить')
        if (this.props.mode == 'editNew')
            return React.DOM.button({className:'btn_save', onClick:this.isSavedChanges, 
                        disabled: (!this.props.validName || !this.props.validPrice || 
                            this.props.newName.length ==0 || (!this.props.newPrice) || !this.props.newLeft )}, 'Сохранить')                    
    }
})