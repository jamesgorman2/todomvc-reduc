import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    onCompletedClick: PropTypes.func.isRequired,
    onDestroyClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  },
  render: function render() {
    return (
      <li className={this.props.completed ? 'completed' : ''}>
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={this.props.completed}
                 onClick={() => this.props.onCompletedClick(this.props.index, this.props.completed)} />
          <label>{this.props.text}</label>
          <button className="destroy" onClick={() => this.props.onDestroyClick(this.props.index)}></button>
        </div>
        <input className="edit" value="Create a TodoMVC template"/>
      </li>
    );
  },
});
