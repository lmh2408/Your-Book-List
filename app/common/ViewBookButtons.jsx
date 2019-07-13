import throttle from 'lodash/throttle';
import React from 'react';
const Fragment = React.Fragment;

export default class ViewBookButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    }
    this.buttonPressThrottled = throttle(this.buttonPress, 500);
  }

  componentDidMount() {
    if (!this.props.userData) {
      this.setState({ input: 'plan-to-read' });
    }
    else {
      this.setState({ input: this.props.userData.status });
    }
  }

  // componentWillUnmount() {
  //   this.buttonPressThrottled.cancel()
  // }

  handleInput = (e)=>{
    this.setState({input: e.target.value})
  }

  buttonPress = (e)=>{
    var type = e.target.dataset.type;
    this.props.turnOffButton();

    if (type == 'add') {
      this.props.addBook(this.state.input);
    }
    else if (type == 'change') {
      this.props.changeBook(this.state.input);
    }
    else if (type == 'remove') {
      this.props.removeBook();
    }
  }

  render() {
    if (!this.props.blockButtons) {
      var options = ['reading', 'plan-to-read', 'finished'];

      return (

        <div className='viewBookButtons'>

          <div>
            <label htmlFor="viewBookStatusSelect">
              <select name="status" value={this.state.input} onChange={this.handleInput} id='viewBookStatusSelect'>
                {options.map((value, i)=>{
                  return <option value={value} key={i}>{value}</option>;
                })}
              </select>
              <span>v</span>
            </label>
          </div>


          {(()=>{
            if (!this.props.userData)
              return <button data-type='add' onClick={this.buttonPressThrottled}>Add to list</button>;
            else
              return (

                <Fragment>
                  <button data-type='change' onClick={this.buttonPressThrottled}>Change</button>
                  <button data-type='remove' onClick={this.buttonPressThrottled}>Remove</button>
                </Fragment>

              );
          })()}
        </div>
      );
    }
    else {
      return (
        <div className="viewBookButtons">
          ...
        </div>
      );
    }

  }

}
