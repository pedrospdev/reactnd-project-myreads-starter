import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'

import BookcasePage from './components/pages/Bookcase'
import SearchPage from './components/pages/Search'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/search' component={SearchPage} />
        <Route exact path='/' component={BookcasePage} />
      </div>
    )
  }
}

export default BooksApp
