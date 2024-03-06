const hre = require("hardhat");

async function main() {
    // Dirección del contrato desplegado
    const direccionContrato = "0x97571d5B8A198c6AFAC497907C66F18072b232e1";
    
    // Conecta al contrato
    const contrato = await hre.ethers.getContractAt("SchoolGrades", direccionContrato);

    // Llamar a un método de solo lectura todas las notas de un estudiante especifico
    const grades = await contrato.viewStudentGrades('0x27193d65DE70BF07AA1Ce71Cb316cb4c3A485bca');
    console.log("Grades for 0x27193d65DE70BF07AA1Ce71Cb316cb4c3A485bca \n:", grades);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
