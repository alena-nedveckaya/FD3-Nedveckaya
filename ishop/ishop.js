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
        return {selectedItem:null}
    },
    isSelected:function(code){
        this.setState({selectedItem:code})
    },

    render: function(){
        
        var itemInformation = this.props.items.map ((v) =>
           React.createElement (item, {itemInfo: v, cbIsSelected:this.isSelected, selectedItem:this.state.selectedItem})
        );
    
        return   React.DOM.div({className:"wrapper"},
                React.DOM.h3({className:"title"}, this.props.title),
                React.DOM.div({className:"itemsTable"}, itemInformation)
            )
            

},

});

var item = React.createClass({
    displayName: 'item',

    propTypes:{
        itemInfo:React.PropTypes.object
    },

    isSelectedItem: function(EO){
        this.props.cbIsSelected(this.props.itemInfo.code)
    },

    render: function (){

        return  React.DOM.div({key:this.props.itemInfo.code, className:(this.props.itemInfo.code == this.props.selectedItem) ? 'itemTr selected' : 'itemTr'},
            React.DOM.label(null,
                    React.DOM.input({className:'hiddenRadio', 
                                    code:this.props.itemInfo.code, 
                                    type:'radio', name:'item', 
                                    value:this.props.itemInfo.name,
                                    onClick:this.isSelectedItem}),
                    
                        React.DOM.div({className:'itemTd'}, this.props.itemInfo.name),
                        React.DOM.div({className:'itemTd'}, this.props.itemInfo.price),
                        // React.DOM.div({className:'itemTd'},
                        //     React.DOM.img({className:'itemImg', src:this.props.itemInfo.url},)
                        // ),
                        React.DOM.div({className:'itemTd'}, this.props.itemInfo.left),
                        React.DOM.div({className:'itemTd'},
                            React.DOM.button({className:'btn_edit' },'Редактировать')),
                        React.DOM.div({className:'itemTd'},
                            React.DOM.button({className:'btn_delete' },'Удалить')),
                    )       
            )
    }
})