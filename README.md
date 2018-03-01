# Ethereum TODO Decentralized application

## Overview
A Simple ToDo DApp build on the Ethereum platform using the Truffle React box.

## Accessing the app running on Ropsten testnet

**Note:** Contract is deployed on Ropsten Testnet at **[0x919D4eB9280c826f7dD89637A9E26d884B2EFa25](https://ropsten.etherscan.io/address/0x919d4eb9280c826f7dd89637a9e26d884b2efa25)** deployed through account [0x0e21b8e4e49fa6e9994fa125bcdf0979734774ff](https://ropsten.etherscan.io/address/0x0e21b8e4e49fa6e9994fa125bcdf0979734774ff)

### Pre-requisites

* Ropsten test net ethers
* Metamask

>Load `https://limitless-taiga-87984.herokuapp.com/` on a browser with Metamask connected to `Ropsten test network`.

**Faucet to get Ropsten test net ethers - https://faucet.bitfwd.xyz/**

## Running the app locally

### Pre-requisites

* Node v9.0 or above
* Truffle v4.0 or above
* Solidity - solc v0.4.19 or above
* Ganache
* Metamask

### Instructions

* Clone this repository and cd into the **eth-todo-dapp** directory

* Test the smart contracts - Run `truffle test --network ganache`

* Deploy the smart contracts - Run `truffle migrate --reset --network ganache`

* Start the React Web DApp - `npm run start`

* Hurray! You can now interact with the DApp

### TODO Eth DApp

#### Adding tasks / items to the ToDo list
When interacting with the DApp, any transaction that requires an update to the values in the blockchain will need gas and so Metamask is shown in such scenarios.

![alt whenInteracting](images/whenInteracting.png)

When items are added to the list, they are listed with the latest item shown on top.

![alt afterAddingItems](images/afterAddingItems.png)

#### Removing tasks / items from the ToDo list
Items in the list can be removed by clicking on the *X* mark
in the list item.

After *Add Truffle Contract Tests* and *Setup Truffle React module* tasks are deleted

![alt afterDelete](images/afterDelete.png)

#### Editing tasks / items in the ToDo list
When clicking on an existing row like *Using Truffle build contracts*, inline editing is enabled and the value of the task can be updated inline.

![alt inlineEdit](images/inlineEdit.png)

After changing the value, there is a new button with a *tick symbol* which appears and on clicking this, Metamask pops up for confirmation post which the updated value is saved to the blockchain.

![alt inlineEditConfirm](images/inlineEditConfirm.png)

#### Resetting the entire ToDo list
On clicking the `Reset List` button the entire list is reset and all the tasks are removed.

![alt afterReset](images/afterReset.png)

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
