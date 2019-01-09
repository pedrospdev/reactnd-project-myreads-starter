import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';

// Dependencios da biblioteca Material-UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

// Componentes da aplicação
import BookcasePage from './pages/Bookcase';
import SearchPage from './pages/Search';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class BooksApp extends React.Component {
  queue = [];

  state = {
    books: [],
    booksOnSearchResult: [],
    isSnackOpen: false,
    messageInfo: {},
  };

  componentDidMount() {
    this.getBooksHandler();
  };

  getBooksHandler = () => {
    BooksAPI.getAll().then((books) => {
      if (books.hasOwnProperty('error')) {
        this.showMessageHandler('Erro ao buscar livros: ' + books.error);
      } else {
        this.setState(() => ({ books }));
      }
    })
  };

  searchHandler = (query) => {
    const actualQuery = (query != null && (typeof query == 'string' || query instanceof String)) ? query.trim() : '';

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
            this.showMessageHandler('Query "' + query + '" resulted in an error: ' + books.error)
            this.setState(() => ({
              booksOnSearchResult: []
            }))
          } else {
            // Verifica quais livros da busca já estão em uma prateleira e
            // configura ou adiciona a propriedade 'shelf'
            // Cria uma lista chave-valor para uma busca mais rápida
            const booksAlreadyOnShelf = {};
            this.state.books.map((b) => ( booksAlreadyOnShelf[b.id] = b.shelf ));

            // Configura a propriedade 'shelf' caso o livro já esteja na lista
            // anterior
            // PONTO DE ATENÇÃO: Essa manuntenção na lista retornada é baseada
            // no ID retornado pela API.
            // Existe pelo menos uma busca que retorna livros repetidos (Linux).
            // Neste caso, titulos iguais podem apresentar configurações
            // diferentes!
            books.forEach((book) => {
              if (booksAlreadyOnShelf[book.id] !== null) {
                book.shelf = booksAlreadyOnShelf[book.id];
              }
            })

            this.setState(() => ({
              booksOnSearchResult: books
            }))
          }
        }
      })
    }
  };

  shelfChangeHandler = (book, shelf, shelfName) => {
    BooksAPI.update(book, shelf).then(() => {
      this.updateShelfs(book.id, shelf, shelfName);
    })
  };

  /**
  * @description Mostra mensagem de troca de prateleira
  * @param {string} title - título do livro
  * @param {string} shelf - nome natural (leitura) da prateleira
  */
  showShelfChangeMessage = (title, shelf) => {
    this.showMessageHandler('"' + title + '" moved to ' + shelf);
  };

  /**
  * @description Muda a propriedade 'shelf' dos livros que já se encontram em
  * uma prateleira
  * @param {number} bookId - Id do livro
  * @param {string} shelf - nome tratado da prateleira (controle da app)
  * @param {string} shelfName - nome natural (leitura) da prateleira
  */
  updateShelfs = (bookId, shelf, shelfName) => {
    // Ajusta livros que já estão no state 'books'
    const indexOfBookOnState = this.state.books.map(b => b.id).indexOf(bookId)

    if (indexOfBookOnState != null && indexOfBookOnState >= 0) {
      let newBooksState = this.state.books
      newBooksState[indexOfBookOnState].shelf = shelf

      this.setState(() => ({
        books: newBooksState
      }), () => { this.showShelfChangeMessage(newBooksState[indexOfBookOnState].title, shelfName); })
    }

    // Ajusta livros que já estão no state 'booksOnSarchResult'
    const indexOfBookOnStateSearch = this.state.booksOnSearchResult.map(b => b.id).indexOf(bookId);

    if (indexOfBookOnStateSearch != null && indexOfBookOnStateSearch >= 0) {
      let newBooksStateSearch = this.state.booksOnSearchResult;
      newBooksStateSearch[indexOfBookOnStateSearch].shelf = shelf;

      this.setState(() => ({
        booksOnSearchResult: newBooksStateSearch
      }), () => { this.showShelfChangeMessage(newBooksStateSearch[indexOfBookOnStateSearch].title, shelfName); })
    }

    // No escopo desta aplicação, este método 'updateShelfs' só é chamado pela
    // página principal e pela página de busca. Logo, se o livro foi encontrado
    // apenas na coleção da busca atual, a chamada veio da página de busca e a
    // aplicação deve chamar novamente a API para refletir o estado persistido.
    if ((indexOfBookOnState == null || indexOfBookOnState === -1) &&
        (indexOfBookOnStateSearch != null && indexOfBookOnStateSearch >= 0)) {
      this.getBooksHandler();
    }
  };

  // Handlers e métodos do Material-UI, implementados conforme exemplo na página
  // oficial: https://material-ui.com/demos
  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        isSnackOpen: true,
      });
    }
  };

  showMessageHandler = (message) => {
    this.queue.push({
      message,
      key: new Date().getTime(),
    });

    if (this.state.isSnackOpen) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ isSnackOpen: false });
    } else {
      this.processQueue();
    }
  };

  messageCloseHandler = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ isSnackOpen: false });
  };

  messageExitedHandler = () => {
    this.processQueue();
  };

  render() {
    const { classes } = this.props;
    const { messageInfo } = this.state;

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
        <Snackbar
          key={messageInfo.key}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.isSnackOpen}
          autoHideDuration={2000}
          onClose={this.messageCloseHandler}
          onExited={this.messageExitedHandler}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{messageInfo.message}</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.messageCloseHandler}>
              Close
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.messageCloseHandler}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    )
  }
}

BooksApp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BooksApp);
