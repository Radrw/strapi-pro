import React, { PureComponent } from 'react';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';
import _ from 'lodash';


export default class htmlInput extends PureComponent {
    // noinspection JSAnnotator
    propTypes: {
        // noinspection JSAnnotator
        onChange: PropTypes.func
    }

    constructor(props){
      super(props);
      this.state = { value : !_.isEmpty(this.props.value)? RichTextEditor.createValueFromString(this.props.value, 'html'): RichTextEditor.createEmptyValue() };
      this.onChange = this.onChange.bind(this);
    }

    render(){

      //const value = !_.isEmpty(this.props.value)? RichTextEditor.createValueFromString(this.props.value, 'html') : RichTextEditor.createEmptyValue();
      return (<RichTextEditor
        value={this.state.value}
        onChange={this.onChange}
      />);

    }

    onChange(value){
      this.setState({value: value});
      //if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange( value.toString('html') );

    }

}