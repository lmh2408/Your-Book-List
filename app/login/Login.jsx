import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'login', // 'login' || 'register'
      input:{
        username: '',
        password: '',
        confirm: ''
      },
      alert: ''
    }
  }

  componentDidMount() {
    document.title = 'Your-Book-List/Login';
  }

  handleLogin = (e)=>{
    e.preventDefault();
    var input = this.state.input;
    if (!input.username || !input.password) {
      return this.setState({alert: 'One of the fields is empty.'});
    }
  }

  handleRegister = (e)=>{
    e.preventDefault();
    var input = this.state.input;
    if (!input.username || !input.password || !input.confirm) {
      return this.setState({alert: 'One of the fields is empty.'});
    }

    if (input.password !== input.confirm) {
      return this.setState({alert: 'Password confirmation does not match.'});
    }

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
        <form action="" onSubmit={this.handleLogin} className='loginLoginForm'>
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
        <form action="" onSubmit={this.handleRegister} className='loginRegisterForm'>
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
