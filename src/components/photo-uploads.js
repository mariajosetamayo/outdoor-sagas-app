import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';


import * as actions from '../actions';

class PhotoUpload extends Component {
  constructor(props){
    super(props)
    this.onDrop = this.onDrop.bind(this);
  };

  onDrop(files){
    var d = new Date();
    var n = d.getTime();
    console.log('this is the photo name', n)
    this.props.dispatch(
      actions.uploadPicture(files, n)
    )
  };

  render (){
    return (
      <div>
        <Dropzone onDrop = {this.onDrop} >
          <div>You can drop a file here or click to select a file to upload.</div>
        </Dropzone>
      </div>
    );
  }
};

export default connect ()(PhotoUpload);
