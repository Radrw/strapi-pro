
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import _ from  'lodash';
import ReactDropZone from 'react-dropzone';

const FLAVOURS = [
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Vanilla', value: 'vanilla' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Caramel', value: 'caramel' },
  { label: 'Cookies and Cream', value: 'cookiescream' },
  { label: 'Peppermint', value: 'peppermint' },
];

const WHY_WOULD_YOU = [
  { label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true },
].concat(FLAVOURS.slice(1));

export default class MultiSelectField extends React.PureComponent {


  // noinspection JSAnnotator
    propTypes: {
        // noinspection JSAnnotator
        onChange: PropTypes.func,
        // noinspection JSAnnotator
        className: PropTypes.string
	}

    constructor(props){
      super(props);
      this.state = {
        removeSelected: true,
        disabled: false,
        crazy: false,
        stayOpen: false,
        value: [],
        rtl: false,
      };

      this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange (value) {
      //const val = value.toString();
      console.log('You\'ve selected:', value);
      this.props.onChange(value);
    }

    render () {
      console.log(this.props.value);
      const { crazy, disabled, stayOpen } = this.state;
      //const value = !_.isEmpty(this.props.value) ? JSON.parse(this.props.value) : [];
      const value = this.props.value;
      const options = crazy ? WHY_WOULD_YOU : FLAVOURS;
      return (
        <div>
          <Select
            closeOnSelect={!stayOpen}
            disabled={disabled}
            multi
            onChange={this.handleSelectChange}
            options={options}
            placeholder="Select categories(s)"
            removeSelected={this.state.removeSelected}
            rtl={this.state.rtl}
            simpleValue
            value={value}
          />
        </div>
      );
    }
}
