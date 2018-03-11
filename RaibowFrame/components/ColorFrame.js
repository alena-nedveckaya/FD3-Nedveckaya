import React from 'react';
import PropTypes from 'prop-types';

class ColorFrame extends React.Component {

  static propTypes = {
    color: PropTypes.string.isRequired,
    colorArr: PropTypes.array.isRequired,
  };

  state ={
    colorArr:this.props.colorArr, lengthArr:this.props.colorArr.length
  }
  addBorder = ( colorArr, children, first) =>{
    if (!first)
      colorArr.splice(0,1)
      return <div style={{border:"1px solid " +this.props.colorArr[0], padding:"5px"}}>
            {
              (colorArr.length >0)
              ?
                this.addBorder(colorArr,children, false)
              :
                children
            }
          </div>
  }
  render() {
    return (
      <div>
        {this.addBorder(this.state.colorArr, this.props.children, true)}
      </div>
    );
  }

}

export default ColorFrame;
