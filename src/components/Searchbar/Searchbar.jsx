import { useState } from 'react';
// import { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = e => {
    setSearchValue(e.currentTarget.value);
  };
  const resetForm = () => {
    setSearchValue('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const queryResult = searchValue.trim();

    if (queryResult === '') {
      Notify.failure('Please enter query');
      return;
    }

    onSubmit(queryResult);
    resetForm();
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
