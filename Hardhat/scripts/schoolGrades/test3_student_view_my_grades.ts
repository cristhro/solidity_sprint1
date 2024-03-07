import { ethers } from "hardhat";
import { expect } from "chai"; // Import assertion library (e.g., Chai)

const { SCHOOL_GRADES_CONTRACT_ADDRESS, STUDENT_ADDRESS } = process.env;

async function main() {
  const schoolGradesContract = await ethers.getContractAt("SchoolGrades", SCHOOL_GRADES_CONTRACT_ADDRESS);

  const grades = await schoolGradesContract.viewMyGrades();
  console.log(`My Grades for ${STUDENT_ADDRESS}  \n`, grades);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
