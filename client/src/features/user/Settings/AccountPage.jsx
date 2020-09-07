import React, { Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  combineValidators,
  composeValidators,
  isRequired,
  matchesField,
} from 'revalidate';
import { makeStyles } from '@material-ui/core/styles';

import TextInput from '../../../app/common/form/TextInput';
import { Button } from '@material-ui/core';
import { changePassword } from '../../auth/authActions';

const validate = combineValidators({
  password: isRequired({ message: 'Please enter a password' }),
  confirmPassword: composeValidators(
    isRequired({ message: 'Please confirm your new password' }),
    matchesField('password')({ message: 'Passwords do not match' })
  )(),
});
const useStyles = makeStyles((theme) => ({
  paper: {
    width: '80%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
    boxShadow:
      '0px 0px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 0px 3px 0px rgba(0,0,0,0.12)',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },

  field: {
    marginBottom: theme.spacing(2),
  },
  error: {
    color: '#d14a4a',
    marginBottom: theme.spacing(2),
  },
  updateProfileBtn: {
    textAlign: 'center',
  },
}));
const AccountPage = ({ error, invalid, submitting, handleSubmit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.auth.errors);

  const handlChangePassword = (values) => {
    dispatch(changePassword(values));
  };
  return (
    <Fragment>
      <div>
        <form
          className={classes.paper}
          autoComplete="off"
          onSubmit={handleSubmit(handlChangePassword)}
        >
          <h4
            style={{
              textAlign: 'center',
              marginTop: 0,
              marginBottom: 5,
              color: '#2bbbff',
            }}
          >
            Change password
          </h4>
          <p>Use this form to change your password</p>
          <div className={classes.field}>
            <Field
              name="password"
              type="password"
              component={TextInput}
              label="New Password"
              fullWidth
            />
          </div>

          <div className={classes.field}>
            <Field
              name="confirmPassword"
              type="password"
              component={TextInput}
              label="Confirm Password"
              fullWidth
            />
          </div>

          {errors &&
            errors.map((error) => (
              <div className={classes.error}>{error.msg}</div>
            ))}

          <div className={classes.updateProfileBtn}>
            <Button
              style={{ textTransform: 'capitalize' }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default reduxForm({ form: 'account', validate })(AccountPage);
