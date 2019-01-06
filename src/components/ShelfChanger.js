import React from 'react'

function ShelfChanger (props) {
  let actualShelf = ''

  if (props.hasOwnProperty('shelf') && (typeof props.shelf == 'string' || props.shelf instanceof String)) {
    actualShelf = props.shelf.trim().toLowerCase()
  }

  return (
    <div className="book-shelf-changer">
      <select value="move" onChange={(event) => props.onChangeShelf(props, event.target.value)}>
        <option value="move" disabled>Move to...</option>
        {actualShelf !== 'currentlyreading' && (
          <option value="currentlyReading">Currently Reading</option>
        )}
        {actualShelf !== 'wanttoread' && (
          <option value="wantToRead">Want to Read</option>
        )}
        {actualShelf !== 'read' && (
          <option value="read">Read</option>
        )}
        <option value="none">None</option>
      </select>
    </div>
  )
}

export default ShelfChanger
