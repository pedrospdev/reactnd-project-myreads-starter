import React from 'react';

// Dependencios da biblioteca Material-UI
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

function ShelfChanger (props) {
  const { onChangeShelf } = props;
  let actualShelf = 'none';

  if (props.hasOwnProperty('shelf') && (typeof props.shelf == 'string' || props.shelf instanceof String)) {
    actualShelf = props.shelf.trim()
  }

  return (
    <div className="book-shelf-changer">
      <Tooltip
        title="Change shelf"
        placement="top"
        TransitionComponent={Zoom}
      >
        <select value={actualShelf} onChange={(event) => onChangeShelf(props, event.target.value, event.target.options[event.target.selectedIndex].text)}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </Tooltip>
    </div>
  )
}

export default ShelfChanger;
