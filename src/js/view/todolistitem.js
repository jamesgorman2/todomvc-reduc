import React, { PropTypes } from 'react';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default React.createClass({
  propTypes: {
    onCompletedClick: PropTypes.func.isRequired,
    onDestroyClick: PropTypes.func.isRequired,
    onUpdateTodo: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  },
  getInitialState: function getInitialState() {
    // naming it initialX clearly indicates that the only purpose
    // of the passed down prop is to initialize something internally
    return {
      editText: this.props.text,
      editing: false,
    };
  },
  focusEdit: function focusEdit() {
    const that = this;
    return () => {
      console.log(that);
      console.log(that.refs);
      console.log(that.refs.editField);
      const field = React.findDOMNode(that.refs.editField);
      field.setSelectionRange(field.value.length, field.value.length);
    };
  },
  handleDoubleClick: function handleDoubleClick() {
    this.setState({editing: true});
  },
  handleEdit: function handleEdit(e) {
    this.setState({editText: e.target.value});
  },
  handleSubmit: function handleSubmit() {
    const text = this.state.editText.trim();
    if (text.length > 0) {
      this.props.onUpdateTodo(this.props.index, text);
      this.setState(this.getInitialState());
    }
  },
  handleKeyDown: function handleKeyDown(e) {
    if (e.which === ESCAPE_KEY) {
      this.setState(this.getInitialState());
    } else if (e.which === ENTER_KEY) {
      this.handleSubmit();
    }
  },
  render: function render() {
    return (
      <li className={(this.props.completed ? 'completed' : '') + (this.state.editing ? ' editing' : '')}>
         <div className="view">
           <input className="toggle"
                  type="checkbox"
                  checked={this.props.completed}
                  onChange={() => this.props.onCompletedClick(this.props.index, this.props.completed)}/>
           <label onDoubleClick={this.handleDoubleClick}>
             {this.props.text}
           </label>
           <button className="destroy" onClick={() => this.props.onDestroyClick(this.props.index)}></button>
         </div>
        { this.state.editing ?

          (<input className="edit"
                  ref={'editField'}
                  value={this.state.editText}
                  autoFocus={true}
                  onChange={this.handleEdit}
                  onBlur={this.handleSubmit}
                  onKeyDown={this.handleKeyDown}
                  onFocus={this.focusEdit()} />) : null }
      </li>
    );
  },
});
