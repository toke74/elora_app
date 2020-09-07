import React from 'react';

//MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import { Typography } from '@material-ui/core';
import { MenuList, MenuItem } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

  flexContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'row',
      padding: 0,
      textAlign: 'center',
    },
  },
  paperH: {
    width: '50%',
    padding: theme.spacing(1, 2),
    textAlign: 'center',
    backgroundColor: '#2bbbff',
    marginBottom: 0,
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
      width: '100%',
    },
  },
  paper: {
    width: '50%',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      backgroundColor: '#2bbbff',
      color: '#fff',
      padding: theme.spacing(1, 2),
    },
  },
}));
const SettingsNavbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paperH}>
        <Typography variant="h5" component="h6">
          <PersonIcon style={{ marginRight: 20 }} />
          Profile
        </Typography>
      </Paper>
      <Paper className={classes.paper}>
        <MenuList className={classes.flexContainer}>
          <MenuItem component={Link} to="/settings/basic">
            Basic
          </MenuItem>

          <MenuItem component={Link} to="/settings/about">
            About me
          </MenuItem>
          <MenuItem component={Link} to="/settings/photo">
            Photo
          </MenuItem>
          <MenuItem component={Link} to="/settings/account">
            My Account
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
};

export default SettingsNavbar;
