import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  combineValidators,
  isRequired,
  composeValidators,
  matchesField,
} from 'revalidate';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

//MUI stuff
import { Button, makeStyles, Typography, Grid } from '@material-ui/core';

//Local Stuff
import { UpdateToNewPassword } from './authActions';
import TextInput from '../../app/common/form/TextInput';

const validate = combineValidators({
  password: isRequired('Password'),
  confirmPassword: composeValidators(
    isRequired({ message: 'Please confirm your new password' }),
    matchesField('password')({ message: 'Passwords do not match' })
  )(),
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(7),
  },
  title: {
    textAlign: 'center',
    fontFamily: "'Times New Roman', Times, serif",
    fontSize: '1.3rem',
    fontWeight: 400,
  },
  loginBtn: {
    marginTop: theme.spacing(3),
    textTransform: 'capitalize',
  },
  errors: {
    color: '#db2828',
    marginTop: 10,
  },
  field: {
    marginBottom: theme.spacing(2),
  },
}));

const NewPassword = ({ handleSubmit, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { token } = useParams();

  const errors = useSelector((state) => state.auth.errors);

  const onSubmitHandle = (values) => {
    const value = {
      password: values.password,
      token,
    };
    dispatch(UpdateToNewPassword(value, history));
  };

  return (
    <Grid className={classes.root} container justify="center">
      <Grid item xs={1} md={4} />
      <Grid item xs={10} md={4}>
        <Typography className={classes.title}>Reset Passsword</Typography>
        <form onSubmit={handleSubmit(onSubmitHandle)} autoComplete="off">
          <div>
            <Field
              name="password"
              type="password"
              component={TextInput}
              label="Enter a new password"
              id="password"
              fullWidth
            />
          </div>
          <div className={classes.field}>
            <Field
              name="confirmPassword"
              type="password"
              component={TextInput}
              label="Confirm a new password"
              fullWidth
            />
          </div>
          {errors &&
            errors.map((error, index) => (
              <div key={index} className={classes.errors}>
                {error.msg}
              </div>
            ))}
          <Button
            className={classes.loginBtn}
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            Update Password
          </Button>
        </form>
      </Grid>
      <Grid item xs={1} md={4} />
    </Grid>
  );
};

export default reduxForm({
  form: 'newPassword',
  validate,
})(NewPassword);
