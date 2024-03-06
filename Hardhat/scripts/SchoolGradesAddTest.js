const hre = require("hardhat");

async function main() {
    // Dirección del contrato desplegado
    const direccionContrato = "0x97571d5B8A198c6AFAC497907C66F18072b232e1";
    
    // Conecta al contrato
    const contrato = await hre.ethers.getContractAt("SchoolGrades", direccionContrato);

    
    const [student] = await ethers.getSigners();


    // Llamar a un método addGrade
    // const tx = await contrato.addGrade(student.address, "Tecnología Blockchain", 9);
    // await tx.wait();

    console.log('student.address ' + student.address);
    
    // Llamar a un método addGrade
    const tx = await contrato.addGrade(student.address, "Ethereum: Clientes y transacciones", 10);
    await tx.wait();

    // Llamar a un método de solo lectura
    const grades = await contrato.viewMyGrades();
    console.log("grades :", grades);
}


//0x27193d65DE70BF07AA1Ce71Cb316cb4c3A485bca  student1

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
