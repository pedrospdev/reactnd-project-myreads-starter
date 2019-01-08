import React from 'react';
import PropTypes from 'prop-types';

import BookAuthors from './BookAuthors';
import BookCover from './BookCover';
import ShelfChanger from './ShelfChanger';

function Book (props) {
  return (
    <div className="book">
      <div className="book-top">
        <BookCover {...props} />
        <ShelfChanger {...props} onChangeShelf={props.onChangeShelf} />
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

export default Book;
