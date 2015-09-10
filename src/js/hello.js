import React from 'react';

export default React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
  },
  render: function render() {
    return (
      <div className="greeting">
        <h1>Hello, {this.props.name}!</h1>
      </div>
    );
  },
});
