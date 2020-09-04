import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CommentIcon from '@material-ui/icons/Comment';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const useStyles = makeStyles((theme) => ({
  menuItems: {
    paddingTop: '1px',
    paddingBottom: '1px',
    fontSize: '0.87rem',
  },
  notification: {
    paddingTop: '1px',
    paddingBottom: '1px',
    fontSize: '0.87rem',
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const MenuItems = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <MenuItem divider className={classes.menuItems}>
        <Avatar
          alt="user img"
          src="https://randomuser.me/api/portraits/women/71.jpg"
          style={{ marginLeft: '20px' }}
        />{' '}
        <span style={{ marginLeft: '7px', fontSize: '0.9rem' }}>Kim Jack</span>
      </MenuItem>
      <MenuItem className={classes.menuItems}>
        <AddCircleIcon style={{ marginRight: '48px' }} />
        <p>Add Post</p>
      </MenuItem>
      <MenuItem className={classes.notification}>
        <IconButton
          style={{ marginRight: '40px', marginLeft: '-15px' }}
          aria-label="show 11 new notifications"
          color="inherit"
        >
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem className={classes.menuItems}>
        <BookmarkBorderIcon style={{ marginRight: '50px' }} />
        <p>Bookmark</p>
      </MenuItem>
      <MenuItem className={classes.menuItems}>
        <CommentIcon style={{ marginRight: '50px' }} />
        <p>My Post</p>
      </MenuItem>
      <MenuItem className={classes.menuItems}>
        <PersonIcon style={{ marginRight: '50px' }} />
        <p>My Profile</p>
      </MenuItem>
      <MenuItem className={classes.menuItems}>
        <SettingsIcon style={{ marginRight: '50px' }} />
        <p>Settings</p>
      </MenuItem>
      <MenuItem className={classes.menuItems}>
        <PowerSettingsNewIcon style={{ marginRight: '50px' }} />
        <p>Sign Out</p>
      </MenuItem>
    </Fragment>
  );
};

export default MenuItems;
