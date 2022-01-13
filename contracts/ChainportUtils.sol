pragma solidity ^0.8.11;

import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract ChainportUtils {

    /* Fallback function, don't accept any ETH */
    receive() external payable {
        revert("ChainportUtils does not accept payments");
    }

    /**
    * @dev Checks the token balance of a wallet in a token contract
    * @param user the wallet address to be checked
    * @param token the token address whose balance will be returned
    * @notice will return 0 if address is not a contract
    */
    function tokenBalance(address user, address token) public view returns (uint) {
        uint256 contractSize;
        assembly { contractSize := extcodesize(token) }

        if (contractSize > 0 ) {  
            return IERC20(token).balanceOf(user);
        } else {
            return 0;
        }
    }

    /**
    * @dev Checks the token balances of a wallet for multiple tokens
    * @param user the wallet address to be checked
    * @param tokens the token address whose balance will be returned
    * @notice pass 0x0 as token address to get native token balance
    * @notice will return 0 if address is not a contract
    * @notice will return 0 if contract address doesnt implement balanceOf or 
    */
    function tokenBalances(address user, address[] memory tokens) external view returns (uint[] memory) {
        uint256[] memory addrBalances = new uint256[](tokens.length);

        for (uint i = 0; i < tokens.length; i++) {

            if (tokens[i] != address(0x0)) { 
                addrBalances[i] = tokenBalance(user, tokens[i]);
            } else {
                addrBalances[i] = user.balance;
            }
        }  
    
        return addrBalances;
    }
}