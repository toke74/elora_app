import React, { Fragment } from 'react';

//MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '80%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
    color: theme.palette.text.secondary,
    boxShadow:
      '0px 0px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 0px 3px 0px rgba(0,0,0,0.12)',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  mainPhoto: {
    display: 'flex',
    flexDirection: 'column',
    height: 185,
    width: 160,
    boxShadow:
      '0px 0px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 0px 3px 0px rgba(0,0,0,0.12)',
    marginRight: 15,
  },
  mainBtn: {
    textTransform: 'capitalize',
    fontSize: '1rem',
  },
  imgPreview: {
    height: '150px',
    width: '160px',
    minHeight: '150px',
    minWidth: '160px',
  },
}));

const UserPhotos = ({ user, setMainPhoto, dispatch, deletePhoto }) => {
  const classes = useStyles();

  const notMainPhoto = user && user.image.filter((img) => img !== user.avatar);

  return (
    <Fragment>
      <h4>All Profile Photos</h4>
      <div style={{ display: 'flex' }}>
        <div className={classes.mainPhoto}>
          <img
            className={classes.imgPreview}
            src={user.avatar || '/assets/user.png'}
            alt="main photo"
          />
          <Button color="primary" className={classes.mainBtn}>
            Main Photo
          </Button>
        </div>

        {user &&
          notMainPhoto.map((img, index) => (
            <div key={index} className={classes.mainPhoto}>
              <img
                className={classes.imgPreview}
                src={img || '/assets/user.png'}
                alt="Profiles Photo"
              />
              <ButtonGroup
                variant="text"
                color="primary"
                aria-label="contained primary button group"
                style={{ marginBottom: 10 }}
              >
                <Button
                  onClick={() => dispatch(setMainPhoto(img))}
                  style={{
                    paddingLeft: 24,
                    paddingRight: 24,
                    textTransform: 'capitalize',
                  }}
                >
                  Main
                </Button>
                <Button onClick={() => dispatch(deletePhoto(img))}>
                  <DeleteIcon style={{ paddingLeft: 20 }} />
                </Button>
              </ButtonGroup>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default UserPhotos;
