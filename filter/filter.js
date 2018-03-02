var filterBlock = React.createClass({
    displayName: 'filterBlock',

    propTypes: {
        words:React.PropTypes.arrayOf(
            React.PropTypes.string.isRequired
        )
    },

    getInitialState: function(){
        return {typedWord:null, checked:0, words:this.props.words }
    },
    TypedWordChanged: function (newWord){
        console.log('введенный текст изменен - ' + newWord),
        this.setState({typedWord: newWord, })
        // this.words = [];
    },

    alfabetSorting: function(checked){
        console.log('filterBlock checkbox изменен',this.state.checked )
        function Compare(A, B){
            if (A < B) return -1;
            if (A > B) return 1;
            return 0;
        };

        if (this.state.checked == 0){
           
            var newWordsArr = this.state.words.slice(0).sort(Compare);
            // console.log(newWordsArr)
            this.setState({checked:1, words:newWordsArr})
        };
        if (this.state.checked == 1){
            console.log(this.props.words);
            this.setState({checked:0, words:this.props.words})
        };
    },

    render: function (){
        var words = [];
        this.state.words.forEach((v) => {
            // console.log(this.state.typedWord)
            if (this.state.typedWord == null || v.indexOf(this.state.typedWord) !=-1){
                var word = React.DOM.div({className:'word', key:v}, v);
                words.push(word);}
                // console.log(words)
        }
    )
        
            return React.DOM.div({className:'filterBlock'},
                React.createElement(inputString, {cbTypedWordChanged:this.TypedWordChanged, cbAlfabetSorting:this.alfabetSorting}),
                React.DOM.div({className:'wordsBlock'}, words )
            )
    }
})


var inputString = React.createClass({
    displayName: 'inputString',

    propTypes:{
        cbTypedWordChanged:React.PropTypes.func.isRequired,
        cbAlfabetSorting:React.PropTypes.func.isRequired,
    },

    typedWordChanged: function(EO){
        console.log('typedWord: текст изменён - '+EO.target.value); 
        this.props.cbTypedWordChanged(EO.target.value);
    }, 

    alfabetSorting:function (EO){
        console.log('checkbox изменен '); 
        this.props.cbAlfabetSorting(EO.target.value);
    },

    render: function(){
        return React.DOM.div({className:'inputString'},
            React.DOM.input({type:'checkbox', onChange: this.alfabetSorting} ),
            React.DOM.input({className:'inputWord', type:'text',name:'typedWord', onChange: this.typedWordChanged})
    )
    }
})