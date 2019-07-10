import React from 'react';
import throttle from 'lodash.throttle';


const ViewBook = React.lazy(()=>import('../common/ViewBook.jsx'));


export default class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      bookId: '',
      hint: true,
    };
    this.findBookThrottled = throttle(this.findBook, 1000);
  }

  componentWillUnmount() {
    this.findBookThrottled.cancel();
  }

  handleInput = (e)=>{
    this.setState({ input: e.target.value });
  };

  findBook = ()=>{
    var id = this.state.input;
    this.setState({ bookId: id });
  };

  render() {

    return (
      <React.Fragment>
        <div>
          <input type="text" onChange={this.handleInput} value={this.state.input}/>
          <button onClick={this.findBookThrottled}>Find</button>
        </div>

        <ViewBook bookId={this.state.bookId}/>
      </React.Fragment>
    );
  }
}
