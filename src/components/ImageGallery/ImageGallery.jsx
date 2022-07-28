import { useState, useEffect } from 'react';
import { RequestApi } from 'components/Api/ReguestApi';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

const STATUS = {
  Idle: 'idle',
  Loading: 'loading',
  Error: 'error',
  Success: 'success',
};

export const ImageGallery = ({ query, handlerOpenModal }) => {
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(STATUS.Idle);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setStatus(STATUS.Loading);
    RequestApi(query)
      .then(response => {
        const { data } = response;

        setImages([...data.hits]);
        setPage(2);
        setTotalHits(data.totalHits);
        setStatus(STATUS.Success);
      })
      .catch(error => {
        setStatus(STATUS.Error);
        toast.error('Something went wrong!');
      });
  }, [query]);

  const handleLoadMore = () => {
    RequestApi(query, page)
      .then(response => {
        const { hits } = response.data;
        setImages(ps => [...ps, ...hits]);
        setPage(page + 1);
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (status === STATUS.Loading) {
    return <Loader />;
  }

  if (status === STATUS.Success) {
    return (
      <>
        <ul className={s.galleryList}>
          {images.map(({ id, webformatURL, largeImageURL }) => {
            return (
              <GalleryItem
                key={id}
                imgPrew={webformatURL}
                imgLarge={largeImageURL}
                handlerOpenModal={handlerOpenModal}
              />
            );
          })}
        </ul>

        {totalHits >= 12 * page && <Button onClick={handleLoadMore} />}
      </>
    );
  }
};

ImageGallery.propType = {
  query: PropTypes.string.isRequired,
  handlerOpenModal: PropTypes.func.isRequired,
};
