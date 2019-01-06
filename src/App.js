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
    this.getBooksHandler();
  }

  getBooksHandler = () => {
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
    if (actualQuery === '' && this.state.booksOnSearchResult.length > 0) {
      this.setState(() => ({
        booksOnSearchResult: []
      }))
    }
    else {
      BooksAPI.search(query).then((books) => {
        if (books != null) {
          if (books.hasOwnProperty('error')) {
            console.log(books.error)
            this.setState(() => ({
              booksOnSearchResult: []
            }))
          } else {
            // Verifica quais livros da busca já estão em uma prateleira e configura ou adiciona a propriedade 'shelf'
            // Cria uma lista chave-valor para uma busca mais rápida
            const booksAlreadyOnShelf = {}
            this.state.books.map((b) => ( booksAlreadyOnShelf[b.id] = b.shelf ))

            // Configura a propriedade 'shelf' caso o livro já esteja na lista anterior
            // PONTO DE ATENÇÃO: Essa manuntenção na lista retornada é baseada no ID retornado pela API.
            // Existe pelo menos uma busca que retorna livros repetidos (Linux).
            // Neste caso, titulos iguais podem apresentar configurações diferentes!
            books.forEach((book) => {
              if (booksAlreadyOnShelf[book.id] !== null) {
                book.shelf = booksAlreadyOnShelf[book.id]
              }
            })

            this.setState(() => ({
              booksOnSearchResult: books
            }))
          }
        }
      })
    }
  }

  shelfChangeHandler = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getBooksHandler()
    })
  }

  render() {
    return (
      <div className="app">
        <Route
          exact path='/search'
          render={(props) => <SearchPage
                                books={this.state.booksOnSearchResult}
                                onChangeSearchQuery={this.searchHandler}
                                onChangeShelf={this.shelfChangeHandler}
                                isAuthed={true}
                             />}
        />
        <Route
          exact path='/'
          render={(props) => <BookcasePage
                                books={this.state.books}
                                onChangeShelf={this.shelfChangeHandler}
                                isAuthed={true}
                             />}
        />
      </div>
    )
  }
}

export default BooksApp
