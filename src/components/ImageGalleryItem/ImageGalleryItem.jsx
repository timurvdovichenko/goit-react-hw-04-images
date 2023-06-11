import { ImageGalleryListItem, ImageGalleryListItemImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ cardImage, modalImage, tags, onClickPicture }) => {
  return (
    <ImageGalleryListItem
      onClick={() => {
        onClickPicture(modalImage);
      }}
    >
      <ImageGalleryListItemImg src={cardImage} alt={tags} />
    </ImageGalleryListItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  cardImage: PropTypes.string.isRequired,
  modalImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClickPicture: PropTypes.func.isRequired,
};
