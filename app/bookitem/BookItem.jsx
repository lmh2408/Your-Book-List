import React from 'react';
const Fragment = React.Fragment;

import { Link } from 'react-router-dom';

import ViewBook from '../common/ViewBook.jsx';

export default class BookItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = `Your-Book-List/${this.props.match.params.bookid}`;
  }

  goBack = ()=>{
    this.props.history.goBack();
  }

  render() {
    return (
      <Fragment>
        <div className='bookItem-backBtn'><button onClick={this.goBack}>Back</button></div>
        <ViewBook bookId={this.props.match.params.bookid}/>
      </Fragment>
    );
  }
}
