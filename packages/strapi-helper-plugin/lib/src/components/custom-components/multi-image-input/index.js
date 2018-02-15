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
      const {removeSection, setPrimary, addSection, value, onChangeFile} = this.props;

      let fileValue = value;
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
              console.log(filesToUpload[0]);
              that.uploading(true);
              // TODO Upload it now
              try {
                uploadedUrl = await that.uploadReturnString(filesToUpload[0]);
                if (uploadedUrl) {

                  // Set the values
                  fileValue = {
                    id: `${getRandomInt(10, 1000)}`, ...value,
                    link: uploadedUrl,
                    typo: filesToUpload[0].type,
                  };

                  //TODO stop laoding
                  that.uploading(false);

                  // Check if it's a new field
                  if (_.isEmpty(value.link)) {
                    addSection(fileValue);
                  }


                  return onChangeFile(fileValue);
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
            {!_.isEmpty(value.link) &&
              <div><img style={{height: "100%", width: "100%", maxHeight: "100%"}} src={value.link} /></div>}
            {_.isEmpty(value.link) && <div className={styles.dropAreaPlaceholder}>Drop files here</div>}

          </Dropzone>

          {/**field.meta.touched && field.meta.error && <span >{field.meta.error}</span>**/}

          {this.state.uploading &&
          <div className={styles.loadingIcon}>
            <div className={styles.loadingUploading} />
          </div>
          }


          {!_.isEmpty(value.link) &&
          <div className={"preview-set-primary"} onClick={() => setPrimary()}>
            {value.primary && <span><i style={{color: '#01b701'}} className='fa fa-star' /> Primary</span>}
            {!value.primary && <span><i className='fa fa-star-o ' /> Set primary</span>}
          </div>
          }
          {!_.isEmpty(value.link) && <span className={styles.dropDeleteIcon} ><i className='fa fa-trash' onClick={() => removeSection(value)} /></span>}
        </div>
      );
    }
}


export default class MultiFiles extends Component {

  constructor(props) {
    super(props);
    this.setPrimary = this.setPrimary.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  setPrimary(index, fieldName) {
    var itemsX;
    let items = !_.isEmpty(this.props.value)? JSON.parse(this.props.value) : [];
    let item = items[index];

    itemsX = items.map((it, ind) => {
      it.primary = false;
      if (it.id === item.id) {
        it.primary = true;
      }
      return it;
    });

    // Update values from parent
    this.props.onChange(JSON.stringify(itemsX));

    // For whatever reason, fuck should i re-render
    this.forceUpdate();
  }

  removeItem(fileToremove) {
    var itemsX;
    let items = !_.isEmpty(this.props.value)? JSON.parse(this.props.value) : [];

    itemsX = items.filter(file=> file.id !== fileToremove.id);
    // Update values from parent
    this.props.onChange(JSON.stringify(itemsX));

  }

  onChangeFile(fileChange) {
    let files = !_.isEmpty(this.props.value)? JSON.parse(this.props.value) : [];

    console.log(files);


    // check if file exists in the files array
    let fileExits = !_.isEmpty(files) && !_.isEmpty(files.filter(file => file.id === fileChange.id));

    if (fileExits) {
      // update if it exits
      files = files.map(file => {
        if (file.id === fileChange.id) {
          return fileChange;
        }
        return file;
      });

    }
    else {
      // Add file
      files.push(fileChange);
    }


    console.log('changing these files ',JSON.stringify(files));
    this.props.onChange(JSON.stringify(files));
  }


  render() {
    let that = this;
    const placeHolderFile = {
      id: `${getRandomInt(10, 1000)}`,
      primary: false,
      link: '',
      typo: 'dummy',
    };

    // Since we're receiveing a List Immutable type
    let files = !_.isEmpty(this.props.value)? JSON.parse(this.props.value) : [];

    // Check it's empty, add dummy
    if(_.isEmpty(files)){
      console.log('it is empty, add dummy now ');
      files.push(placeHolderFile);
    }

    //Check it has dummy
    if(!_.isEmpty(files)){
      if(_.find(files, ['typo', 'dummy']) === undefined){
        files.push(placeHolderFile);
      }
    }


    console.log('From multi select', files);
    console.log('From multi select OG', this.props.value);
    // console.log(this.props.value);

    // Checking if it contains dummy


    return (
      <div className='row' style={{height: 'auto'}}>
        {files.map((file, index) => (
          <div className="col-md-3 col-sm-12 col-lg-4" key={index}>
            <FileField
              value={file}
              addSection={() => files.push({
                id: `${getRandomInt(10, 1000)}`,
                primary: false,
                link: '',
                typo: '',
              })}
              removeSection={() => that.removeItem(file)}
              setPrimary={() => that.setPrimary(index, file)}
              name={`${file.id}`}
              onChangeFile={that.onChangeFile}
            />
          </div>
        ))}
      </div>);
  }
}
