import React from 'react';
import RSSParser from 'rss-parser';
import { Link } from "react-router-dom";

const RecentFeed = React.lazy(()=>import('./RecentFeed.jsx'));

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RSSItems: [],
    }
  }


  componentDidMount() {
    document.title = 'Your-Book-List';

    var parser = new RSSParser;
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
    var apiUrl = 'http://www.gutenberg.org/cache/epub/feeds/today.rss';

    parser.parseURL(CORS_PROXY + apiUrl, (err, feed)=>{
      if (err) { return; }
      var items = feed.items;

      this.setState((state)=>{
        var rssItems = [];
        for (let i = 0, l = items.length; i < l; i++) {
          // http://www.gutenberg.org/ebooks/59846
          var idNumbers = [];

          for (let y = 32, s = items[i].link.length; y < s; y ++) {
            idNumbers.push(items[i].link[y]);
          }

          var id = idNumbers.join('');
          // http://www.gutenberg.org/cache/epub/59831/pg59831.cover.medium.jpg
          var thumbnail = `http://www.gutenberg.org/cache/epub/${id}/pg${id}.cover.medium.jpg`;

          let book = {
            title: items[i].title,
            link: items[i].link,
            thumbnail: thumbnail,
          };
          rssItems.push(book);
        }
        return { RSSItems: rssItems };
      });

    });
  }

  render() {
    if (this.state.RSSItems.length === 0) {
      var displayFeed =
        <div className='homeRSSPlaceholder'></div>
      ;
    }
    else {
      var displayFeed =
        <div className='homeRFDiv'>
          <p className='homeRFHeader'>Project Guntenburg's recent releases</p>
          <React.Suspense fallback={
              <p>Getting recent feed...</p>
            }>
            <RecentFeed rssItems={this.state.RSSItems}/>
          </React.Suspense>
        </div>
      ;
    }

    if (this.props.authenticated === false) {
      var displayHeader =
        <div className='homeHeader'>
          <p>Create reading list of books from Project Guntenburg</p>
          <Link to='/login'><button>Get started</button></Link>
        </div>
      ;
    }
    else {
      var displayHeader =
        <p>Logged in</p>
      ;
    }
    return (
      <React.Fragment>
          {displayHeader}
          {displayFeed}
      </React.Fragment>
    );

  }
}
