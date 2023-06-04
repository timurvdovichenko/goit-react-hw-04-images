import { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = { searchValue: '' };

  handleChange = e => {
    this.setState({ searchValue: e.currentTarget.value });
  };
  resetForm = () => {
    this.setState({ searchValue: '' });
  };

  handleSubmit = e => {
    // console.log(e);
    e.preventDefault();
    const queryResult = this.state.searchValue.trim();

    if (queryResult === '') {
      Notify.failure('Please enter query');
      return;
    }

    this.props.onSubmit(queryResult);
    this.resetForm();
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchValue}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
