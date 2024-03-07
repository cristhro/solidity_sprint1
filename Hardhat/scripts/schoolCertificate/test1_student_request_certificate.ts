import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();
const { SCHOOL_CERTIFICATE_CONTRACT_ADDRESS } = process.env;


async function main() {
  const schoolCertificateContract = await ethers.getContractAt('SchoolCertificate', SCHOOL_CERTIFICATE_CONTRACT_ADDRESS);

  // Datos del estudiante
  const certificateInfo = {
    studentName: "Juan",
    degree: "Tecnología Blockchain",
    year: 2023
  };


  // Estudiante solicita un título
  const tx = await schoolCertificateContract.requestCertificate(
    certificateInfo.studentName,
    certificateInfo.degree,
    certificateInfo.year,
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
