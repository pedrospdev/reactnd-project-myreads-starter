import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

import BookcasePage from './pages/Bookcase'
import SearchPage from './pages/Search'

class BooksApp extends React.Component {
  state = {
    books: [],
    booksOnSearchResult: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  clearQuery = (query) => {
    this.setState(() => ({
      booksOnSearchResult: []
    }))
  }

  searchBooks = (query) => {
    BooksAPI.search(query).then((books) => {
      this.setState(() => ({
        booksOnSearchResult: books
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route
          exact path='/search'
          render={(props) => <SearchPage books={this.state.booksOnSearchResult} onSubmitQuery={this.searchBooks} onClearQuery={this.clearQuery} isAuthed={true} />}
        />
        <Route
          exact path='/'
          render={(props) => <BookcasePage books={this.state.books} isAuthed={true} />}
        />
      </div>
    )
  }
}

export default BooksApp
