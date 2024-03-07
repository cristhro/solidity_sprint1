import { ethers } from "hardhat";
import { expect } from "chai"; // Import assertion library (e.g., Chai)

const { SCHOOL_CERTIFICATE_CONTRACT_ADDRESS } = process.env;

async function main() {
  const schoolCertificateContract = await ethers.getContractAt('SchoolCertificate', SCHOOL_CERTIFICATE_CONTRACT_ADDRESS);

  // Estudiante ve el estado del certificado
  const certificate = await schoolCertificateContract.viewCertificate();
  console.log("certificate :", certificate);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
