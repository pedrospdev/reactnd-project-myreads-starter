import React from 'react';
import PropTypes from 'prop-types';

function BookCover (props) {
  let coverImageUrl = '/images/cover_unavailable.png';

  if (props.hasOwnProperty('imageLinks') && props.imageLinks.hasOwnProperty('thumbnail')) {
    const thumbnail = props.imageLinks.thumbnail;

    // Verificação de null, tipo e string vazio apenas por segurança
    if (thumbnail !== null && (typeof thumbnail == 'string' || thumbnail instanceof String) && thumbnail.trim() !== '') {
      coverImageUrl = thumbnail;
    }
  }

  return (
    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${coverImageUrl})` }}></div>
  )
}

BookCover.propTypes = {
  imageUrl: PropTypes.string
};

export default BookCover;
