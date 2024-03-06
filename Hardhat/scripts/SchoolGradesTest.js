const hre = require("hardhat");

async function main() {
    // Suponiendo que tienes la dirección del contrato desplegado
    const direccionContrato = "Address_Contract";
    
    // Conecta al contrato
    const contrato = await hre.ethers.getContractAt("SchoolGrades", direccionContrato);

    // Llamar a un método addGrade
    const [student] = await ethers.getSigners();



    const tx = await contrato.addGrade(student.address, "Tecnología Blockchain", 9);
    await tx.wait();

    // Llamar a un método de solo lectura
    const grades = await contrato.viewMyGrades();
    console.log("grades :", grades);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
