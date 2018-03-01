var filterBlock = React.createClass({
    displayName: 'filterBlock',

    propTypes: {
        words:React.PropTypes.array.isRequired
    },

    render: function (){
    
    return React.DOM.div({className:'filterBlock'},
        React.createElement(inputString, {}),
        
        React.DOM.div({className:'wordsBlock'}, 
        this.props.words.map(v =>
            React.DOM.div({className:'word', key:v}, v)
        )
        )
)
    }
})

var inputString = React.createClass({
    displayName: 'inputString',

    render: function(){
        return null
    }
})