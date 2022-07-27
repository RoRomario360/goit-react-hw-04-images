import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export const GalleryItem = ({ imgPrew, imgLarge, handlerOpenModal }) => {
  return (
    <li className={s.gallery__item}>
      <img
        className={s.gallery__pic}
        src={imgPrew}
        alt="img"
        onClick={() => handlerOpenModal(imgLarge)}
      />
    </li>
  );
};

GalleryItem.propTypes = {
  imgPrew: PropTypes.string.isRequired,
  imgLarge: PropTypes.string.isRequired,
  handlerOpenModal: PropTypes.func.isRequired,
};
