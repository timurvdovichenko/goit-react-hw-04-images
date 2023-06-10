import axios from 'axios';
import { Notify } from 'notiflix';

const FETCH_URL = 'https://pixabay.com/api/';
const API_KEY = '35728571-e5e325dee746f09c3ee4748c1';
const PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';

export async function fetchImages(query, page, quantityImg) {
  try {
    const response = await axios.get(
      `${FETCH_URL}?key=${API_KEY}&q=${query}&${PARAMS}&per_page=${quantityImg}&page=${page}`,
    );

    if (response.data.totalHits === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    const pagesToShow = Math.ceil(response.data.totalHits / quantityImg);

    if ((pagesToShow === 0 && response.data.totalHits > 0) || pagesToShow === page) {
      Notify.info("We're sorry, but you've reached the end of search results.");
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
