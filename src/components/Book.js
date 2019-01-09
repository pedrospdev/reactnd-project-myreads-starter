import React from 'react';
import PropTypes from 'prop-types';

import BookAuthors from './BookAuthors';
import BookCover from './BookCover';
import BookModal from './BookModal';
import ShelfChanger from './ShelfChanger';

class Book extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    backgroundImageUrl: PropTypes.string
  }

  state = {
    showModal: false
  }

  showModalHandler = () => {
    this.setState(() => ({
      showModal: true
    }))
  }

  hideModalHandler = () => {
    this.setState(() => ({
      showModal: false
    }))
  }

  render() {
    const book = {...this.props}

    return (
      <div className="book">
        <div className="book-top" onDoubleClick={this.showModalHandler}>
          <BookCover {...book} />
          <ShelfChanger {...book} onChangeShelf={this.props.onChangeShelf} />
        </div>
        <div className="book-title">{book.title}</div>
        <BookAuthors authors={book.authors} />
        <BookModal {...book} open={this.state.showModal} onClose={this.hideModalHandler} />
      </div>
    )
  }
}

export default Book;
