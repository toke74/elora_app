import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from './modalActions';

import Modal from '@material-ui/core/Modal';
import PostForm from '../../features/post/PostForm/PostForm';

const EditPostModal = ({ postId }) => {
  const dispatch = useDispatch();
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
