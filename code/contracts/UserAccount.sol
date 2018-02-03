pragma solidity ^0.4.4;

contract UserAccount {

    struct Account {
        string firstName;
        string lastName;
    }

    event AccountEvent (
        string firstName,
        string lastName
    );

    mapping (address => Account) accounts;
    address[] public allAccounts;

    function setAccount(string _firstName, string _lastName) public {
        var account = accounts[msg.sender];

        account.firstName = _firstName;
        account.lastName = _lastName;
        AccountEvent(_firstName, _lastName);

        allAccounts.push(msg.sender);
    }

    function getAccounts() view public returns(address[]) {
        return allAccounts;
    }

    function getAccount(address _address) view public returns(string, string) {
        return (accounts[_address].firstName, accounts[_address].lastName);
    }

    function countAccounts() view public returns(uint) {
        return allAccounts.length;
    }
 }
