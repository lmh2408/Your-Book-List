import React from 'react';
import throttle from 'lodash/throttle';


const ViewBook = React.lazy(()=>import('../common/ViewBook.jsx'));


export default class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      bookId: '',
      hint: true,
    };
    this.findBookThrottled = throttle(this.findBook, 500);
  }

  componentWillUnmount() {
    this.findBookThrottled.cancel();
  }

  handleInput = (e)=>{
    this.setState({ input: e.target.value });
  };

  findBook = ()=>{
    var id = this.state.input;
    if (id) {
      this.setState({ bookId: id, hint: false });
    }
  };

  render() {


    return (
      <React.Fragment>
        <div className='addBookInputContainer'>
          <input type="text" onChange={this.handleInput} value={this.state.input} placeholder='Enter id...'/>
          <button onClick={this.findBookThrottled}>Find</button>
        </div>
        {(()=>{
          if (this.state.hint) {
            return (
              <div className='addBookHint'>
                <p>A book's ID can be found in its url:</p>
                <div>http://www.gutenberg.org/ebooks/<u><b>1184</b></u></div>
              </div>
            );
          }
          else {
            return <ViewBook bookId={this.state.bookId}/>;
          }
        })()}

      </React.Fragment>
    );
  }
}
