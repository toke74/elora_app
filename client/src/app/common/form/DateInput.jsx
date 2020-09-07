import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({
  input,
  width,
  type,
  placeholder,
  onBlur,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <div>
      <DatePicker
        {...rest}
        placeholderText={placeholder}
        selected={input.value ? new Date(input.value) : null}
        onChange={input.onChange}
        // onBlur={(e, val) => onBlur(val)}
        onBlur={input.onBlur}
        onChangeRaw={(e) => e.preventDefault()}
      />

      {touched && error && <label color="red">{error}</label>}
    </div>
  );
};

export default DateInput;
