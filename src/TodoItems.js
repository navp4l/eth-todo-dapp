import React, {Component} from 'react';
import FlipMove from 'react-flip-move';
import InlineEdit from 'react-edit-inline';

class TodoItems extends Component {

  constructor(props) {
    super(props);

    this.createTasks = this.createTasks.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem = (key) => {
    this.props.deleteListItem(key);
  }

  dataChanged = (key) => {
    // Show OK button


    // When clicked submit to chain
  }

  createTasks = (todoItem) => {
    return (
      <li key={todoItem.key}>
      <InlineEdit
          activeClassName="editing"
          text={todoItem.textVal}
          paramName="message"
          change={this.dataChanged}
          key={todoItem.key}
          style={{
            backgroundColor: 'yellow',
            minWidth: 150,
            display: 'inline-block',
            margin: 0,
            padding: 0,
            fontSize: 15,
            outline: 0,
            border: 0
          }}
        />
          <button type="button" onClick={() => this.deleteItem(todoItem.key)} className="btn btn-success ml-auto">Success</button>
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
