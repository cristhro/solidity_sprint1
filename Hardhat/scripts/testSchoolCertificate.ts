import { ethers } from "hardhat";
import { expect } from "chai"; // Import assertion library (e.g., Chai)

const schoolCertificateAddress = "0xf90933f4F2C863a023408cF49301A635ecddF0d1";
const schoolGradesAddress = "0x97571d5B8A198c6AFAC497907C66F18072b232e1"; // Replace with actual address

async function main() {
  const schoolCertificateContract = await ethers.getContractAt('SchoolCertificate', schoolCertificateAddress);

  // Datos del estudiante
  const [_student] = await ethers.getSigners();
  const _studentName = "Juan";
  const _degree = "Tecnología Blockchain";
  const _year = 2023;

  // Escuela otorgue un título a un estudiante
  const tx = await schoolCertificateContract.grantCertificate(
    _student.address,
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
