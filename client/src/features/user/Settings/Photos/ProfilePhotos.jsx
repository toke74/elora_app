import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

//MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

//local stuff
import DropzoneInput from './DropzoneInput';
import UserPhotos from './UserPhotos';
import { updateUserAvatar, setMainPhoto, deletePhoto } from '../../userActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '90%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
    color: theme.palette.text.secondary,
    boxShadow:
      '0px 0px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 0px 3px 0px rgba(0,0,0,0.12)',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  imgPreview: {
    height: '160px',
    width: '200px',
  },
}));

const ProfilePhotos = () => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleUploadImage = async () => {
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'elora-app');
    data.append('cloud_name', 'shalpeace');

    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/shalpeace/image/upload',
      data
    );
    handleCancelPreview();
    if (res.data) {
      const avatar = res.data.url;
      dispatch(updateUserAvatar(avatar));
    }
  };

  const handleCancelPreview = () => {
    setFiles([]);
  };

  return (
    <div className={classes.paper}>
      <h4
        style={{
          textAlign: 'center',
          marginTop: 0,
          marginBottom: 5,
          color: '#2bbbff',
        }}
      >
        Your Photos
      </h4>
      <Divider />
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <p>Step 1 - Add Photo</p>
          <DropzoneInput setFiles={setFiles} />
        </Grid>
        <Grid item md={6} xs={12}>
          <p>Step 2- Preview & Upload</p>
          {files.length > 0 && (
            <Fragment>
              <img
                src={files[0].preview}
                className={classes.imgPreview}
                alt="preview"
              />
              <ButtonGroup
                variant="text"
                color="primary"
                aria-label="contained primary button group"
                style={{ marginBottom: 10 }}
              >
                <Button
                  onClick={handleUploadImage}
                  style={{ width: '100px' }}
                  positive
                >
                  <CheckIcon />
                </Button>
                <Button
                  onClick={handleCancelPreview}
                  style={{ width: '100px' }}
                >
                  <CloseIcon />
                </Button>
              </ButtonGroup>
            </Fragment>
          )}
        </Grid>
      </Grid>

      <Divider />
      <UserPhotos
        user={user}
        setMainPhoto={setMainPhoto}
        deletePhoto={deletePhoto}
        dispatch={dispatch}
      />
    </div>
  );
};

export default ProfilePhotos;
