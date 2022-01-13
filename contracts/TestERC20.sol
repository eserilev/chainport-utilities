
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

// Learn more about the ERC20 implementation 
// on OpenZeppelin docs: https://docs.openzeppelin.com/contracts/4.x/erc20
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    constructor(string memory name, string memory symbol, uint256 amount) ERC20(name, symbol) {
        _mint(msg.sender, amount * 10 ** 18);
    }

    function mint() public {
        _mint(msg.sender, 1000 * 10 ** 18);
    }
}