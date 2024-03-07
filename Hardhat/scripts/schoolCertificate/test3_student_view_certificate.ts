import { ethers } from "hardhat";
import { expect } from "chai"; // Import assertion library (e.g., Chai)

const schoolCertificateAddress = "0x2cB39c9123FFE33d459002e7C035d91dA1dc1ed8";
const _student4Address = "0x664f16E7dC4F28fF1748aD70E3cf228F7D6E66FB"; // Replace with actual address

async function main() {
  const schoolCertificateContract = await ethers.getContractAt('SchoolCertificate', schoolCertificateAddress);

  // Estudiante ve el estado del certificado
  const certificate = await schoolCertificateContract.viewCertificate();
  console.log("certificate :", certificate);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
