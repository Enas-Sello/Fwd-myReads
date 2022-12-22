import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import HomePage from './Pages/HomePage';
import SearchPage from './Pages/SearchPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
function App() {
  const [data, setData] = useState({
    Shelfs: [],
    searchList: [],
  });

  useEffect(() => {
    BooksAPI.getAll().then((Shelfs) => {
      setData({ ...data, Shelfs });
    });
    // eslint-disable-next-line
  }, []);
  const emptybooks = useCallback(() => {
    setData({ ...data, searchList: [] });
  }, [data]);

  const updateShelf = (book, shelf) => {
    if (shelf === 'none') {
      setData(...data, (oldState) => ({
        myShelfs: oldState.Shelfs.filter((b) => b.id !== book.id),
      }));
    }

    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        let newShelf = [];
        let newResult = [];

        const { Shelfs, searchList } = data;
        const shelfIds = Shelfs.map((b) => b.id);
        const searchListIds = Shelfs.map((b) => b.id);

        if (shelfIds.includes(book.id) || searchListIds.includes(book.id)) {
          newShelf = Shelfs.map((b) =>
            b.id === book.id ? { ...b, shelf } : b
          );
          newResult = searchList.map((b) =>
            b.id === book.id ? { ...b, shelf } : b
          );
        } else {
          book.shelf = shelf;
          newShelf = [...Shelfs, book];
          newResult = [...searchList, book];
        }
        setData({ ...data, Shelfs: newShelf, searchList: newResult });
      });
    }
  };

  const search = (event) => {
    const searchInput = event.target.value;
    if (searchInput !== '') {
      BooksAPI.search(searchInput).then((searchResults) => {
        if (!searchResults || searchResults.error) {
          setData({
            ...data,
            searchList: [],
          });
          return;
        }
        const foundBooks = searchResults.map((searchResult) => {
          data.Shelfs.forEach((book) => {
            if (book.id === searchResult.id) searchResult.shelf = book.shelf;
          });
          return searchResult;
        });

        setData({
          ...data,
          searchList: foundBooks,
        });
      });
    } else {
      setData({
        ...data,
        searchList: [],
      });
    }
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage updateShelf={updateShelf} books={data.Shelfs} />}
        />
        <Route
          path="/search"
          element={
            <SearchPage
              emptybooks={emptybooks}
              search={search}
              updateShelf={updateShelf}
              books={data.searchList}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
