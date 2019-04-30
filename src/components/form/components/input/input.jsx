import React from 'react';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import classNames from 'classnames';
import Label from '../../../label';
import Hint from '../../../hint';
import ErrorMessage from '../../../error-message';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    const { name, registerInitialValue } = this.props;
    registerInitialValue(name, '');
  }

  handleInput(event) {
    this.setState({ input: event.target.value }, () => {
      const { valueCallback, name } = this.props;
      const { input } = this.state;
      valueCallback(name, input);
    });
  }

  render() {
    const {
      label,
      labelHtmlFor,
      id,
      name,
      autoComplete,
      hint,
      placeholder,
      error,
      width,
      className,
      style
    } = this.props;

    return (
      <React.Fragment>
        {label ? <Label htmlFor={labelHtmlFor}>{label}</Label> : null}
        {hint ? <Hint>{hint}</Hint> : null}
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        <input
          className={classNames(
            'nhsuk-input',
            { 'nhsuk-input--error': error },
            {
              [`nhsuk-input--width-${width}`]: width,
              className
            }
          )}
          placeholder={placeholder}
          style={style}
          id={id || name}
          name={`${name}-hint`}
          type="text"
          onChange={this.handleInput}
          aria-describedby={`${name}-hint`}
          autoComplete={autoComplete}
        />
      </React.Fragment>
    );
  }
}

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  labelHtmlFor: PropTypes.string,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
  hint: PropTypes.string,
  error: PropTypes.string,
  width: PropTypes.number,
  valueCallback: PropTypes.func,
  className: PropTypes.string,
  style: stylePropType,
  registerInitialValue: PropTypes.func
};

Input.defaultProps = {
  name: '',
  id: '',
  label: '',
  labelHtmlFor: '',
  autoComplete: '',
  placeholder: '',
  hint: '',
  error: '',
  width: undefined,
  valueCallback: () => {},
  className: '',
  style: {},
  registerInitialValue: () => {}
};

export default Input;
