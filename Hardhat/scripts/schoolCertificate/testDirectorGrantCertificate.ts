import { ethers } from "hardhat";
import { expect } from "chai"; // Import assertion library (e.g., Chai)

const schoolCertificateAddress = "0xcaaB1Da899A1106125dB015ED7E389f187812886";
const _student4Address = "0x664f16E7dC4F28fF1748aD70E3cf228F7D6E66FB"; // Replace with actual address

async function main() {
  const schoolCertificateContract = await ethers.getContractAt('SchoolCertificate', schoolCertificateAddress);

  // Datos del estudiante
  const _studentName = "Juan";
  const _degree = "Tecnología Blockchain";
  const _year = 2023;

  // Escuela otorgue un título a un estudiante
  const tx = await schoolCertificateContract.grantCertificate(
    _student4Address,
    _studentName,
    _degree,
    _year
  );
  await tx.wait();

  
  // Estudiante ve su diploma
  const certificate = await schoolCertificateContract.viewCertificate();
  console.log("certificate :", certificate);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
