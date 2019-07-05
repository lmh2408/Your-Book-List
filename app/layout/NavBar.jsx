import React from 'react';
import { Link, NavLink } from "react-router-dom";


export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };
  }

  handleExpand = ()=>{
    this.setState((state)=>{
      return {
        expand: !state.expand,
      };
    });
  }

  render() {
    if (!this.props.authenticated) {
      var menuItems =
        <React.Fragment>
          <NavLink to='/login'><div><span>Login</span></div></NavLink>
          <a target="_blank" href="http://www.gutenberg.org/"><div><span>Project Guntenburg</span></div></a>
        </React.Fragment>
      ;
    }
    else {
      var menuItems =
        <React.Fragment>
          <div><span>Add book</span></div>
          <div><span>My list</span></div>
          <div><span>Log Out</span></div>
          <div><span>Project Guntenburg</span></div>
        </React.Fragment>
      ;
    }

    if (this.props.screen === 'sm') {
      var navSmBar =
        <div className="navBar-sm-bar">
          <Link to='/'><span>Your-Book-list</span></Link>
          <button onClick={this.handleExpand}>
            <img src="/images/burger.svg" alt="burger"/>
          </button>
        </div>
      ;

      if (this.state.expand === true) {
        var navSmExpandClasses = 'navBar-sm-expand appear'
      }
      else {
        var navSmExpandClasses = 'navBar-sm-expand disappear'
      }

      var navSmExpand =
        <div className={navSmExpandClasses}>
          {menuItems}
        </div>
      ;

      return (
        <nav>
          {navSmBar}
          {navSmExpand}
        </nav>
      );
    }

    else {

      return (
        <nav className='navBar-lg'>
          <Link to='/'><span className='navBar-lg-logo'>Your-Book-List</span></Link>
          <div className="navItems">
            {menuItems}
          </div>
        </nav>
      );
    }

  }
};
