import React from 'react'
import { Link } from 'react-router-dom'

import Shelf from '../components/Shelf'

class Bookcase extends React.Component{
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf
              title="Currently Reading"
              books={this.props.books}
              filter="currentlyReading"
              onChangeShelf={this.props.onChangeShelf}
            />
            <Shelf
              title="Want to Read"
              books={this.props.books}
              filter="wantToRead"
              onChangeShelf={this.props.onChangeShelf}
            />
            <Shelf
              title="Read"
              books={this.props.books}
              filter="read"
              onChangeShelf={this.props.onChangeShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Bookcase
