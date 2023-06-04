import { Component } from 'react';
// import { Notify } from 'notiflix';
// import { InfinitySpin } from 'react-loader-spinner';
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
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.fetchImagesHandler();
    }

    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ images: [] });
      this.fetchImagesHandler();
    }
  }

  submitFormSearchbarHandler = data => {
    // console.log(data);
    this.setState({ searchQuery: data });
  };

  fetchImagesHandler = async () => {
    try {
      this.setState({ status: STATUS.PENDING });
      const response = await API.fetchImages(
        this.state.searchQuery,
        this.state.page,
        this.state.quantityImg,
      );

      // this.checkResponseMatch(response);
      this.setImagesArray(response);
      // this.checkPagesToShow(response);
    } catch (error) {
      console.log(error);
      this.setState({ status: STATUS.REJECTED });
    }
  };

  setImagesArray = data => {
    if (data.totalHits !== 0) {
      const fetchedImagesArray = data.hits.map(({ id, webformatURL, largeImageURL, tags }) => {
        return {
          id: id,
          cardImage: webformatURL,
          modalImage: largeImageURL,
          tags: tags,
        };
      });
      const pagesToShow = Math.round(data.totalHits / this.state.quantityImg);
      this.setState(prevState => {
        if (pagesToShow === this.state.page || (pagesToShow === 0 && data.totalHits > 0)) {
          return {
            images: [...prevState.images, ...fetchedImagesArray],
            status: STATUS.IDLE,
          };
        }
        if (pagesToShow !== this.state.page) {
          return {
            images: [...prevState.images, ...fetchedImagesArray],
            status: STATUS.RESOLVED,
          };
        }
      });
    }
  };

  // checkResponseMatch = data => {
  //   if (data.totalHits === 0) {
  //     console.log(data);
  //     Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  //     this.setState({ status: STATUS.REJECTED });
  //     return;
  //   }
  // };

  // checkPagesToShow = data => {
  //   const pagesToShow = Math.round(data.totalHits / this.state.quantityImg);
  //   if ((pagesToShow === 0 && data.totalHits > 0) || pagesToShow === this.state.page) {
  //     Notify.info("We're sorry, but you've reached the end of search results.");
  //     this.setState({ status: STATUS.IDLE });
  //     return;
  //   }
  // };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: STATUS.PENDING,
    }));
  };

  openModal = () => {
    console.log('OpenModal');
    // // this.setState(prevState => (console.log(prevState), { showModal: !prevState.showModal }));
    this.setState({ showModal: true });
  };
  closeModal = () => {
    console.log('CloseModal');
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
