import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

import { AppContext } from './context.jsx'
import NavBar from './layout/NavBar.jsx';
import Footer from './layout/Footer.jsx';
const Home = React.lazy(()=>import('./home/Home.jsx'));
const Login = React.lazy(()=>import('./login/Login.jsx'));
const Logout = React.lazy(()=>import('./logout/Logout.jsx'));
const AddBook = React.lazy(()=>import('./addbook/AddBook.jsx'));
const ListBook = React.lazy(()=>import('./listbook/ListBook.jsx'));
const BookItem = React.lazy(()=>import('./bookitem/BookItem.jsx'));
const PageNotFound = React.lazy(()=>import('./404/PageNotFound.jsx'));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appContext: {
        authenticated: true,
        screen: 'sm',
        setAppContext: this.setAppContext,
      },
    };
  }

  componentDidMount() {
    this.checkScreen(window.innerWidth);

    window.addEventListener('resize', ()=>{
      this.checkScreen(window.innerWidth);
    });

    this.checkSession();
  }

  setAppContext = (context, value)=>{
    this.setState((state)=>{
      var a = state.appContext;
      a[context] = value;
      return { appContext: a }
    });
  }

  checkScreen = (width)=>{
    if (width < 750) {
      this.setAppContext('screen', 'sm');
    }
    else {
      this.setAppContext('screen', 'lg');
    }
  }

  checkSession = ()=>{
    var url = '/api/session';
    var request = new XMLHttpRequest();

    request.onloadend = ()=>{
      if (request.status === 200) {
        this.setAppContext('authenticated', true);
      }
      else {
        this.setAppContext('authenticated', false);
      }
    };
    request.open('GET', url);
    request.send();
  }

  render() {
    return (
      <AppContext.Provider value={this.state.appContext}>
        <Router>
          <NavBar/>

          <React.Suspense fallback={<div>Loading...</div>}>
            <Switch>

              <Route exact path='/' render={()=>
                  <Home/>
                }/>

              <Route exact path='/login' render={()=>{
                  if (this.state.appContext.authenticated) {
                    return <Redirect to='/'/>;
                  } else { return <Login/>; }
                }}/>

              <Route exact path='/logout' render={()=>{
                  if (!this.state.appContext.authenticated) {
                    return <Redirect to='/'/>;
                  } else return <Logout/>;
                }}/>

              <Route exact path='/book/add' render={()=>{
                  if (!this.state.appContext.authenticated) {
                    return <Redirect to='/login'/>;
                  } else return <AddBook/>;
                }}/>

              <Route exact path='/book/list' render={()=>{
                if (!this.state.appContext.authenticated) {
                  return <Redirect to='/login'/>;
                } else return <ListBook/>;
                }}/>

              <Route exact path='/book/item/:bookid' render={({ match, history })=>{
                if (!this.state.appContext.authenticated) {
                  return <Redirect to='/login'/>;
                } else return <BookItem match={match} history={history}/>;
                }}/>

              <Route component={PageNotFound}/>

            </Switch>
          </React.Suspense>

          <Footer />

        </Router>
      </AppContext.Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
