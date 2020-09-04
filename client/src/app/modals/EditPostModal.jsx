import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from './modalActions';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PostForm from '../../features/post/PostForm/PostForm';

const useStyles = makeStyles((theme) => ({}));

const EditPostModal = ({ postId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  console.log(postId);
  return (
    <Modal
      open={true}
      onClose={() => dispatch(closeModal())}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div>{postId && <PostForm postId={postId} />}</div>
    </Modal>
  );
};

export default EditPostModal;
