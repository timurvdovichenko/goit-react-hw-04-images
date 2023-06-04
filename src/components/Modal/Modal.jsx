import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalContent, Overlay } from './Modal.styled';

const ModalIndexRoot = document.querySelector('#modal');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ({ code }) => {
    if (code === 'Escape') {
      console.log(code);
      this.props.closeModal();
    }
  };

  handleBackDropClick = e => {
    // console.log('currentTarget', e.currentTarget);
    // console.log('target', e.target);
    if (e.currentTarget === e.target) {
      console.log('Backdrop click');
      this.props.closeModal();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackDropClick}>
        <ModalContent>
          <img src={this.props.imgUrl} alt="" />
        </ModalContent>
      </Overlay>,
      ModalIndexRoot,
    );
  }
}
export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
};
