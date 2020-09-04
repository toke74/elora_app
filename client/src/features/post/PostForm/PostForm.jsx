import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { useHistory } from 'react-router-dom';

//MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthLessThan,
} from 'revalidate';

import TextArea from '../../../app/common/form/TextArea';
import { useDispatch, connect } from 'react-redux';
import { createPost, updatePost } from '../postActions';

const validate = combineValidators({
  text: composeValidators(
    isRequired({ message: 'Please enter a post' }),
    hasLengthLessThan(480)({
      message: 'Must be 480 characters or less',
    })
  )(),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '450px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5, 5, 0, 5),
    [theme.breakpoints.down('md')]: {
      width: '45%',
    },
  },
  postBtn: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    textTransform: 'capitalize',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.7rem',
      paddingRight: theme.spacing(1),
    },
  },
  btns: {
    display: 'flex',
    justifyContent: 'center',
  },
  addIcon: {
    marginRight: '7px',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

const PostForm = ({ handleSubmit, initialValues }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  let history = useHistory();

  const onFormSubmit = (values) => {
    if (initialValues && initialValues._id) {
      dispatch(updatePost(values, history));
    } else {
      dispatch(createPost(values, history));
    }
  };

  return (
    <form className={classes.paper} onSubmit={handleSubmit(onFormSubmit)}>
      <Field
        name="text"
        component={TextArea}
        rows={4}
        type="text"
        placeholder="What's happening?"
      />
      <div className={classes.btns}>
        {initialValues && initialValues._id ? (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.postBtn}
          >
            <EditIcon className={classes.addIcon} /> Update
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.postBtn}
          >
            <AddIcon className={classes.addIcon} /> Add Post
          </Button>
        )}
      </div>
    </form>
  );
};

const mapStateToProps = (state, ownprops) => {
  const { postId } = ownprops;

  let post = {};
  const { posts } = state.posts;

  if (postId && posts.length > 0) {
    post = posts.filter((post) => post._id === postId)[0];
  }

  return {
    initialValues: post,
  };
};
export default connect(mapStateToProps)(
  reduxForm({ form: 'PostForm', validate, enableReinitialize: true })(PostForm)
);
