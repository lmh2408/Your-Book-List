import React from 'react';
import { Link } from 'react-router-dom';


export default class RecentFeed extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    var rssItems = this.props.rssItems;
    var rssListings = [];

    for (let i = 0, l = rssItems.length; i < l; i++) {
      if (i % 2 == 1) {
        var itemClass = 'homeRSSItemRight';
      } else {
        var itemClass = 'homeRSSItemLeft';
      }

      var item =
        <div className={itemClass} key={i}>
          <Link to={`/book/item/${rssItems[i].id}`} title={rssItems[i].title}>
            <div className="homeRSSImage">
              <img src={rssItems[i].thumbnail} alt=""/>
            </div>
            <p>{rssItems[i].title}</p>
          </Link>
        </div>
      ;

      rssListings.push(item);
    }

    // return recentBooksDisplay;
    return (
      <React.Fragment>
        {rssListings}
      </React.Fragment>
    );
  }
}
