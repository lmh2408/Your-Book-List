import React from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from '../context.jsx';

export default class Logout extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
  }

  sendLogOutRequest = ()=>{
    var url = '/api/logout';

    var request = new XMLHttpRequest;
    request.onloadend = ()=>{
      this.context.setAppContext('authenticated', false);
    }

    request.open('GET', url);
    request.send();
  }

  componentDidMount() {
    document.title = 'Your-Book-List/Log Out';
    this.sendLogOutRequest();
  }

  render() {
    return (
      <p>Logging Out...</p>
    );
  }
}
