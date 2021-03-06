import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import propTypes from 'prop-types'
import Shelf from './Shelf'

/**
 * @constructor
 * @description ListBooks component representing the main page
 * It wraps multiple Shelf components
 * @param {} - All parameters (props) are defined using propTypes
 * at the bottom of the page
 */
class ListBooks extends Component {

  /**
   * @description Draws UI
   */
  render() {
    const {shelves, myBooks, moveBook, isOnline, isLoading} = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        { // User is offline
          (!isOnline) && 
            (<p className="network-error">Network error! Check your connection.</p>)
        }

        <div className="list-books-content">
          <div>{shelves.map(shelf => {
            //convert shelf name from shelves into camelCased -for referencing-
            const camelCasedShelf = (shelf.charAt(0).toLowerCase() + shelf.substr(1)).split(' ').join('');
            const shelfBooks = myBooks.filter(book => (book.shelf === camelCasedShelf));
            return <Shelf key={camelCasedShelf} shelfName={shelf} shelfBooks={shelfBooks}
                    moveBook={moveBook} shelves={shelves} isLoading={isLoading}/>
          })}</div>
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>  
    );
  }
}

ListBooks.propTypes = {
  shelves: propTypes.array.isRequired,
  myBooks: propTypes.array.isRequired,
  moveBook: propTypes.func.isRequired,
  isOnline: propTypes.bool.isRequired,
  isLoading: propTypes.bool.isRequired,
}

export default ListBooks