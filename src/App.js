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
      if (books.hasOwnProperty('error')) {
          console.log(books.error)
      } else {
        this.setState(() => ({
          books
        }))
      }
    })
  }

  searchHandler = (query) => {
    const actualQuery = (query != null && (typeof query == 'string' || query instanceof String)) ? query.trim() : ''

    // Se a query atual for vazia, reseta o estado da lista de livros na busca e da query de pesquisa
    if (actualQuery === '') {
      this.setState(() => ({
        booksOnSearchResult: []
      }))
    }
    else {
      BooksAPI.search(query).then((books) => {
        if (books.hasOwnProperty('error')) {
          console.log(books.error)
          this.setState(() => ({
            booksOnSearchResult: []
          }))
        } else {
          this.setState(() => ({
            booksOnSearchResult: books
          }))
        }
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route
          exact path='/search'
          render={(props) => <SearchPage books={this.state.booksOnSearchResult} onChangeSearchQuery={this.searchHandler} isAuthed={true} />}
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
