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

    render: function(){
        var itemInformation = [];
        this.props.items.forEach (v => {
            var element = React.DOM.tr({key:v.code, className:'itemTr'},
                React.DOM.td({className:'itemTd'}, v.name),
                React.DOM.td({className:'itemTd'}, v.price),
                React.DOM.td({className:'itemTd'},
                    React.DOM.img({className:'itemImg', src:v.url},)
                ),
                React.DOM.td({className:'itemTd'}, v.left)        
            
            )
            itemInformation.push (element);
            }  
        );
    
        return   React.DOM.div({className:"wrapper"},
                React.DOM.h3({className:"title"}, this.props.title),
                React.DOM.table({className:"itemsTable"}, React.DOM.tbody({}, itemInformation)
            )
            )

},

})