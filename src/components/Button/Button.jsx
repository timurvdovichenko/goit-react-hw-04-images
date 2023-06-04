import { ButtonStyle, ButtonContainer } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onLoadMore }) => {
  return (
    <ButtonContainer>
      <ButtonStyle type="button" onClick={onLoadMore}>
        Load more
      </ButtonStyle>
    </ButtonContainer>
  );
};

export default Button;

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
