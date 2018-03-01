import React, {Component} from 'react';
import FlipMove from 'react-flip-move';
import InlineEdit from 'react-edit-inline';

class TodoItems extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inputHidden: true,
      updatedText : ""
    };

    this.createTasks = this.createTasks.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.dataChanged = this.dataChanged.bind(this);
  }

  toggleInput = () => {
    this.setState({
      inputHidden: !this.state.inputHidden
    });
  };

  deleteItem = (key) => {
    this.props.deleteListItem(key);
  }

  dataChanged = (data) => {
    // Show OK button
    this.toggleInput();
    // // When clicked submit to chain
    if(data.message !== "") {
      this.state = {
        updatedText : data.message
      };
    }
  }

  submitUpdatedValue = (key) => {
      this.props.updateHandler(key, this.state.updatedText);
      this.state = {
        updatedText : ""
      };
  }

  createTasks = (todoItem) => {
    const buttonTickClass = this.state.inputHidden ? 'btn btn-xs btn-success img-circle hide' : 'btn btn-xs btn-success img-circle';
    const buttonRemoveClass = 'btn btn-xs btn-danger img-circle';
    return (
      <li key={todoItem.key}>
      <InlineEdit
          activeClassName="editing"
          text={todoItem.textVal}
          paramName="message"
          change={this.dataChanged}
        />
        <button type="button" onClick={() => this.submitUpdatedValue(todoItem.key)} className={buttonTickClass}>&#x2713;</button>
        <button type="button" className={buttonRemoveClass} onClick={() => this.deleteItem(todoItem.key)}>&#xff38;</button>
      </li>
    );
  }

  render() {
    let todoItems = this.props.items;
    let itemsInList = todoItems.map(this.createTasks);

    return (
        <ul className="listClass">
          <FlipMove duration={250} easing="ease-out">
              {itemsInList}
          </FlipMove>
        </ul>
    );
  }
}


export default TodoItems;
