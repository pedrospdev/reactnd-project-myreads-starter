import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

import BookcasePage from './pages/Bookcase'
import SearchPage from './pages/Search'

class BooksApp extends React.Component {
  state = {
    books: [],
    booksOnSearchResult: [],
    searchQuery: ''
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

  searchHandler = (query) => {
    const actualQuery = (query != null && (typeof query == 'string' || query instanceof String)) ? query.trim() : ''

    // Se a query atual for vazia, reseta o estado da lista de livros na busca e da query de pesquisa
    if (actualQuery === '') {
      this.setState(() => ({
        booksOnSearchResult: [],
        searchQuery: ''
      }))
    }
    else {
      BooksAPI.search(query).then((books) => {
        this.setState(() => ({
          booksOnSearchResult: books,
          searchQuery: actualQuery
        }))
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route
          exact path='/search'
          render={(props) => <SearchPage books={this.state.booksOnSearchResult} onChangeSearchQuery={this.searchHandler} query={this.state.searchQuery} isAuthed={true} />}
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
