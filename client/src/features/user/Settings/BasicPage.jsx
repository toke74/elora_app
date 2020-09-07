import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import TextInput from '../../../app/common/form/TextInput';
import RadioInput from '../../../app/common/form/RadioInput';
import DateInput from '../../../app/common/form/DateInput';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '80%',
    padding: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow:
      '0px 0px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 0px 3px 0px rgba(0,0,0,0.12)',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    marginBottom: theme.spacing(4),
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  gender: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(4),
  },
  birthDate: {
    marginBottom: theme.spacing(2),
  },
  updateProfileBtn: {
    textAlign: 'center',
  },
}));
const BasicPage = ({ pristine, submitting, handleSubmit, createProfile }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onSubmitHandle = (values) => {
    dispatch(createProfile(values));
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmitHandle)}
      className={classes.paper}
      autoComplete="off"
    >
      <h3 style={{ color: '#2bbbff', textAlign: 'center' }}>Basic Info</h3>
      <div className={classes.field}>
        <Field
          name="firstName"
          type="text"
          component={TextInput}
          label="First Name"
          fullWidth
        />
      </div>

      <div className={classes.field}>
        <Field
          name="lastName"
          type="text"
          component={TextInput}
          label="Last Name"
          fullWidth
        />
      </div>

      <div className={classes.field}>
        <Field
          fullWidth
          name="origin"
          component={TextInput}
          label="Originaly From"
        />
      </div>

      <label>Gender: </label>
      <div className={classes.gender}>
        <Field
          name="gender"
          type="radio"
          value="Male"
          label="Male"
          component={RadioInput}
        />

        <Field
          name="gender"
          type="radio"
          value="Female"
          label="Female"
          component={RadioInput}
        />
      </div>

      <div className={classes.birthDate}>
        <label>Date Of Brith</label>
        <Field
          name="DateOfBrith"
          component={DateInput}
          placeholder="Date of Birth"
          // dateFormat="dd LLL yyyy"
          showYearDropdown={true}
          showMonthDropdown={true}
          dropdownMode="select"
        />
      </div>
      <div className={classes.updateProfileBtn}>
        <Button
          style={{ textTransform: 'capitalize' }}
          variant="contained"
          color="primary"
          type="submit"
          disabled={pristine || submitting}
        >
          Update Profile
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'userProfile',
  enableReinitialize: true,
  destroyOnUnmount: false,
})(BasicPage);
