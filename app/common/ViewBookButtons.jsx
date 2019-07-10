import React from 'react';
const Fragment = React.Fragment;

export default class ViewBookButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: this.props.status,
    }
  }

  handleInput = (e)=>{
    this.setState({input: e.target.value})
  }

  buttonPress = (e)=>{
    var type = e.target.dataset.type;
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
    var options = ['reading', 'plan-to-read', 'finished'];

    return (

      <div>
        <select name="status" value={this.state.input}>
          {options.map((value, i)=>{
            return <option value={value} key={i}>{value}</option>;
          })}
        </select>

        {()=>{
          if (!this.props.owned)
            return <button data-type='add' onClick={this.buttonPress}>Add to list</button>;
          else
            return
              <Fragment>
                <button data-type='change' onClick={this.buttonPress}>Change</button>
                <button data-type='remove' onClick={this.buttonPress}>Remove</button>
              </Fragment>
            ;
        }}
      </div>
    );
  }

}
