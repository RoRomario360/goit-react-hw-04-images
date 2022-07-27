import PropTypes from 'prop-types';
import { Component } from 'react';
import s from './Modal.module.css';

export class Modal extends Component {
  static propTypes = {
    images: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.modalOpen);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.modalOpen);
  }

  modalOpen = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handlerBackDrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={s.overlay} onClick={this.handlerBackDrop}>
        <div className={s.modal}>
          <img src={this.props.images} alt="cover" />
        </div>
      </div>
    );
  }
}
