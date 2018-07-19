import React from 'react'
import PropTypes from 'prop-types';
import Img from './Img.js'

import './Container_images.css'
import {photoEvents} from "./events";
class Container_images extends React.PureComponent{
    static propTypes={
        img:PropTypes.array
    };
    state = {
        mode:0, //0 - обычный режим, 1 - увеличенное фото
        openedPhoto:null,
    };
componentWillMount = () => {
    photoEvents.addListener('openBig', this.openBig)
};

openBig = (img) => {
    this.setState({mode:1, openedPhoto:img})
};
closeBigPhoto = () => {
    this.setState({mode:0})
};
nextPhoto = (EO) => {
    EO.stopPropagation();
    let index_photo = this.props.img.indexOf(this.state.openedPhoto);
    if (this.props.img.length > index_photo +1 )
        this.setState({openedPhoto: this.props.img[index_photo+1], mode:1});
    return false;
    console.log(this.state.openedPhoto)
};
prevPhoto = (EO) => {
    EO.stopPropagation();
    let index_photo = this.props.img.indexOf(this.state.openedPhoto);
    if (index_photo-1 >=0 )
        this.setState({openedPhoto: this.props.img[index_photo-1], mode:1});
    return false;
    console.log(this.state.openedPhoto)
};


    render(){
        var images = this.props.img.map(img =>
            <Img img={img} src={img.src} key={img.id} onClick={this.openBig}/>
        );

        return <div>
            {(this.state.mode == 1) &&
            <div className='containerBigPhoto' onClick={this.closeBigPhoto}>
                <img src={this.state.openedPhoto.src}/>
                <div className='container_previous_next'>
                    <div className='next' onClick={this.nextPhoto}></div>
                    <div className='prev' onClick={this.prevPhoto}></div>

                </div>
            </div>
            }
                <div className='containerImg' >
                            {images}
                </div>
                </div>

    }
}

export default Container_images