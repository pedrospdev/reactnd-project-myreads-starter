import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

import BookcasePage from './pages/Bookcase'
import SearchPage from './pages/Search'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  render() {
    console.log(this.state.books)
    return (
      <div className="app">
        <Route exact path='/search' component={SearchPage} />
        <Route
          exact path='/'
          render={(props) => <BookcasePage {...props} books={this.state.books} isAuthed={true} />}
        />
      </div>
    )
  }
}

export default BooksApp
