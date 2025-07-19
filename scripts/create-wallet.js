const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Creating wallet with account:", deployer.address);

  const WalletCreator = await hre.ethers.getContractFactory("WalletCreator");
  const walletCreator = await WalletCreator.attach("0x..."); // Replace with deployed address
  
  const tx = await walletCreator.createWallet();
  const receipt = await tx.wait();
  
  const event = receipt.events.find(e => e.event === "WalletCreated");
  console.log("New wallet created at:", event.args.walletAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });