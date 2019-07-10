import React from 'react';
const Fragment = React.Fragment;

import { AppContext } from '../context.jsx';
import { getBookData, addToList, changeInList, deleteFromList } from './handleBookData.jsx'

import ViewBookButtons from './ViewBookButtons.jsx'


export default class ViewBook extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      display: 'loading', // 'found' / 'not found' / loading / 'error'
      data: null,
      owned: false,
    }
  }

  componentDidMount() {
    this.updateView();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bookId !== this.props.bookId) {
      this.updateView();
    }
  }

  updateView = ()=>{
    this.setState({ display: 'loading' });

    getBookData(this.props.bookId, (err, data)=>{
      if (err === 'Not found') {
        return this.setState({display: 'not found'});
      }
      else if (err === 'Not authenticated') {
        return this.context.setAppContext('authenticated', false);
      }

      var ownedState = true;
      if (err === 'Not on list') {
        var ownedState = false;
      }

      this.setState({ data: data, owned: ownedState });
    })
  }

  addChangeDeleteCallback = (err, data, ownedState)=>{
    if (err) {
      if (err == 401) {
        return this.context.setAppContext('authenticated', false);
      }
      if (err == 500 || err == 400) {
        return this.setState({ display: 'error' });
      }
      return this.setState({ display: 'not found' });
    }
    this.setState((state)=>{
      var newData = state.data;
      newData.userData = data;
      return { data: newData, owned: ownedState };
    });
  }

  addBook = (status)=>{
    var id = this.state.data.bookData.text_id;
    addToList(id, status, (err, data)=>{
      addChangeDeleteCallback(err, data, true);
    });
  }

  changeBook = (status)=>{
    var id = this.state.data.bookData.text_id;
    changeInList(id, status, (err, data)=>{
      addChangeDeleteCallback(err, data, true);
    });
  }

  removeBook = ()=>{
    var id = this.state.data.bookData.text_id;
    deleteFromList(id, (err, data)=>{
      addChangeDeleteCallback(err, data, false);
    })
  }


  render() {
    if (this.state.display === 'found') {

      var bookData = this.state.data.bookData;
      var userData = this.state.data.userData;
      var metadata = book.metadata;
      var thumbnail = `http://www.gutenberg.org/cache/epub/${book.text_id}/pg${book.text_id}.cover.medium.jpg`;

      return (

        <Fragment>
          <p>{book.title}</p>
          <div><img src={thumbnail} alt=""/></div>

          <ViewBookButtons
            owned={this.state.owned}
            status={userData.status}
            addBook={this.addBook}
            changeBook={this.changeBook}
            removeBook={this.removeBook}
            />

          <div>
            <p><b>Language:</b> {metadata.language}</p>
            <p><b>Author:</b> {metadata.author}</p>
            <p><b>Subject:</b></p>
            {metadata.map((subject, i)=>(<p key={i}>{subject}</p>))}
          </div>
        </Fragment>

      );

    }
    else if (this.state.display === 'loading') {

      return (

        <p>Getting book data...</p>

      );

    }
    else if (this.state.display === 'not found') {

      return (

        <p>Can't find a book with that id :(</p>

      );

    }
    else if (this.state.display === 'error') {
      return (

        <p>This app just tripped on a rock and fall off a cliff :(</p>
        <p>Hit F5 button to revive it.</p>

      );
    }
  }
}
