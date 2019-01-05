import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

function Shelf (props) {
  const { books, filter } = props

  const booksOnShelf = (filter == null || filter.trim() === '') ? null : books.filter((b) => (b.shelf.toLowerCase() === filter.toLowerCase()))

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        {booksOnShelf == null && (
          <span>Filtro não definido!</span>
        )}
        {booksOnShelf != null && (
          <ol className="books-grid">
            {booksOnShelf.map((book) => (
              <li key={book.id}>
                <Book title={book.title} authors={book.autors} backgroundImageUrl={book.imageLinks.thumbnail} />
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}

Shelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired
};

export default Shelf
