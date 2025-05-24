// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    uint public data;

    constructor() {
        data = 0;
    }

    function set(uint _data) public {
        data = _data;
    }
    
    function get() public view returns (uint) {
        return data;
    }
}