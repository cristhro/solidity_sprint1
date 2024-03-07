const hre = require("hardhat");

async function main() {
    // Dirección del contrato desplegado
    const direccionContrato = "0x97571d5B8A198c6AFAC497907C66F18072b232e1";
    
    // Conecta al contrato
    const contrato = await hre.ethers.getContractAt("SchoolGrades", direccionContrato);

    // Llamar a un método de solo lectura todas las notas de un estudiante especifico
    // const grades = await contrato.viewStudentGrades('0x27193d65DE70BF07AA1Ce71Cb316cb4c3A485bca');
    // console.log("Grades for 0x27193d65DE70BF07AA1Ce71Cb316cb4c3A485bca \n:", grades);

    // const grades = await contrato.viewStudentGrades('0xEDee67926Ff5cB756D50C5A6bECAe8945279003c');
    // console.log("Grades for 0xEDee67926Ff5cB756D50C5A6bECAe8945279003c \n:", grades);

    // Llamar a un método de solo lectura
    const grades = await contrato.viewStudentGrades('0x8Ed6e5a15d3DF9eB8f767B6557B0c815bE04d6cD');
    console.log("Grades for 0x8Ed6e5a15d3DF9eB8f767B6557B0c815bE04d6cD \n:", grades);
}

//0x27193d65DE70BF07AA1Ce71Cb316cb4c3A485bca  teacher
//0x8Ed6e5a15d3DF9eB8f767B6557B0c815bE04d6cD student2
//0x46b05e5Cc3091553297BfDC143FD035bC04c5de4 principal
//0xEDee67926Ff5cB756D50C5A6bECAe8945279003c student1
// 0x9AecC2114B79b3d92e284D62fb1bBB06735110b7 student3
 
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
