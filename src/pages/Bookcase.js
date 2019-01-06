import React from 'react'
import { Link } from 'react-router-dom'

import Shelf from '../components/Shelf'

class Bookcase extends React.Component{
  render() {
    //console.log(this.props)
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf title="Currently Reading" books={this.props.books} filter="currentlyReading" />
            <Shelf title="Want to Read" books={this.props.books} filter="wantToRead" />
            <Shelf title="Read" books={this.props.books} filter="read" />
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
