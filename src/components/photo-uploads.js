import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import DropzoneComponent from 'react-dropzone-component';



import * as actions from '../actions';

class PhotoUpload extends Component {
  constructor(props){
    super(props)

    this.state = {
        imageFiles: []
    }
    this.onDrop = this.onDrop.bind(this);
  };

  onDrop(files){
    var date = new Date();
    var name = date.getTime();
    this.props.dispatch(
      actions.uploadPicture(files, name)
    )
    this.setState({
        imageFiles: files
    })
  };

  render (){
    const uploadPhotoStyle = {
      width: '150px',
      borderRadius: '2px'
    }
    return (
      <div>
        <Dropzone onDrop = {this.onDrop} accept="image/jpeg,image/jpg,image/tiff,image/gif" multiple={ false }>
          <div>You can drop an image file here or click to select an image file to upload.</div>
        </Dropzone>

        {this.state.imageFiles.length > 0 ? <div>
          <h2>Uploading file...</h2>
          <div>{this.state.imageFiles.map((file) => <img src={file.preview} style={uploadPhotoStyle} /> )}</div>
        </div> : null}
      </div>
    );
  }
};

export default connect ()(PhotoUpload);
