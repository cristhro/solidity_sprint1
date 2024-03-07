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

    //console.log('student.address ' + student.address);
    
    // Llamar a un método addGrade
    // const tx = await contrato.addGrade(student.address, "Ethereum: Clientes y transacciones", 10);
    // await tx.wait();

    //student 1
    // const tx = await contrato.addGrade('0xEDee67926Ff5cB756D50C5A6bECAe8945279003c', "Ethereum: Clientes y transacciones", 7);
    // await tx.wait();

    // const tx = await contrato.addGrade('0xEDee67926Ff5cB756D50C5A6bECAe8945279003c', "Tecnología Blockchain", 10);
    // await tx.wait();

    // const tx = await contrato.addGrade('0xEDee67926Ff5cB756D50C5A6bECAe8945279003c', "Ecosistema Blockchain", 8);
    // await tx.wait();

    // Llamar a un método de solo lectura
    // const grades = await contrato.viewStudentGrades('0xEDee67926Ff5cB756D50C5A6bECAe8945279003c');
    // console.log("Grades for 0xEDee67926Ff5cB756D50C5A6bECAe8945279003c \n:", grades);

    //student 2
    // const tx = await contrato.addGrade('0x8Ed6e5a15d3DF9eB8f767B6557B0c815bE04d6cD', "Ethereum: Clientes y transacciones", 6);
    // await tx.wait();

    // const tx = await contrato.addGrade('0x8Ed6e5a15d3DF9eB8f767B6557B0c815bE04d6cD', "Tecnología Blockchain", 6);
    // await tx.wait();

    // const tx = await contrato.addGrade('0x8Ed6e5a15d3DF9eB8f767B6557B0c815bE04d6cD', "Ecosistema Blockchain", 9);
    // await tx.wait();

    // Llamar a un método de solo lectura
    // const grades = await contrato.viewStudentGrades('0x8Ed6e5a15d3DF9eB8f767B6557B0c815bE04d6cD');
    // console.log("Grades for 0x8Ed6e5a15d3DF9eB8f767B6557B0c815bE04d6cD \n:", grades);

    //student3
    //0x9AecC2114B79b3d92e284D62fb1bBB06735110b7

    // const tx = await contrato.addGrade('0x9AecC2114B79b3d92e284D62fb1bBB06735110b7', "Ethereum: Clientes y transacciones", 8);
    // await tx.wait();

    // const tx = await contrato.addGrade('0x9AecC2114B79b3d92e284D62fb1bBB06735110b7', "Tecnología Blockchain", 7);
    // await tx.wait();

    // const tx = await contrato.addGrade('0x9AecC2114B79b3d92e284D62fb1bBB06735110b7', "Ecosistema Blockchain", 10);
    // await tx.wait();

    //Llamar a un método de solo lectura
    const grades = await contrato.viewStudentGrades('0x9AecC2114B79b3d92e284D62fb1bBB06735110b7');
    console.log("Grades for 0x9AecC2114B79b3d92e284D62fb1bBB06735110b7 \n:", grades);



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
