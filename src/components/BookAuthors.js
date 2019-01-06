import React from 'react'
import PropTypes from 'prop-types'

function BookAuthors (props) {
  let authorsList = ''

  if (typeof props.authors == 'string' || props.authors instanceof String) {
    authorsList = props.authors
  }
  else if (Array.isArray(props.authors)) {
    props.authors.forEach(function (value, idx) {
      authorsList += value

      // Quando a lista indicar mais de um autor, faz a separação usando ',' e 'and' (se for o último nome)
      if (props.authors.length >= 2) {
        if ((idx + 2) < props.authors.length) {
          authorsList += ', '
        } else if ((idx + 2) === props.authors.length) {
          authorsList += ' and '
        }
      }
    });
  }

  return (
    <div className="book-authors">{authorsList}</div>
  )
}

// Componente preparado para receber uma string fixa ou um array de strings
BookAuthors.propTypes = {
  authors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

export default BookAuthors
