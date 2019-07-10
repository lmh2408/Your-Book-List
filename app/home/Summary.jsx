import React from 'react';

import { AppContext } from '../context.jsx';

export default class Summary extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
  }

  render() {
    var type = this.props.type;
    var list = this.props.list;
    var booksArray = [];

    for (let i = 0, l = list.length; i < l; i++) {
      let thumbnail = `http://www.gutenberg.org/cache/epub/${list[i].bookId}/pg${list[i].bookId}.cover.medium.jpg`;
      let link = `http://www.gutenberg.org/ebooks/${list[i].bookId}`;

      if (this.context.screen === 'lg') {
        var book =
          <div className='homeSummaryBook' key={i}>
            <a href={link} target='_blank' title={list[i].bookName}>
              <div>
                <img src={thumbnail} alt=""/>
              </div>
              <p>{list[i].bookName}</p>
            </a>
          </div>
        ;
      }
      else {
        var book =
          <div className='homeSummaryBookSm' key={i}>
            <a href={link} target='_blank' title={list[i].bookName}>
              <p>{list[i].bookName}</p>
            </a>
          </div>
        ;
      }

      booksArray.push(book)
    }

    return (
      <div className='homeSummaryContainer'>
        <p className='homeSummaryHeader'>{type}</p>
        {booksArray}
      </div>
    );
  }
}
