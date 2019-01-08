import React from 'react'

function ShelfChanger (props) {
  let actualShelf = 'none'

  if (props.hasOwnProperty('shelf') && (typeof props.shelf == 'string' || props.shelf instanceof String)) {
    actualShelf = props.shelf.trim()
  }

  return (
    <div className="book-shelf-changer">
      <select value={actualShelf} onChange={(event) => props.onChangeShelf(props, event.target.value)}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  )
}

export default ShelfChanger
