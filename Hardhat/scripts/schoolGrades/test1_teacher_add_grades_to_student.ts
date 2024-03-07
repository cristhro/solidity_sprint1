import { ethers } from "hardhat";
import { expect } from "chai"; // Import assertion library (e.g., Chai)

const { SCHOOL_GRADES_CONTRACT_ADDRESS, STUDENT_ADDRESS } = process.env;

async function main() {
  const schoolGradesContract = await ethers.getContractAt("SchoolGrades", SCHOOL_GRADES_CONTRACT_ADDRESS);

  //student 1
  const tx1 = await schoolGradesContract.addGrade(STUDENT_ADDRESS, "Ethereum: Clientes y transacciones", 7);
  await tx1.wait();
  console.log(`tx1 [Ethereum: Clientes y transacciones = 7] Grades for ${STUDENT_ADDRESS}  \n`, tx1);

  const tx2 = await schoolGradesContract.addGrade(STUDENT_ADDRESS, "Tecnología Blockchain", 10);
  await tx2.wait();
  console.log(`tx2 [Tecnología Blockchain = 10] Grades for ${STUDENT_ADDRESS}  \n`, tx2);
  
  const tx3 = await schoolGradesContract.addGrade(STUDENT_ADDRESS, "Ecosistema Blockchain", 8);
  await tx3.wait();
  console.log(`tx3 [Ecosistema Blockchain = 8] Grades for ${STUDENT_ADDRESS}  \n`, tx3);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
