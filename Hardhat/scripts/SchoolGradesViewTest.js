const hre = require("hardhat");

async function main() {
    // Ddirección del contrato desplegado
    const direccionContrato = "0x97571d5B8A198c6AFAC497907C66F18072b232e1";
    
    // Conecta al contrato
    const contrato = await hre.ethers.getContractAt("SchoolGrades", direccionContrato);

    // Llamar a un método addGrade
    const [student] = await ethers.getSigners();

    // Llamar a un método de solo lectura para ver las notas del alumno firmado
    const grades = await contrato.viewMyGrades();
    console.log("grades :", grades);
}

//0x27193d65DE70BF07AA1Ce71Cb316cb4c3A485bca  student1

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
