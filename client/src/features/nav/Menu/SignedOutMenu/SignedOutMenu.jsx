import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(0),
    textTransform: 'capitalize',
  },
  signupButton: {
    textTransform: 'capitalize',
  },
}));

const SignedOutMenu = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Button
        className={classes.menuButton}
        size="small"
        color="inherit"
        // variant="outlined"
        component={Link}
        to="/login"
      >
        Login
      </Button>

      <Button
        className={classes.signupButton}
        color="inherit"
        // variant="outlined"
        component={Link}
        to="/register"
      >
        Register
      </Button>
    </Fragment>
  );
};

export default SignedOutMenu;
