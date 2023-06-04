import { Component } from 'react';
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

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    status: STATUS.IDLE,
    page: 1,
    quantityImg: 12,
    showModal: false,
    pictureModal: null,
    pagesToShow: 0,
    totalHits: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page || prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImagesHandler();
    }
  }

  submitFormSearchbarHandler = data => {
    this.setState({ searchQuery: data, images: [], page: 1 });
  };

  fetchImagesHandler = async () => {
    try {
      this.setState({ status: STATUS.PENDING });
      const response = await API.fetchImages(
        this.state.searchQuery,
        this.state.page,
        this.state.quantityImg,
      );

      const { totalHits } = await response;
      if (totalHits === 0) {
        return;
      }
      this.setState({ totalHits: totalHits });
      this.setImagesArray(response);
      this.getEndOfQuery(response);
    } catch (error) {
      console.log(error);
      this.setState({ status: STATUS.REJECTED });
    }
  };

  setImagesArray = data => {
    const fetchedImagesArray = data.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
      return {
        id: id,
        cardImage: webformatURL,
        modalImage: largeImageURL,
        tags: tags,
      };
    });

    this.setState(prevState => {
      return {
        images: [...prevState.images, ...fetchedImagesArray],
        status: STATUS.RESOLVED,
      };
    });
  };

  getEndOfQuery = data => {
    const pagesToShow = Math.ceil(data.totalHits / this.state.quantityImg);

    if (this.state.page === pagesToShow) {
      this.setState({ status: STATUS.IDLE });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };
  onClickPicture = data => {
    console.log(data);
    this.setState({
      showModal: true,
      pictureModal: data,
    });
  };

  render() {
    const { status } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.submitFormSearchbarHandler} />
        <ImageGallery props={this.state.images} onClickPicture={this.onClickPicture} />
        {status === STATUS.PENDING && <Loader />}
        {status === STATUS.RESOLVED && <Button onLoadMore={this.onLoadMore} />}
        {status === STATUS.REJECTED && <Error />}
        {this.state.showModal && (
          <Modal closeModal={this.closeModal} imgUrl={this.state.pictureModal} />
        )}
      </div>
    );
  }
}

export default App;
