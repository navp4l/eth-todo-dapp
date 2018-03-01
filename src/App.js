import React, { Component } from 'react'
import TodoContract from '../build/contracts/Todo.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

import TodoItems from './TodoItems'
import './TodoItems.css'
import Spinner from './Spinner'
import './Spinner.css'

import Loading from 'react-loading-spinner';

const contract = require('truffle-contract')
const todo = contract(TodoContract)

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoadingContent : false,
      todoItems: [],
      defaultAccount: "",
      web3: null
    }

    this.addTodoItem = this.addTodoItem.bind(this);
    this.editTodoItem = this.editTodoItem.bind(this);
    this.deleteListItem = this.deleteListItem.bind(this);
    this.resetTodo = this.resetTodo.bind(this);

  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      this.state.web3.eth.getAccounts((error, accounts) => {
        this.setState({
          web3: results.web3,
          defaultAccount : accounts[0]
        });
        console.log("Default account :: " + this.state.defaultAccount)
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract = async function() {

    todo.setProvider(this.state.web3.currentProvider)
    this.setState({
      isLoadingContent : true
    });
    var items = await this.getListItems();
    this.setState({
      todoItems : items,
      isLoadingContent : false
    });
    console.log("After get items :: " + JSON.stringify(this.state.todoItems));
  }

  addTodoItem = async function(event) {
    event.preventDefault();

    let items = this.state.todoItems;
    this.setState({
      isLoadingContent : true
    });

    if(this.inputVal.value !== "") {
      let listSize = this.state.todoItems.length;
      let success = await this.addItem({
        key : listSize + 1,
        textVal : this.inputVal.value
      });
      var newItems;
      if(success){
        newItems = await this.getListItems();
      }
    }

    this.setState({
      todoItems : newItems,
      isLoadingContent : false
    });

    console.log("After add item :: " + JSON.stringify(this.state.todoItems))

    //reset input value
    this.inputVal.value = "";
  }

  editTodoItem = async function(key, value) {
    let items = this.state.todoItems;
    if(value !== "") {
      this.setState({
        isLoadingContent : true
      });
      let listSize = this.state.todoItems.length;
      let success = await this.addItem({
        key : key,
        textVal : value
      });
    }
    var newItems = await this.getListItems();
    this.setState({
      todoItems : newItems,
      isLoadingContent : false
    });
    console.log("After add item :: " + JSON.stringify(this.state.todoItems));
  }

  deleteListItem = async function(key) {
    let items = this.state.todoItems;
    this.setState({
      isLoadingContent : true
    });
    let success = await this.deleteItem(key);
    var newItems =[];
    if(success) {
      newItems = await this.getListItems();
      this.setState({
        todoItems : newItems,
        isLoadingContent : false
      });
    }
    console.log("After delete item :: " + JSON.stringify(this.state.todoItems))
  }

  resetTodo = async function(key) {
    this.setState({
      isLoadingContent : true
    });
    let success = await this.resetList();
    if(success) {
      this.setState({
        todoItems : [],
        isLoadingContent : false
      });
    }
    console.log("After resetting item :: " + JSON.stringify(this.state.todoItems))
  }

  getListSize = async function() {
    var todoInstance = await todo.deployed();
    var size = await todoInstance.getSize.call();
    return size.toNumber();
  }

  getListItem = async function(position) {
    var todoInstance = await todo.deployed();
    return await todoInstance.getItem.call(position);
  }

  getListItems = async function() {
    let listSize = await this.getListSize();
    var listItems = [];
    for(let i = listSize; i > 0; i--) {
      let textVal = await this.getListItem(i);
      listItems.push({
        key : i,
        textVal : textVal
      });
    }
    return listItems;
  }

  addItem = async function(todoItem) {
    var todoInstance = await todo.deployed();

    let itemVal = todoItem.textVal;
    let itemKey = todoItem.key;
    let returnVal = false;
    let txn = await todoInstance.addOrUpdate(itemKey, itemVal, {from : this.state.defaultAccount, gas : 115000, gasPrice : 100000000000});
    for(let i = 0; i < txn.logs.length; i++) {
      let log = txn.logs[0];
      if(log.event === "LogItemAdded") {
        returnVal = true;
      }
    }
    return returnVal;
  }

  editItem = async function(todoItem) {
    var todoInstance = await todo.deployed();

    let itemVal = todoItem.textVal;
    let itemKey = todoItem.key;
    let returnVal = false;
    let txn = await todo.addOrUpdate(itemKey, itemVal, {from : this.state.defaultAccount, gas : 115000, gasPrice : 100000000000});
    for(let i = 0; i < txn.logs.length; i++) {
      let log = txn.logs[0];
      if(log.event === "LogItemUpdated") {
        returnVal = true;
      }
    }
    return returnVal;
  }

  deleteItem = async function(position) {
    var todoInstance = await todo.deployed();

    let returnVal = false;
    let txn = await todoInstance.remove(position, {from : this.state.defaultAccount, gas : 115000, gasPrice : 100000000000});
    for(let i = 0; i < txn.logs.length; i++) {
      let log = txn.logs[0];
      if(log.event === "LogItemRemoved") {
        returnVal = true;
      }
    }
    return returnVal;
  }

  resetList = async function(position) {
    var todoInstance = await todo.deployed();

    let returnVal = false;
    let txn = await todoInstance.deleteTodo({from : this.state.defaultAccount, gas : 115000, gasPrice : 100000000000});
    for(let i = 0; i < txn.logs.length; i++) {
      let log = txn.logs[0];
      if(log.event === "LogTodoListReset") {
        returnVal = true;
      }
    }
    return returnVal;
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <span className="pure-menu-heading pure-menu-link">TO-DO LIST</span>
        </nav>

        <main id="container" className="container">
          <Loading isLoading={this.state.isLoadingContent} spinner={Spinner} loadingClassName='loading'>
            <div className="todoListMainDiv">
              <div className="header">
                <form onSubmit={this.addTodoItem}>
                  <input ref={(a) => this.inputVal = a} placeholder="Enter Task details" type="text" />
                  <button type="submit">Add Task</button>
                </form>
                <button className="alignCentre" onClick={this.resetTodo}>Reset List</button>
              </div>
              <TodoItems updateHandler={this.editTodoItem} items={this.state.todoItems} deleteListItem={this.deleteListItem} />
            </div>
          </Loading>
        </main>

      </div>
    );
  }
}

export default App
