import React from 'react';
const Fragment = React.Fragment;
import { Link } from 'react-router-dom';
import waterfall from 'async/waterfall'

import NavButtons from './NavButtons.jsx';
import { getList } from './handleGettingList.jsx';
import { AppContext } from '../context.jsx';


export default class ListBook extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      position: {
        skip: 0,
        limit: 10
      },
      books: [],
      count: 0,
      input: {
        filter: 'all',
        name: '',
      },
    };
    this.abortSignal = new AbortController();
  }

  componentDidMount() {
    this.getBookList(
      this.state.input.name,
      this.state.input.filter,
      this.state.position,
      this.abortSignal.signal
    );
  }

  componentWillUnmount() {
    this.abortSignal.abort();
  }

  getBookList = (name, filter, position, signal)=>{
    getList(name, filter, position, signal, (err, result)=>{
      if (err) {
        if (err == 401) {
          return this.context.setAppContext('authenticated', false);
        }
        return this.setState({error: err});
      }
      this.setState({books: result.list, count: result.count})
    });
  }

  showSpecific = ()=>{
    this.setState({ position: {skip: 0, limit: 10} });
    this.getBookList(
      this.state.input.name,
      this.state.input.filter,
      this.state.position,
      this.abortSignal.signal
    );
  }

  handleInput = (e)=>{
    var name = e.target.name;
    var value = e.target.value;
    this.setState((state)=>{
      var input = state.input;
      input[name] = value;
      return {input: input};
    });
  }

  handleNavigate = (e)=>{
    var type = e.target.dataset.type;

    this.setState((state)=>{
      var position = state.position;
      var books = state.books;
      if (type == 'prev') {
        position.skip = position.skip - position.limit;
        if (position.skip < 0) {
          position.skip = 0;
        }
      }
      if (type == 'next') {
        position.skip = position.skip + position.limit;
      }

      this.getBookList(
        this.state.input.name,
        this.state.input.filter,
        position,
        this.abortSignal.signal
      );

      document.querySelector('.listBook-inputContainer').scrollIntoView();
      return { position: position };
    });

  }

  render() {
    if (this.state.error) {
      return (
        <p className='listBook-error'>Error {this.state.error}</p>
      );
    }

    var options = ['all', 'reading', 'plan-to-read', 'finished'];
    var books = this.state.books;
    var limit = this.state.limit;

    var navButtons =
      <NavButtons
        booksLength={books.length}
        count={this.state.count}
        position={this.state.position}
        handleNavigate={this.handleNavigate}/>
    ;

    return (
      <Fragment>

        <div className='listBook-inputContainer'>

          <div>
            <select
              name="listBook-filter"
              id="listBook-filter"
              value={this.state.input.filter}
              onChange={this.handleInput}
              name='filter'>
              {options.map(
                (value, i)=><option value={value} key={i}>{value}</option>
              )}
            </select>
            <span>v</span>
          </div>

          <input
            type="text"
            placeholder='Filter by names'
            value={this.state.input.name}
            onChange={this.handleInput}
            name='name'/>

          <button onClick={this.showSpecific}>Show</button>
          <p>{this.state.count} results</p>

        </div>

        <Fragment>{navButtons}</Fragment>

        <div className='listBook-listContainer'>

          {(()=>{
            if (books.length !== 0) {
              return books.map((book, i)=>
                <Link to={`/book/item/${book.bookId}`} key={i} title={book.bookName}>
                  <div className='listBook-itemContainer' >
                    <div className='listBook-thumbnail'>
                      <img
                        src={`http://www.gutenberg.org/cache/epub/${book.bookId}/pg${book.bookId}.cover.small.jpg`}
                        alt={book.bookName}/>
                    </div>
                    <div className="listBook-itemInfo">
                      <div className="listBook-itemName">
                        <p>{book.bookName}</p>
                      </div>
                      <div className='listBook-itemStatus'>
                        <p>{book.status}</p>
                      </div>
                    </div>
                    <hr/>
                  </div>
                </Link>
              )}
            else {
              return <p className='listBook-noItem'>No book in list to display.</p>;
            }
          })()}

        </div>

        <Fragment>{navButtons}</Fragment>

      </Fragment>
    );
  }
}
