import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../app/common/form/TextInput';
import { Button, makeStyles, Typography, Grid } from '@material-ui/core';
import {
  combineValidators,
  isRequired,
  createValidator,
  composeValidators,
} from 'revalidate';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authActions';

const isValidEmail = createValidator(
  (message) => (value) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message;
    }
  },
  'Invalid email address'
);

const validate = combineValidators({
  email: composeValidators(isRequired('Email'), isValidEmail)(),
  password: isRequired('Password'),
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(7),
  },
  title: {
    textAlign: 'center',
    fontFamily: "'Italianno', cursive",
    fontSize: '2.6rem',
    fontWeight: 400,
  },
  loginBtn: {
    marginTop: theme.spacing(3),
  },
  errors: {
    color: '#db2828',
    marginTop: 10,
  },
}));
const Login = ({ handleSubmit, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.auth.errors);

  const onSubmitHandle = (values) => {
    dispatch(login(values, history));
  };

  return (
    <Grid className={classes.root} container justify="center">
      <Grid item xs={1} md={4} />
      <Grid item xs={10} md={4}>
        <Typography className={classes.title}>Login to Elora</Typography>
        <form onSubmit={handleSubmit(onSubmitHandle)} autoComplete="off">
          <div>
            <Field
              id="email"
              name="email"
              component={TextInput}
              label="Email"
              fullWidth
            />
          </div>
          <div>
            <Field
              name="password"
              type="password"
              component={TextInput}
              label="Password"
              id="password"
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
            Login
          </Button>
        </form>
      </Grid>
      <Grid item xs={1} md={4} />
    </Grid>
  );
};

export default reduxForm({
  form: 'login',
  validate,
})(Login);
