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

    isClosedCardItem:function() {
        this.setState({selectedItem:null, selectedItemCode:null, mode:null})
    },

    cardItemEdit: function(selectedItemNumber){
        this.setState({mode:'edit', selectedItem:this.state.items[selectedItemNumber]})
    },

    isSavedChanges:function(chandedItemInfo){
        console.log(222)
        this.setState({items:chandedItemInfo, mode:null})
    },
    render: function(){

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
                this.state.selectedItemCode ? React.createElement(cardItem, {itemInfo:this.state.selectedItem, mode:this.state.mode, cbIsClosedCardItem:this.isClosedCardItem}):null,
                (this.state.mode == 'edit') ? React.createElement(cardItemEdit, {itemInfo:this.state.selectedItem, mode:this.state.mode, cbIsClosedCardItem:this.isClosedCardItem, cbIsSavedChanges:this.isSavedChanges}):null
            )
            

},

});

var item = React.createClass({
    displayName: 'item',

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
                            React.createElement(button_edit, {itemInfo:this.props.itemInfo, 
                                                                items:this.props.items, 
                                                                cbCardItemEdit:this.props.cbCardItemEdit,
                                                                mode:this.props.mode})),
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
        return {itemInfo:this.props.itemInfo}
    },

    isChangedName:function(EO){
        var newInfo = this.state.itemInfo.name = EO.target.value;
        this.setState({itemInfo:newInfo});
        console.log(this.props.itemInfo)
    },

    render:function(){
        return React.DOM.div({className:'cardItem'},
                    React.DOM.div({className:'imgWrapper'}, 
                        React.DOM.img({className:'img', src:this.props.itemInfo.url},)
                    ),
                    React.DOM.div({className:'cardItemInfo'},
                        React.DOM.div({className:'cardItemTitle'}, React.DOM.span({className:'cardItemHeader'}, 'Название') , React.DOM.span(null, ': '), React.DOM.input({defaultValue:this.props.itemInfo.name, onChange:this.isChangedName}, )),
                        React.DOM.div({className:'cardItemLeft'},  React.DOM.span({className:'cardItemHeader'},'Цена') , React.DOM.span(null, ': '), React.DOM.input({defaultValue:this.props.itemInfo.price}, )),
                        React.DOM.div({className:'cardItemDesription'},  React.DOM.span({className:'cardItemHeader'}, 'Описание'), React.DOM.span(null, ': '), React.DOM.textarea({defaultValue:this.props.itemInfo.description},)),
                        React.DOM.div({className:'btns_save_cancel'},
                            React.createElement(btn_save, {itemInfo:this.props.itemInfo, cbIsSavedChanges:this.props.cbIsSavedChanges}),
                            React.createElement(btn_cancel, {cbIsClosedCardItem:this.props.cbIsClosedCardItem})
                            
                        )
                    )   

                )
            }
})

var btn_cancel = React.createClass({

    displayName:'btn_cancel',

    propTypes:{
        cbIsClosedCardItem:React.PropTypes.func
    },

    isClosedCardItem: function(){
        this.props.cbIsClosedCardItem();
    },

    render: function(){
        return React.DOM.button({className:'btn_cancel', onClick:this.isClosedCardItem}, 'Отмена')

    }
})

var btn_save = React.createClass({
    displayName:'btn_save',

    isSavedChanges:function(){
        console.log(this.props.itemInfo)
        this.props.cbIsSavedChanges(this.props.itemInfo)
    },

    render:function(){
        // console.log(this.props.itemInfo.name)
        return React.DOM.button({className:'btn_save', onClick:this.isSavedChanges}, 'Сохранить')
    }
})