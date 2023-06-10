import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalContent, Overlay } from './Modal.styled';

const ModalIndexRoot = document.querySelector('#modal');

const Modal = ({ closeModal, imgUrl }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = ({ code }) => {
    if (code === 'Escape') {
      closeModal();
    }
  };

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackDropClick}>
      <ModalContent>
        <img src={imgUrl} alt="" />
      </ModalContent>
    </Overlay>,
    ModalIndexRoot,
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
};
