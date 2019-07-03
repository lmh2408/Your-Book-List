import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <h1>Hello World!</h1>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
