import React from 'react';
import defImg from './default.png';
const Books = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title" >
        {props.title}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {Array.isArray(props.books) &&
            props.books.map((book, ind) => (
              <li key={ind}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 120,
                        height: 150,
                        backgroundImage: book.imageLinks
                          ? `url(${book.imageLinks.thumbnail})`
                          : `url(${defImg})`,
                      }}
                    ></div>
                    <div className="book-shelf-changer">
                      <select
                        value={book.shelf}
                        onChange={(event) =>
                          props.updateShelf(book, event.target.value)
                        }
                      >
                        <option disabled>Move to...</option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {Array.isArray(book.authors) ? book.authors.join(', ') : ''}
                  </div>
                </div>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};
export default Books;
