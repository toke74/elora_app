import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';

//MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import ReplyIcon from '@material-ui/icons/Reply';
//local stuff
import TextArea from '../../../app/common/form/TextArea';
import { TextField } from '@material-ui/core';

const validate = combineValidators({
  text: isRequired({ message: 'Please enter a Comment' }),
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(5),
  },
  replyBtn: {
    // color: '#c5c5c5',
    textTransform: 'capitalize',
    marginTop: theme.spacing(1),
  },
  editIcon: {
    marginRight: '7px',
    fontSize: '1.1rem',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

const PostDetaiedCommentForm = ({
  handleSubmit,
  createComment,
  postId,
  parentId,
  dispatch,
  reset,
  closeForm,
  width,
  left,
}) => {
  const classes = useStyles();

  const handleCommentSubmit = (values) => {
    const newComment = {
      parentId,
      text: values.text,
    };
    dispatch(createComment(postId, newComment));
    reset();
    if (parentId !== 0) {
      closeForm();
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(handleCommentSubmit)}>
      <Field
        width={width}
        left={left}
        name="text"
        type="text"
        component={TextArea}
        rows={2}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ marginLeft: left }}
        className={classes.replyBtn}
      >
        <ReplyIcon className={classes.editIcon} />Reply
      </Button>
    </form>
  );
};

export default reduxForm({ Fields: 'comment', validate })(
  PostDetaiedCommentForm
);

//  PostDetaiedCommentForm
