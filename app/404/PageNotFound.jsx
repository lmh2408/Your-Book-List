import React from 'react';


export default class PageNotFound extends React.Component {
  componentDidMount() {
    document.title = 'Error 404';
  }
  render() {
    return (
      <div className='pageNotFound-page'>
        <h2>Error 404: Where are you going?</h2>
      </div>
    );
  }
}
