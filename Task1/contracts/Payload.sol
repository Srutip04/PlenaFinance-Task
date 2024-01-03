pragma solidity ^0.8.0;

contract Payload {
    function transferFunds( address payable to) external {
        to.transfer(address(this).balance);
    }
}