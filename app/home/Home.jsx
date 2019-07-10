import React from 'react';
import RSSParser from 'rss-parser';
import { Link } from "react-router-dom";

import { AppContext } from '../context.jsx';
import { getFeed } from './getFeed.jsx';
import { getSummary } from './getSummary.jsx';
import Summary from './Summary.jsx';
const RecentFeed = React.lazy(()=>import('./RecentFeed.jsx'));


export default class Home extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      RSSItems: [],
      summary: null,
      request: { summary: null },
    }
  }

  componentDidMount() {
    document.title = 'Your-Book-List';

    getFeed((results)=>{
      this.setState({ RSSItems: results })
    });

    var request = new XMLHttpRequest();
    this.setState({request: { summary: request }});

    getSummary(request, (err, result)=>{
      if (err === 401) {
        return this.context.setAppContext('authenticated', false);
      }
      else if (err === 500) return;

      this.setState({ summary: result });
    });
  }


  componentWillUnmount() {
    if (this.state.request.summary) {
      this.state.request.summary.abort();
    }
  }

  render() {
    if (this.context.authenticated === false) {
      var displayHeader =
        <div className='homeHeader'>
          <p>Create reading list of books from Project Guntenburg</p>
          <Link to='/login'><button>Get started</button></Link>
        </div>
      ;
    }
    else if (this.state.summary !== null){
      var displayHeader = [<div key='e'></div>,];

      var summary = this.state.summary;
      var checkEmpty = 0;

      if (summary.reading.length) {
        var rdList = <Summary key = 'r' type='Currently reading' list={summary.reading}/>;
        displayHeader.push(rdList);
        checkEmpty ++;
      }

      if (summary.planToRead.length) {
        var ptrd = <Summary key = 'p' type='Plan to read' list={summary.planToRead}/>;
        displayHeader.push(ptrd);
        checkEmpty ++;
      }

      if (checkEmpty === 0) {
        var addPrompt =
          <div className="homeHeader" key='a'>
            <p>Your reading list is empty!</p>
            <Link to='/'><button>Add book</button></Link>
          </div>
        ;
        displayHeader.push(addPrompt);
      }
    }
    else {
      var displayHeader = [<div key='e'></div>,];
    }

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


    return (
      <React.Fragment>
          {displayHeader}
          {displayFeed}
      </React.Fragment>
    );

  }
}
