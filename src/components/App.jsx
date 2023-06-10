import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import Error from './Error/Error';
import * as API from '../services/images-api';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [page, setPage] = useState(1);
  const [quantityImg, setQuantityImg] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [pictureModal, setPictureModal] = useState(null);
  const [pagesToShow, setPagesToShow] = useState(0);
  // const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    fetchImagesHandler();
  }, [page, searchQuery]);

  useEffect(() => {
    getEndOfQuery();
  }, [pagesToShow, page]);

  const submitFormSearchbarHandler = data => {
    setSearchQuery(data);
    setImages([]);
    setPage(1);
  };

  const fetchImagesHandler = async () => {
    try {
      setStatus(STATUS.PENDING);

      const response = await API.fetchImages(
        searchQuery,
        page,
        quantityImg,
        setPagesToShow,
        pagesToShow,
      );
      const { totalHitsFetched } = response;
      if (totalHitsFetched === 0) {
        return;
      }
      setStatus(STATUS.RESOLVED);
      getEndOfQuery();

      setImagesArray(response);
    } catch (error) {
      console.log(error);
      setStatus(STATUS.REJECTED);
    }
  };

  const setImagesArray = data => {
    const fetchedImagesArray = data.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
      return {
        id: id,
        cardImage: webformatURL,
        modalImage: largeImageURL,
        tags: tags,
      };
    });

    setImages(prevState => {
      return [...prevState, ...fetchedImagesArray];
    });
  };

  const getEndOfQuery = () => {
    if (page === pagesToShow) {
      setStatus(STATUS.IDLE);
    }
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const onClickPicture = data => {
    setShowModal(true);
    setPictureModal(data);
  };

  return (
    <div>
      <Searchbar onSubmit={submitFormSearchbarHandler} />
      <ImageGallery props={images} onClickPicture={onClickPicture} />
      {status === STATUS.PENDING && <Loader />}
      {status === STATUS.RESOLVED && <Button onLoadMore={onLoadMore} />}
      {status === STATUS.REJECTED && <Error />}
      {showModal && <Modal closeModal={closeModal} imgUrl={pictureModal} />}
    </div>
  );
};

export default App;
