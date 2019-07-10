import React from 'react';

import { AppContext } from '../context.jsx'
import { checkLogin, checkRegister } from './Sanitize.jsx';
import { sendForm } from './SendData.jsx';
import { Redirect } from 'react-router-dom';


export default class Home extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      display: 'login', // 'login' || 'register'
      input:{
        username: '',
        password: '',
        confirm: ''
      },
      alert: '',
      disable: false,
      request: null,
    }
  }

  clearRequest = ()=>{
    if (this.state.request) {
      this.state.request.abort();
      this.setState({ request: null, alert: '' });
    }
  }

  componentDidMount() {
    document.title = 'Your-Book-List/Login';
  }

  componentWillUnmount() {
    this.clearRequest();
  }

  handleSubmit = (e)=>{
    e.preventDefault();
    if (this.state.disable == true) return;
    if (this.state.request) this.clearRequest();

    this.setState({
      disable: true,
      alert: 'Sending form...' });

    var input = this.state.input;
    var submitType = e.target.dataset.type;

    if (submitType === 'login') {
      var url = '/api/login';
      var check = checkLogin(input.username, input.password);
    }
    else if (submitType === 'register') {
      var url = '/api/register';
      var check = checkRegister(input.username, input.password, input.confirm);
    }
    else return;

    if (check) return this.setState({alert: check, disable: false });

    sendForm(this, submitType, url, input, (err)=>{
      if (err) return console.log(`Error ${err}`);
      this.context.setAppContext('authenticated', true);
    });
  }

  handleInput = (e)=>{
    var type = e.target.name;
    var value = e.target.value;
    this.setState((state)=>{
      var input = state.input;
      input[type] = value;
      return { input: input };
    });
  }

  handleDisplay = (e)=>{
    var data = e.target.dataset.button;

    this.clearRequest();
    this.setState({input: {
      username: '',
      password: '',
      confirm: ''
    }})

    if (data === 'fromLogin')
      this.setState({display: 'register'});
    else
      this.setState({display: 'login'});
  }

  render() {

    if (this.state.redirect === true) {
      return <Redirect to='/'/>;
    }

    if (this.state.display === 'login') {
      var inputArray = ['username', 'password'];
    }
    else {
      var inputArray = ['username', 'password', 'confirm'];
    }

    var inputDisplay = [];

    for (let i = 0, l = inputArray.length; i < l; i++) {
      if (inputArray[i] === 'password' || inputArray[i] === 'confirm') {
        var type = 'password';
      } else { var type = 'text'}

      if (inputArray[i] === 'confirm') {
        var placeholder = 'Confirm password...';
      } else { var placeholder = `Enter ${inputArray[i]}...`; }

      var input =
        <input
          key={i}
          type={type}
          name={inputArray[i]}
          value={this.state.input[inputArray[i]]}
          onChange={this.handleInput}
          placeholder={placeholder}
          autoComplete="off"/>
      ;

      inputDisplay.push(input);
    }

    if (this.state.display === 'login') {
      var form =
        <form action="" onSubmit={this.handleSubmit} className='loginLoginForm'  data-type='login'>
          {inputDisplay}
          <button type='submit'>Login</button>
          <button
            type='button' data-button='fromLogin'
            onClick={this.handleDisplay}>Register</button>
        </form>
      ;
    }
    else {
      var form =
        <form action="" onSubmit={this.handleSubmit} className='loginRegisterForm' data-type='register'>
          {inputDisplay}
          <button type='submit'>Register</button>
          <button
            type='button' data-button='fromRegister'
            onClick={this.handleDisplay}>Back</button>
        </form>
      ;
    }

    var alert = <div className='loginAlert'>{this.state.alert}</div>

    return (
      <div className="loginDisplay">
        {form}
        {alert}
      </div>
    );
  }
}
