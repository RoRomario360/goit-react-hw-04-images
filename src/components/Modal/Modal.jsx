import PropTypes from 'prop-types';
import { useEffect } from 'react';
import s from './Modal.module.css';

export const Modal = ({ images, onClose }) => {
  useEffect(() => {
    const modalOpen = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', modalOpen);
    return () => {
      document.removeEventListener('keydown', modalOpen);
    };
  });

  const handlerBackDrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={s.overlay} onClick={handlerBackDrop}>
      <div className={s.modal}>
        <img src={images} alt="cover" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  images: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
