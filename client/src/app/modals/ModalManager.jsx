import React from 'react';
import { useSelector } from 'react-redux';
import AddPostModal from './AddPostModal';
import EditPostModal from './EditPostModal';

const ModalManager = () => {
  const modalLookup = {
    AddPostModal,
    EditPostModal,
  };
  const currentModal = useSelector((state) => state.modals);
  let renderedModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
};

export default ModalManager;
