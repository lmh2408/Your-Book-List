import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

import NavBar from './layout/NavBar.jsx';
import Footer from './layout/Footer.jsx';
const Home = React.lazy(()=>import('./home/Home.jsx'));
const Login = React.lazy(()=>import('./login/Login.jsx'));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: '',
      authenticated: false,
    };
  }

  componentDidMount() {
    function checkScreen(self, witdth) {
      if (witdth < 750)
        self.setState({screen: 'sm'});
      else
        self.setState({screen: 'lg'});
    }
    checkScreen(this, window.innerWidth);

    window.addEventListener('resize', ()=>{
      checkScreen(this, window.innerWidth);
    });
  }

  render() {
    return (
      <Router>
        <NavBar
          screen={this.state.screen}
          authenticated={this.state.authenticated}/>

        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>

            <Route exact path='/' render={()=>
                <Home
                  authenticated={this.state.authenticated}/>
              }/>

            <Route exact path='/login' render={()=>{
                if (this.state.authenticated === true) {
                  return <Redirect to='/'/>;
                } else { return <Login/>; }
              }}/>

          </Switch>
        </React.Suspense>

        <Footer />

      </Router>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
