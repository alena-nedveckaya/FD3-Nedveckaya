import React from 'react'
import PropTypes from 'prop-types';
import {photoEvents} from "./events";

class Img extends React.PureComponent{

    openBig = (EO) => {
        console.log(EO);
        // this.state.mode = 1;
        photoEvents.emit('openBig', this.props.img)
    }
    render(){
        return <img src={this.props.src} onClick={this.openBig}/>
    }
}

export default Img