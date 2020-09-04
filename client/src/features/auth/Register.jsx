import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {useDispatch, useSelector} from 'react-redux';

//MUI stuff
import {makeStyles} from '@material-ui/core/styles';
import {Button, Typography, Grid} from '@material-ui/core';

//revalidate stuff
import {
  combineValidators,
  isRequired,
  matchesField,
  composeValidators,
  createValidator,
} from 'revalidate';

//local stuff
import TextInput from '../../app/common/form/TextInput';
import {register} from './authActions';

const isValidEmail = createValidator (
  message => value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test (value)) {
      return message;
    }
  },
  'Invalid email address'
);
const validate = combineValidators ({
  firstName: isRequired ('First Name'),
  lastName: isRequired ('Last Name'),
  email: composeValidators (isRequired ('Email'), isValidEmail) (),
  password: isRequired ('Password'),
  confirmPassword: composeValidators (
    isRequired ('Confirm Password'),
    matchesField ('password') ({
      message: 'Passwords do not match',
    })
  ) (),
});

const useStyles = makeStyles (theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing (7),
  },
  title: {
    textAlign: 'center',
    fontFamily: "'Italianno', cursive",
    fontSize: '2.6rem',
    fontWeight: 400,
  },
  registerBtn: {
    marginTop: theme.spacing (3),
  },
  errors: {
    color: '#db2828',
    marginTop: 10,
  },
}));

const Register = ({handleSubmit, history}) => {
  const dispatch = useDispatch ();
  const classes = useStyles ();
  const errors = useSelector (state => state.auth.errors);

  const onSubmitHandle = values => {
    dispatch (register (values, history));
  };
  return (
    <Grid className={classes.root} container justify="center">
      <Grid item xs={1} md={4} />
      <Grid item xs={10} md={4}>
        <Typography className={classes.title}>Register to Elora</Typography>
        <form onSubmit={handleSubmit (onSubmitHandle)} autoComplete="off">
          <div>
            <Field
              id="firstName"
              name="firstName"
              component={TextInput}
              label="First Name"
              fullWidth
            />
          </div>
          <div>
            <Field
              id="lastName"
              name="lastName"
              component={TextInput}
              label="Last Name"
              fullWidth
            />
          </div>
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

          <div>
            <Field
              name="confirmPassword"
              type="password"
              component={TextInput}
              label="Confirm Password"
              id="confirmPassword"
              fullWidth
            />
          </div>
          {errors &&
            errors.map ((error, index) => (
              <div key={index} className={classes.errors}>
                {error.msg}
              </div>
            ))}
          <Button
            className={classes.registerBtn}
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            Register
          </Button>
        </form>
      </Grid>
      <Grid item xs={1} md={4} />
    </Grid>
  );
};
export default reduxForm ({
  form: 'register',
  validate,
}) (Register);
