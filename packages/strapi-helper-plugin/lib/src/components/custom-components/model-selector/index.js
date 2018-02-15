// noinspection JSAnnotator
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import _ from  'lodash';

// noinspection JSAnnotator
export default class CatSelector extends React.PureComponent {


    propTypes: {
        onChange: PropTypes.func,
        className: PropTypes.string,
        modelUrl: PropTypes.string,
        placeholder: PropTypes.string,
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
		    cats: [],
      };
      this.handleSelectChange = this.handleSelectChange.bind(this);
    }

  getCategories = async () => {
  	let cats = [];

  	try {
  		cats = await fetch(this.props.modelUrl, { method: 'GET'} );
      cats = await cats.json();
      // console.log('Cats here', cats);
      this.setState({ cats });
    }
    catch (error) {
  		// console.log('Error fetching cats', error)
      this.setState({ cats });
    }

  }

  async componentWillMount(){
    await this.getCategories();
  }

  handleSelectChange (value) {
    // console.log('You\'ve selected:', value);
    this.props.onChange(value);
  }

  render () {
    // console.log(this.props.value);
    const value = this.props.value;
    const options = !_.isEmpty(this.state.cats)? this.state.cats : [{_id: '', name: ''}];

    return (
      <div>
        <Select
          multi
          onChange={this.handleSelectChange}
          options={options.map(cat => {return {value: cat._id, label: cat.name};}) || []}
          placeholder={this.props.placeholder}
          removeSelected={this.state.removeSelected}
          rtl={this.state.rtl}
          simpleValue
          value={value}
        />
      </div>
    );
  }
}
