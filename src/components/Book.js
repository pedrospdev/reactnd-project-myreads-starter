import React from 'react'
import PropTypes from 'prop-types'

import BookAuthors from './BookAuthors'
import ShelfChanger from './ShelfChanger'

function Book (props) {
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.backgroundImageUrl})` }}></div>
        <ShelfChanger />
      </div>
      <div className="book-title">{props.title}</div>
      <BookAuthors authors={props.authors} />
    </div>
  )
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array,
  backgroundImageUrl: PropTypes.string
};

export default Book
