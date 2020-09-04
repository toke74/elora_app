import { OPEN_MODAL, CLOSE_MODAL } from './modalConstants';

const initialState = null;

const modalReducer = (state = initialState, { type, payload }) => {
  // console.log(payload);
  switch (type) {
    case OPEN_MODAL:
      const { modalType, modalProps } = payload;
      return { modalType, modalProps };
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
};

export default modalReducer;
