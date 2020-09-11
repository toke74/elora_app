import React, {Fragment} from 'react';

//MUI stuff
import {makeStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CommentIcon from '@material-ui/icons/Comment';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

//local stuff
import {logout} from '../../../auth/authActions';
import {openModal} from '../../../../app/modals/modalActions';

const useStyles = makeStyles (theme => ({
  desktopMenu: {
    marginTop: theme.spacing (6),
    maxHeight: '46rem',
    width: '35%',
  },
  menuItems: {
    paddingTop: '1px',
    paddingBottom: '1px',
    fontSize: '0.8rem',
  },
  link: {
    textDecoration: 'none',
    color: '#000',
    fontSize: '0.8rem',
  },
}));

const DesktopMenu = ({
  anchorEl,
  menuId,
  isMenuOpen,
  handleMenuClose,
  user,
  history,
  dispatch,
}) => {
  const classes = useStyles ();

  return (
    <Fragment>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        id={menuId}
        keepMounted
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        open={isMenuOpen}
        onClose={handleMenuClose}
        className={classes.desktopMenu}
      >
        <MenuItem divider className={classes.menuItems}>
          <Avatar
            alt="user img"
            src={user.avatar || '/assets/user.png'}
            style={{marginLeft: '20px'}}
          />
          {' '}
          <span style={{marginLeft: '7px', fontSize: '0.9rem'}}>
            {user.firstName} {user.lastName}
          </span>
        </MenuItem>
        <MenuItem
          onClick={() => dispatch (openModal ('AddPostModal'))}
          className={classes.menuItems}
        >
          <AddCircleIcon color="primary" style={{marginRight: '48px'}} />
          <p>Add Post</p>
        </MenuItem>

        <a className={classes.link} href="/my-post">
          <MenuItem className={classes.menuItems}>
            <CommentIcon color="primary" style={{marginRight: '50px'}} />
            <p>My Post</p>
          </MenuItem>
        </a>

        <a className={classes.link} href={`/profile/${user._id}`}>
          <MenuItem className={classes.menuItems}>
            <PersonIcon color="primary" style={{marginRight: '50px'}} />
            <p>My Profile</p>
          </MenuItem>
        </a>

        <a className={classes.link} href="/settings">
          <MenuItem className={classes.menuItems}>
            <SettingsIcon color="primary" style={{marginRight: '50px'}} />
            <p>Settings</p>
          </MenuItem>
        </a>

        <MenuItem
          onClick={() => dispatch (logout (history))}
          className={classes.menuItems}
        >
          <PowerSettingsNewIcon color="primary" style={{marginRight: '50px'}} />
          <p>Sign Out</p>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default DesktopMenu;
