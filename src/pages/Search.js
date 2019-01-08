import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// Dependencios da biblioteca Material-UI
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'

// Componentes da aplicação
import Shelf from '../components/Shelf'

class Search extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeSearchQuery: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({
      query
    }, () => { this.props.onChangeSearchQuery(query); })
  }

  render() {
    const { books } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Tooltip
            title="Go back to main page"
            placement="bottom-start"
            TransitionComponent={Zoom}
          >
            <Link
              to="/"
              className="close-search"
              onClick={() => this.props.onChangeSearchQuery('')}
            >
              Close
            </Link>
          </Tooltip>
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
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Shelf
            title="Search Result"
            books={books}
            filter="*"
            onChangeShelf={this.props.onChangeShelf} />
        </div>
      </div>
    )
  }
}

export default Search
