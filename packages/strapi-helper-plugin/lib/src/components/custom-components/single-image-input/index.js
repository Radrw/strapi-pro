import React, {Component, PropTypes} from 'react';
// import {Segment, Image, Icon, Button} from 'semantic-ui-react';
import _ from 'lodash';
//import './semantic.css'
import { List } from 'immutable';
import Dropzone from 'react-dropzone';
import styles from './styles.scss';

let getRandomInt = (min, max) => {
  return Math.floor(Math.random() * ((max || 1000) - (min || 9) + 1) + min);
};

class FileField extends Component {
  constructor(props) {
    super(props);
    //console.log(props);
    this.state = {
      uploading: false,
    };
  }

    // Set uploading state now
    uploading = (val) => this.setState({...this.state, uploading: val});


    uploadReturnString = async (file) => {
      var formData = new FormData();
      formData.append('image_file', file);
      let res;

      // For demo
      // return file.preview;

      try {
        res = await fetch('https://us-central1-vugainc.cloudfunctions.net/api3/upload/save', {
          method: 'POST',
          body: formData,
        });

        res = await res.json();
        console.log(res);
        return res.url;

      }
      catch (error) {
        return null;
      }
    };


    render() {
      const {remove, value, onChangeFile} = this.props;
      let that = this;

      return (
        <div>
          <Dropzone
            accept="image/*"
            className={styles.dropAreaWidget}
            multiple={false}
            name={`${value.id}`}
            onDrop={async (filesToUpload, e) => {
              let uploadedUrl;
              that.uploading(true);
              // TODO Upload it now
              try {
                uploadedUrl = await that.uploadReturnString(filesToUpload[0]);
                if (uploadedUrl) {

                  //TODO stop laoding
                  that.uploading(false);

                  return onChangeFile(uploadedUrl);
                }
                return new Error({message: 'Error uploading the data'});

              }
              catch (error) {
                console.log(error);
                // TODO stop loading
                return that.uploading(false);
              }
            }}
          >
            {/** Preview if file available */}
            {!_.isEmpty(value) && <div><img style={{height: "100%", width: "100%", maxHeight: "100%"}} src={value} /></div>}


            {_.isEmpty(value) && <div className={styles.dropAreaPlaceholder}>Drop file here</div>}

          </Dropzone>

          {/**field.meta.touched && field.meta.error && <span >{field.meta.error}</span>**/}

          {this.state.uploading &&
          <div className={styles.loadingIcon}>
            <div className={styles.loadingUploading} />
          </div>
          }


          {!_.isEmpty(value) && <span className={styles.dropDeleteIcon} ><i className='fa fa-trash' onClick={() => remove(value)} /></span>}
        </div>
      );
    }
}


export default class SingleFile extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let that = this;
    const { value } = this.props;
    return (
      <div className='row' style={{height: 'auto'}}>
        <div className="col-md-3 col-sm-12 col-lg-4">
          <FileField
            value={value}
            onChangeFile={(val) => that.props.onChange(val)}
            remove={() => that.props.onChange('')}
          />
        </div>
      </div>);
  }
}
