import React from 'react';

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
          <a target="_blank" href={rssItems[i].link}>
            <div className="homeRSSImage">
              <img src={rssItems[i].thumbnail} alt=""/>
            </div>

            <p>{rssItems[i].title}</p>
          </a>
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
