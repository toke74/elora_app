import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// MUI stuff
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

//local components
import SignedInMenu from '../Menu/SignedInMenu/SignedInMenu';
import SignedOutMenu from '../Menu/SignedOutMenu/SignedOutMenu';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontFamily: 'Times New Roman',
    color: '#fff',
    textDecoration: 'none',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '35%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  inputRoot: {
    color: 'inherit',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  proffileBtn: {
    marginLeft: theme.spacing(2),
    color: 'white',
    fontSize: '0.9rem',
    textTransform: 'capitalize',
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div className={classes.grow}>
      <AppBar color="primary" className={classes.navbar}>
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            edge="start"
            className={classes.title}
            variant="h4"
          >
            Elora
          </Typography>
          <Button
            color="primary"
            style={{ marginLeft: '15px' }}
            className={classes.proffileBtn}
            component={Link}
            to="/profiles"
          >
            Profiles
          </Button>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          {user && isAuthenticated ? (
            <SignedInMenu user={user} dispatch={dispatch} />
          ) : (
            <SignedOutMenu />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Navbar;
