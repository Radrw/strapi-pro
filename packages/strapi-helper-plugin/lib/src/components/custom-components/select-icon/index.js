
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import _ from  'lodash';
import { Icons } from './fa-icons';

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

	renderOption = (option) =>{
	  return <span style={{fontSize: '1.3em'}}><i className={`fa ${option.value}`} />  {option.value}</span>;
	}

    valueComponent = (option) =>{
  	//console.log('Value', option)
      return <span style={{fontSize: '1.3em', paddingLeft: '10px'}}><i className={`fa ${option.value.value}`} />  {option.value.value}</span>;
    }

    render () {
      const { crazy, disabled, stayOpen } = this.state;
      const value = this.props.value;
      const options = crazy ? WHY_WOULD_YOU : FLAVOURS;
      console.log(this.props.value);

      return (
        <div>
          <Select
            closeOnSelect={!stayOpen}
            disabled={disabled}
            optionRenderer={this.renderOption}
            onChange={this.handleSelectChange}
            valueComponent={this.valueComponent}
            options={Icons}
            placeholder="Select icon"
            removeSelected={this.state.removeSelected}
            rtl={this.state.rtl}
            simpleValue
            value={value}
          />
        </div>
      );
    }
}
