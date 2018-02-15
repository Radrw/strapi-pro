import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import _ from 'lodash';
import scriptLoader from 'react-async-script-loader';

class LocationInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mapsLoaded: false, address: 'San Francisco, CA', latLng: {} };
    //this.onChange = (address) => this.setState({ address });
    this.onChange = this.onChange.bind(this);

  }

  onChange(address){
    let currentLoc = !_.isEmpty(this.props.value)? JSON.parse(this.props.value) : { address: '', latLng: {}};

    currentLoc.address = address;

    geocodeByAddress(address).then(results => getLatLng(results[0])).then(latLng => {
      currentLoc.latLng = latLng; console.log('Success', latLng);
      this.props.onChange(JSON.stringify(currentLoc));
    }).catch(error => console.error('Error', error));

    // Publish the results
    this.props.onChange(JSON.stringify(currentLoc));
  }

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.setState({mapsLoaded: true});
      }
      else this.props.onError();
    }
  }

  componentDidMount () {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({mapsLoaded: true});
    }
  }

  render() {
    const currentLoc = !_.isEmpty(this.props.value)? JSON.parse(this.props.value) : { address: '' };
    const inputProps = {
      value: currentLoc.address,
      onChange: this.onChange,
    };

    if(this.state.mapsLoaded){
      return (
        <div className={this.props.className} style={{zIndex: 999}}>
          <PlacesAutocomplete inputProps={inputProps} />
        </div>
      );
    }
    else {
      return <text>Loading Google Maps</text>;
    }

  }
}

export default scriptLoader('https://maps.googleapis.com/maps/api/js?key=AIzaSyDn0rGpWmYquNfoWZQThWU68Z4UeyKPQyw&libraries=places')(LocationInput);
