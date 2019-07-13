import React from 'react';


export default class NavButtons extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (

      <div className='listBook-navButtons'>
        {(()=>{
          if (this.props.booksLength > 0 && this.props.booksLength < this.props.count) {
            var buttons = [];
            if (this.props.position.skip != 0)
              buttons.push(
                <button data-type='prev' onClick={this.props.handleNavigate} key='p'>&lt;</button>
              );
            if (this.props.position.skip < this.props.count - this.props.position.limit)
              buttons.push(
                <button data-type='next' onClick={this.props.handleNavigate} key='n'>&gt;</button>
              );
            return buttons;
          }
        })()}
      </div>

    );
  }
}
