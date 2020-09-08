import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';

//MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import MoreIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import MailIcon from '@material-ui/icons/Mail';

//local stuff
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';
import { openModal } from '../../../../app/modals/modalActions';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
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
  fab: {
    margin: theme.spacing(0),
  },
}));

export default function SignedInMenu({ user, dispatch }) {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  let history = useHistory();

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <Fragment>
      <div className={classes.grow} />
      <div className={classes.sectionDesktop}>
        <IconButton
          style={{ marginRight: '10px', fontSize: '2rem' }}
          aria-label="add post"
          color="inherit"
        >
          <Tooltip title="Add Post" aria-label="add">
            <AddCircleIcon
              onClick={() => dispatch(openModal('AddPostModal'))}
              style={{ fontSize: '2rem' }}
            />
          </Tooltip>
        </IconButton>

        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>

        <IconButton
          style={{ marginRight: '30px' }}
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={6} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <Avatar alt="user img" src={user.avatar || '/assets/user.png'} />
          <span style={{ marginLeft: '7px', fontSize: '0.9rem' }}>
            {user.firstName} {user.lastName}
          </span>
          <ArrowDropDownIcon />
        </IconButton>
      </div>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MenuIcon />
          {/* <MoreIcon /> */}
        </IconButton>
      </div>
      <MobileMenu
        mobileMenuId={mobileMenuId}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        user={user}
        dispatch={dispatch}
        history={history}
      />
      <DesktopMenu
        anchorEl={anchorEl}
        menuId={menuId}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        user={user}
        dispatch={dispatch}
        history={history}
      />
    </Fragment>
  );
}
