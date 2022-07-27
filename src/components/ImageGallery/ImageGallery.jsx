import { Component } from 'react';
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

export class ImageGallery extends Component {
  static propTypes = {
    handlerOpenModal: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    totalHits: null,
    page: 1,
    status: STATUS.Idle,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.setState({ status: STATUS.Loading });
      RequestApi(this.props.query)
        .then(response => {
          const { data } = response;

          this.setState(prevState => ({
            images: [...data.hits],
            page: 2,
            totalHits: data.totalHits,
            status: STATUS.Success,
          }));
        })
        .catch(error => {
          this.setState({ status: STATUS.Error, error });
          toast.error('Something went wrong!');
        });
    }
  }

  handleLoadMore = () => {
    RequestApi(this.props.query, this.state.page)
      .then(response => {
        const { hits } = response.data;
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => {
        this.setState(console.log(error));
      });
  };

  render() {
    const { images, status, totalHits, page } = this.state;

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
                  handlerOpenModal={this.props.handlerOpenModal}
                />
              );
            })}
          </ul>

          {totalHits >= 12 * page && <Button onClick={this.handleLoadMore} />}
        </>
      );
    }
  }
}
