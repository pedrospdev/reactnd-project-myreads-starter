import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  paper: {
    position: 'absolute',
    width: '90%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

function DefaultGridItem (props) {
  return (
    <Grid item xs={2}>
      <TextField
        label={props.label}
        defaultValue={props.value}
        className={props.cn}
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
    </Grid>
  )
}

class BookModal extends React.Component {
  render() {
    const { classes } = this.props;
    const book = {...this.props}

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.onClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            {book.hasOwnProperty('title') && book.title != null && (
              <Typography variant="h4" id="modal-title">
                {book.title}
              </Typography>
            )}
            {book.hasOwnProperty('authors') && book.authors != null && (
              <Typography variant="h6" id="modal-title">
                {book.authors.join(', ')}
              </Typography>
            )}
            <Grid container spacing={16}>
              {book.hasOwnProperty('publisher') && book.publisher != null && (
                <DefaultGridItem label="Publisher" value={book.publisher} cn={classes.textField} />
              )}
              {book.hasOwnProperty('publishedDate') && book.publishedDate != null && (
                <DefaultGridItem label="Published" value={book.publishedDate} cn={classes.textField} />
              )}
              {book.hasOwnProperty('pageCount') && book.pageCount != null && (
                <DefaultGridItem label="Pages" value={book.pageCount} cn={classes.textField} />
              )}
              {book.hasOwnProperty('categories') && book.categories != null && (
                <DefaultGridItem label="Categories" value={book.categories.join(', ')} cn={classes.textField} />
              )}
              {book.hasOwnProperty('description') && book.description != null && (
                <Grid item xs={12}>
                  <TextField
                    id="description"
                    label="Description"
                    defaultValue={book.description}
                    fullWidth
                    multiline
                    rowsMax="8"
                    margin="normal"
                    InputLabelProps={{
                      readOnly: true,
                      shrink: true
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                {book.hasOwnProperty('previewLink') && book.previewLink != null && (
                  <Button variant="contained" color="primary" href={book.previewLink} target="_blank" className={classes.button}>
                    Preview
                  </Button>
                )}
                {book.hasOwnProperty('infoLink') && book.infoLink != null && (
                  <Button variant="contained" href={book.infoLink} target="_blank" className={classes.button}>
                    Info
                  </Button>
                )}
                {book.hasOwnProperty('canonicalVolumeLink') && book.canonicalVolumeLink != null && (
                  <Button variant="contained" href={book.canonicalVolumeLink} target="_blank" className={classes.button}>
                    Android Market
                  </Button>
                )}
              </Grid>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

BookModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired
};

export default withStyles(styles)(BookModal);
