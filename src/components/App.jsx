import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class App extends Component {
  state = {
    images: '',
    query: '',
  };

  handlerForm = query => {
    this.setState({ query });
  };
  //
  handlerOpenModal = img => {
    this.setState({ images: img });
  };
  //

  //
  handlerCloseModal = () => {
    this.setState({ images: '' });
  };
  //

  render() {
    const { query, images } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handlerForm} />
        <ImageGallery query={query} handlerOpenModal={this.handlerOpenModal} />
        {images && <Modal images={images} onClose={this.handlerCloseModal} />}
      </>
    );
  }
}
