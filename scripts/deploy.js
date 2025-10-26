const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  // Check if private key is configured
  const signers = await ethers.getSigners();
  console.log("Number of signers found:", signers.length);
  
  if (signers.length === 0) {
    throw new Error("No signers found. Please check your PRIVATE_KEY in .env file");
  }
  
  const deployer = signers[0];
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());
  
  // Builder address - will receive all fees (0.0001 ETH per item)
  const builderAddress = "0x89F04F5C012eDa374E38a7012aeB3CB43c90A52f";
  console.log("Builder (will receive fees):", builderAddress);

  const BucketList = await ethers.getContractFactory("BucketList");
  const contract = await BucketList.deploy(builderAddress);
  
  // Wait for deployment to finish
  await contract.waitForDeployment();

  console.log("BucketList deployed to:", await contract.getAddress());

  // Write address to frontend
  const frontendDir = path.join(__dirname, "..", "frontend");
  if (!fs.existsSync(frontendDir)) fs.mkdirSync(frontendDir);
  const configPath = path.join(frontendDir, "config.js");
  const contractAddress = await contract.getAddress();
  fs.writeFileSync(
    configPath,
    `export const CONTRACT_ADDRESS = "${contractAddress}";\n`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


