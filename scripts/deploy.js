const hre = require("hardhat");

async function main() {
  const WalletCreator = await hre.ethers.getContractFactory("WalletCreator");
  const walletCreator = await WalletCreator.deploy();
  
  await walletCreator.deployed();
  console.log("WalletCreator deployed to:", walletCreator.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });