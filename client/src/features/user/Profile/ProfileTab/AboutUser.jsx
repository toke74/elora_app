import React from 'react';
import moment from 'moment';

//MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import SchoolIcon from '@material-ui/icons/School';
import HomeIcon from '@material-ui/icons/Home';
import RoomIcon from '@material-ui/icons/Room';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CakeIcon from '@material-ui/icons/Cake';
import WebIcon from '@material-ui/icons/Web';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    marginLeft: 15,
    fontFamily: "'Times New Roman', Times, serif",
    paddingBottom: theme.spacing(2),
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  aboutUserHeade: {
    textAlign: 'center',
  },
  aboutUserInfo: {
    color: '#7f8e9a',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  leftInfo: {
    marginRight: 'auto',
  },
  RightInfo: {
    marginRight: theme.spacing(1),
  },
  icons: {
    marginRight: 10,
    fontSize: '1.3rem',
  },
  aboutDetails: {
    fontFamily: "'Times New Roman', Times, serif",
    marginBottom: theme.spacing(2),
  },
}));

const AboutUser = ({ profile }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.aboutUserHeade}>
        <p>
          <EmojiEmotionsIcon color="primary" className={classes.icons} />
          {`About ${profile.user.firstName} ${profile.user.lastName}`}{' '}
        </p>
      </div>
      <div className={classes.aboutUserInfo}>
        <div className={classes.leftInfo}>
          <p>
            <BusinessCenterIcon
              color="primary"
              className={classes.icons}
            />{' '}
            Work at {profile.occupation || 'not provided'}
          </p>
          <p>
            <SchoolIcon color="primary" className={classes.icons} /> Studied at{' '}
            {profile.school || 'not provided'}
          </p>
          <p>
            <HomeIcon color="primary" className={classes.icons} /> Lives in{' '}
            {profile.currentCity || 'not provided'}
          </p>
          <p>
            <RoomIcon color="primary" className={classes.icons} /> Originally
            from {profile.origin || 'not provided'}
          </p>
          <p>
            <FavoriteIcon color="primary" className={classes.icons} /> {' '}
            {profile.relationshipStatus || 'No Relationship Info'}
          </p>
          <p>
            <CakeIcon color="primary" className={classes.icons} /> Birth Date:{' '}
            {(profile.DateOfBrith &&
              moment(profile.DateOfBrith).format('Do MMMM ')) ||
              'Not Provided'}
          </p>
          <p>
            <WebIcon color="primary" className={classes.icons} /> Website{' '}
            {profile.website || 'No  Provided'}
          </p>
        </div>
        <div className={classes.RightInfo}>
          <p>Gender :- {profile.gender || 'Not Provided'}</p>
          <p>
            Member Since: {moment(profile.user.createdAt).format('DD MMM YYYY')}
          </p>

          <h4>
            {' '}
            <FavoriteBorderIcon color="primary" className={classes.icons} />
            Interests
          </h4>
          {profile.interests.length === 0 ? (
            <p>No interests</p>
          ) : (
            <ul style={{ listStyleType: 'circle', fontSize: '1.1rem' }}>
              {profile.interests &&
                profile.interests.map((interest, index) => (
                  <li key={index} className="interest">
                    {interest}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
      <div className={classes.aboutDetails}>
        <p style={{ lineHeight: 1.5 }}>{profile.about}</p>
      </div>
    </div>
  );
};

export default AboutUser;
