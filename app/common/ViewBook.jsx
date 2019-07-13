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
      blockButtons: false,
    };
    this.abortController = new AbortController();
  }

  componentDidMount() {
    this.updateView();
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bookId !== this.props.bookId) {
      this.updateView();
    }
  }

  updateView = ()=>{
    this.setState({ display: 'loading' });

    getBookData(this.abortController.signal, this.props.bookId, (err, data)=>{
      if (err === 404 || !data) {
        return this.setState({display: 'not found'});
      }
      else if (err === 401) {
        return this.context.setAppContext('authenticated', false);
      }

      var ownedState = true;
      if (!data.userData) {
        var ownedState = false;
      }

      this.setState({ display: 'found', data: data, owned: ownedState });
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
      console.log(newData);
      return { data: newData, owned: ownedState, blockButtons: false};
    });
  }

  addBook = (status)=>{
    var id = this.state.data.bookData.text_id;
    addToList(id, status, (err, data)=>{
      this.addChangeDeleteCallback(err, data, true);
    });
  }

  changeBook = (status)=>{
    var id = this.state.data.bookData.text_id;
    changeInList(id, status, (err, data)=>{
      this.addChangeDeleteCallback(err, data, true);
    });
  }

  removeBook = ()=>{
    var id = this.state.data.bookData.text_id;
    deleteFromList(id, (err, data)=>{
      this.addChangeDeleteCallback(err, data, false);
    })
  }

  turnOffButton = ()=>{
    this.setState({blockButtons: true})
  }

  render() {
    if (this.state.display === 'found') {

      var bookData = this.state.data.bookData;
      var userData = this.state.data.userData;
      var metadata = bookData.metadata;
      var thumbnail = `http://www.gutenberg.org/cache/epub/${bookData.text_id}/pg${bookData.text_id}.cover.medium.jpg`;
      var link = `http://www.gutenberg.org/ebooks/${bookData.text_id}`;
      return (

        <Fragment>
          <div className='viewBookContainer'>
            <a href={link} target='_blank'>
              <p className='viewBookHeader'>{metadata.title}</p>
              <div className='viewBookThumbnail'>
                <img src={thumbnail} alt=''/>
                <span>{metadata.title}</span>
                {(()=>{
                  if (userData) {
                    return <div>{userData.status}</div>;
                  }
                })()}
              </div>
            </a>

            <ViewBookButtons
              owned={this.state.owned}
              userData={userData}
              addBook={this.addBook}
              changeBook={this.changeBook}
              removeBook={this.removeBook}
              turnOffButton={this.turnOffButton}
              blockButtons={this.state.blockButtons}
              />

            <div className='viewBookInfo'>
              <p><b>Language:</b> {metadata.language}</p>
              <p><b>Author:</b> {metadata.author}</p>
              <p><b>Subject:</b></p>
              {(()=>{
                if (metadata.subject)
                  return metadata.subject.map((subject, i)=>(<p key={i}>{subject}</p>));
              })()}
            </div>
          </div>
        </Fragment>

      );

    }
    else if (this.state.display === 'loading') {

      return (
        <div className='viewBookLoading'>
          <p>Getting book data...</p>
        </div>
      );

    }
    else if (this.state.display === 'not found') {

      return (
        <div className="viewBookLoading viewBookNotFound">
          <p>Can't find a book with that id :(</p>
        </div>
      );

    }
    else if (this.state.display === 'error') {
      return (

        <div className='viewBookLoading viewBookError'>
          <p>This app just tripped on a rock and fall off a cliff :(</p>
          <p>Hit F5 button to revive it.</p>
        </div>

      );
    }
  }
}
