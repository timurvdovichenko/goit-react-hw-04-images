import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

const ImageGallery = ({ props, onClickPicture }) => {
  if (props.length !== 0) {
    return (
      <ImageGalleryList>
        {props.map(({ id, cardImage, modalImage, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              cardImage={cardImage}
              tags={tags}
              onClickPicture={onClickPicture}
              modalImage={modalImage}
            />
          );
        })}
      </ImageGalleryList>
    );
  }
};

export default ImageGallery;

ImageGallery.propTypes = {
  props: PropTypes.object.isRequired,
  onClickPicture: PropTypes.func.isRequired,
};
