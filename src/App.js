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

    // Se a query atual for vazia, reseta o estado da lista de livros na busca e
    // da query de pesquisa
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
            // Verifica quais livros da busca já estão em uma prateleira e
            // configura ou adiciona a propriedade 'shelf'
            // Cria uma lista chave-valor para uma busca mais rápida
            const booksAlreadyOnShelf = {}
            this.state.books.map((b) => ( booksAlreadyOnShelf[b.id] = b.shelf ))

            // Configura a propriedade 'shelf' caso o livro já esteja na lista
            // anterior
            // PONTO DE ATENÇÃO: Essa manuntenção na lista retornada é baseada
            // no ID retornado pela API.
            // Existe pelo menos uma busca que retorna livros repetidos (Linux).
            // Neste caso, titulos iguais podem apresentar configurações
            // diferentes!
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
      this.updateShelfs(book.id, shelf)
    })
  }

  updateShelfs = (bookId, shelf) => {
    let stateWasUpdated = false

    // Se o livro já pertence a alguma prateleira, apenas muda a propriedade
    // 'shelf'
    // Ajusta livros que já estão no state 'books'
    const indexOfBookOnState = this.state.books.map(b => b.id).indexOf(bookId)

    if (indexOfBookOnState != null && indexOfBookOnState >= 0) {
      let newBooksState = this.state.books
      newBooksState[indexOfBookOnState].shelf = shelf

      this.setState(() => ({
        books: newBooksState
      }))

      stateWasUpdated = true
    }

    // Ajusta livros que já estão no state 'booksOnSarchResult'
    const indexOfBookOnStateSearch = this.state.booksOnSearchResult.map(b => b.id).indexOf(bookId)

    if (indexOfBookOnStateSearch != null && indexOfBookOnStateSearch >= 0) {
      let newBooksStateSearch = this.state.booksOnSearchResult
      newBooksStateSearch[indexOfBookOnStateSearch].shelf = shelf

      this.setState(() => ({
        booksOnSearchResult: newBooksStateSearch
      }))

      stateWasUpdated = true
    }

    // No escopo desta aplicação, este método 'updateShelfs' só é chamado pela
    // página principal e pela página de busca. Se o estado não foi atualizado,
    // a chamada veio da página de busca por um livro não listado. Neste caso,
    // deve chamar novamente a API para refletir o estado persistido.
    if (!stateWasUpdated) {
      this.getBooksHandler()
    }
  }

  // Função recebe uma lista qualquer de objetos 'book' e retorna um elemento
  // cuja propriedade Id corresponda com o parâmetro de pesquisa
  getBookObjectById = (books, id) => {
    return books.filter((b) => {
      return b.id === id
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
