import React from 'react';
import PropTypes from 'prop-types';

class MyComponent extends React.PureComponent {
    state = {text: this.props.text}


    render(){
        let {text} = this.props;
        let newText=[];
        let stringArr = text.split(' ');
        console.log(stringArr);
        stringArr.map( (el, i) => {
            if (el.indexOf('br') === -1){
                newText.push(<span key={i}>{el} </span>);
            }

            else
                newText.push(<br key={i}/>)
        });

        return <div>{newText}</div>
    }
}
export default MyComponent