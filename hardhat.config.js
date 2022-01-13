require("@nomiclabs/hardhat-waffle");


require("solidity-coverage");
require("@nomiclabs/hardhat-waffle");

ALCHEMY_API_KEY_ROPSTEN = '';
ALCHEMY_API_KEY_MUMBAI = '';
PRIVATE_KEY = '';

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


module.exports = {
  solidity: "0.8.11",
  /*networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY_ROPSTEN}`,
      accounts: [`${PRIVATE_KEY}`]
    },
    mumbai: {
        url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY_MUMBAI}`,
        accounts: [`${PRIVATE_KEY}`]
    }
  }*/
};