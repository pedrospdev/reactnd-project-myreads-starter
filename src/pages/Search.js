import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Shelf from '../components/Shelf'

class Search extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeSearchQuery: PropTypes.func.isRequired
  }

  render() {
    const { books, query, onChangeSearchQuery } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.props.onChangeSearchQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Shelf title="Search Result" books={this.props.books} filter="*" />
        </div>
      </div>
    )
  }
}

export default Search
