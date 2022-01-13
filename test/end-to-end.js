const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe('End To End', function () {
    const provider = waffle.provider;
    
    var accounts;
    var chainportUtils;
    var testTokens
    before(async() => {
        testTokens = []
        accounts = await ethers.getSigners();
        const ChainportUtils = await ethers.getContractFactory("ChainportUtils");

        const TestToken = await ethers.getContractFactory("TestToken");
        
        for (let i = 1; i <= 10; i++) {
            let testToken = await TestToken.deploy('test' + i, 'test' + i, i);
            await testToken.deployed();
            testTokens.push(testToken);
        }
     
        chainportUtils = await ChainportUtils.deploy();
        await chainportUtils.deployed();
    })
    it("checks balances", async() => {
        tokenAddresses = []
        tokenBalances = []

        for (let i = 0; i < testTokens.length; i++) {
            tokenAddresses.push(testTokens[i].address)
            tokenBalances.push(await testTokens[i].balanceOf(accounts[0].address));
        }

        let balances = await chainportUtils.tokenBalances(accounts[0].address,tokenAddresses);
        expect(tokenBalances.length).to.be.equal(balances.length)
        for(let i = 0; i < tokenBalances.length; i++) {
            expect(tokenBalances[i]).to.be.equal(balances[i]);
        }
    })
    it("returns zero for non contract address", async() => {
        let balances = await chainportUtils.tokenBalances(accounts[0].address,[accounts[1].address]);

        expect(balances[0]).to.be.equal(0);
    })
    it("checks native token balance", async() => {
        let balances = await chainportUtils.tokenBalances(accounts[0].address, [ethers.constants.AddressZero]);
        let nativeBalance =  await provider.getBalance(accounts[0].address)
        
        expect(balances[0]).to.be.equal(nativeBalance);
    })
    it("should revert when trying to send eth", async() => {
        await expect(provider.call({
            to: chainportUtils.address,
            value: ethers.utils.parseEther("1.0")
        })).to.be.revertedWith('ChainportUtils does not accept payments');
    })
});