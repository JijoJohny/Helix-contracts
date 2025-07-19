const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WalletCreator", function () {
  let WalletCreator, walletCreator, owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    WalletCreator = await ethers.getContractFactory("WalletCreator");
    walletCreator = await WalletCreator.deploy();
    await walletCreator.deployed();
  });

  it("Should create a new wallet", async function () {
    const tx = await walletCreator.connect(owner).createWallet();
    const receipt = await tx.wait();
    
    const event = receipt.events.find(e => e.event === "WalletCreated");
    expect(event.args.owner).to.equal(owner.address);
    expect(event.args.walletAddress).to.properAddress;
  });
});