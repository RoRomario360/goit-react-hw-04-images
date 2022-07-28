import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const App = () => {
  const [images, setImages] = useState('');
  const [query, setQuery] = useState('');

  const handlerForm = query => {
    setQuery(query);
  };
  //
  const handlerOpenModal = img => {
    setImages(img);
  };
  //

  //
  const handlerCloseModal = () => {
    setImages('');
  };
  //

  return (
    <>
      <Searchbar onSubmit={handlerForm} />
      <ImageGallery query={query} handlerOpenModal={handlerOpenModal} />
      {images && <Modal images={images} onClose={handlerCloseModal} />}
    </>
  );
};
