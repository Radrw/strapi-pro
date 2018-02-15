/**
 *
 * InputSearch
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';
import cn from 'classnames';

import styles from './styles.scss';

class InputSearch extends React.Component {
 state = { isFocused: false };

 handleBlur = (e) => {
   this.setState({ isFocused: !this.state.isFocused });
   this.props.onBlur(e);
 }

 handleFocus = (e) => {
   this.setState({ isFocused: !this.state.isFocused });
   this.props.onFocus(e);
 }

 render() {
   const {
     autoFocus,
     className,
     deactivateErrorHighlight,
     disabled,
     error,
     name,
     onChange,
     placeholder,
     style,
     tabIndex,
     value,
   } = this.props;

   return (
     <div className={cn(styles.inputSearch, 'input-group', !isEmpty(className) && className)} style={style}>
       <span className={cn(
           'input-group-addon',
           styles.addonSearch,
           this.state.isFocused && styles.addonFocus,
           !deactivateErrorHighlight && error && styles.errorAddon,
         )}
       />
       <FormattedMessage id={placeholder} defaultMessage={placeholder}>
         {(message) => (
           <input
             autoFocus={autoFocus}
             className={cn(
               'form-control',
               !deactivateErrorHighlight && error && 'is-invalid',
               !deactivateErrorHighlight && error && this.state.isFocused && styles.invalidSearch,
             )}
             disabled={disabled}
             id={name}
             name={name}
             onBlur={this.handleBlur}
             onChange={onChange}
             onFocus={this.handleFocus}
             placeholder={message}
             tabIndex={tabIndex}
             type="text"
             value={value}
           />
         )}
       </FormattedMessage>
     </div>
   );
 }
}

InputSearch.defaultProps = {
 autoFocus: false,
 className: '',
 deactivateErrorHighlight: false,
 disabled: false,
 error: false,
 onBlur: () => {},
 onFocus: () => {},
 placeholder: 'app.utils.placeholder.defaultMessage',
 style: {},
 tabIndex: '0',
};

InputSearch.propTypes = {
 autoFocus: PropTypes.bool,
 className: PropTypes.string,
 deactivateErrorHighlight: PropTypes.bool,
 disabled: PropTypes.bool,
 error: PropTypes.bool,
 onBlur: PropTypes.func,
 onChange: PropTypes.func.isRequired,
 onFocus: PropTypes.func,
 name: PropTypes.string.isRequired,
 placeholder: PropTypes.string,
 style: PropTypes.object,
 tabIndex: PropTypes.string,
 value: PropTypes.string.isRequired,
};

export default InputSearch;
