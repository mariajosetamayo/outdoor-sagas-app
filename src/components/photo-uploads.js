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
    var date = new Date();
    var name = date.getTime();
    this.props.dispatch(
      actions.uploadPicture(files, name)
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
