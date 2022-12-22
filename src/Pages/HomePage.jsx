import React from 'react';
import { Link } from 'react-router-dom';
import Books from '../Components/Books';

const HomePage = (props) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <Books
          updateShelf={props.updateShelf}
          title="Currently Reading"
          books={props.books.filter(
            (book) => book.shelf === 'currentlyReading'
          )}
        />
        <Books
          updateShelf={props.updateShelf}
          title="Want to Read"
          books={props.books.filter((book) => book.shelf === 'wantToRead')}
        />
        <Books
          updateShelf={props.updateShelf}
          title="Read"
          books={props.books.filter((book) => book.shelf === 'read')}
        />
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};
export default HomePage;
