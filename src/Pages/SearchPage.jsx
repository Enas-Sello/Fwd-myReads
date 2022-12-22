import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DebounceInput from 'react-debounce-input';
import Books from '../Components/Books';

const SearchPage = ({ emptybooks, search, updateShelf, books }) => {
  const [searchInput] = useState('');

  useEffect(() => {
    emptybooks();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <DebounceInput
            debounceTimeout={300}
            element="input"
            type="text"
            value={searchInput}
            onChange={search}
            placeholder="Search by title"
          />
        </div>
      </div>
      <div className="search-books-results">
        <Books updateShelf={updateShelf} books={books} />
      </div>
    </div>
  );
};

export default SearchPage;
