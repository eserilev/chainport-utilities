const { saveContractAddress, saveContractAbi } = require('./utils')

async function main() {
    await hre.run('compile');
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const ChainportUtils = await ethers.getContractFactory("ChainportUtils");
    const chainportUtils = await ChainportUtils.deploy();

    saveContractAbi(hre.network.name, 'ChainportUtils', (await hre.artifacts.readArtifact("ChainportUtils")).abi);

    saveContractAddress(hre.network.name, 'ChainportUtils', chainportUtils.address);
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });