import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextInput = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    label={label}
    error={touched && error && error.length > 0}
    {...input}
    {...custom}
  />
);

export default TextInput;
