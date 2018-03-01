# Ethereum TODO Decentralized application

## Overview
A Simple ToDo DApp build on the Ethereum platform using the Truffle React box.

**Note:** Contract is deployed on Ropsten Testnet at **[0x919D4eB9280c826f7dD89637A9E26d884B2EFa25](https://ropsten.etherscan.io/address/0x919d4eb9280c826f7dd89637a9e26d884b2efa25)** deployed through account [0x0e21b8e4e49fa6e9994fa125bcdf0979734774ff](https://ropsten.etherscan.io/address/0x0e21b8e4e49fa6e9994fa125bcdf0979734774ff)

## Running the app locally

### Prerequisites

* Node v9.0 or above
* Truffle v4.0 or above
* Solidity - solc v0.4.19 or above
* Ganache
* Metamask
* Ropsten (if interacting with contract deployed on Ropsten)

### Instructions

* Clone this repository and cd into the **eth-todo-dapp** directory

* Test the smart contracts - Run `truffle test --network ganache`

* Deploy the smart contracts - Run `truffle migrate --reset --network ganache`

* Start the React Web DApp - `npm run start`

* Hurray! You can now interact with the DApp

### TODO Eth DApp

#### Adding tasks / items to the ToDo list
When items are added to the list, they are listed with the latest item shown on top.

![alt afterAddingItems][images/afterAddingItems.png]


#### Editing tasks / items in the ToDo list

#### Removing tasks / items from the ToDo list

#### Resetting the entire ToDo list


### Tasks
* [x] Smart contracts
    * Smart contracts are available in `contracts/` directory
* [x] Tests for Smart contracts
    * Smart contract tests are available in `test/` directory
* [x] React DApp UI
    * React App related files and changes are available in the `src\` directory
* [x] Deploy and test locally
* [x] Deploy and test on Ropsten

### Tools used
* Node
* Truffle
* Ganache
* Metamask
* React
* Geth
