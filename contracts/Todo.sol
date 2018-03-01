/**
@title Todo main contract - holds all the tasks of the Todo list.
       The keys array contains keys in the same position as the
       list in the React app.
@author Naveen Palaniswamy
@copyright Naveen Palaniswamy
*/

pragma solidity ^0.4.19;


contract Todo {

    // Mapping keys to tasks
    mapping(uint => string) private tasks;
    uint[] private keys;
    uint private counter;

    event LogItemAdded(uint position);
    event LogItemUpdated(uint position);
    event LogItemRemoved(uint position);

    /**
    @notice Add or Update task
    @param _position Postion in the list
    @param _value Task value to be added
    */
    function addOrUpdate(uint _position, string memory _value) public {
        require(bytes(_value).length > 0);

        if (_position <= keys.length) {
            // This is an update scenario
            uint key = keys[_position - 1];
            LogItemUpdated(_position);
            tasks[key] = _value;
        } else {
            ++counter;
            LogItemAdded(_position);
            keys.push(counter);
            tasks[counter] = _value;
        }
    }

    /**
    @notice Remove task
    @param _position Postion in the list
    */
    function remove(uint _position) public {
        require(_position <= keys.length);

        uint key = keys[_position - 1];
        LogItemRemoved(_position);

        delete tasks[key];
        for (uint i = _position - 1; i < keys.length - 1; i++) {
            keys[i] = keys[i + 1];
        }

        keys.length--;
    }

    /**
    @notice List size
    @return {
      _size Returns size of the list
    }
    */
    function getSize() public view returns (uint _size) {
        _size = keys.length;
    }

    /**
    @notice Get task value
    @return {
      _task Returns string value of the task item
    }
    */
    function getItem(uint _position) public view returns (string _task) {
        uint key = keys[_position - 1];
        _task = tasks[key];
    }

}
