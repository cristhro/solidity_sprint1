// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract SchoolCertificate {

    // Estructura para almacenar la información de un título
    struct CertificateInfo {
        string studentName;
        string degree;
        uint year;
        address schoolAddress;
    }
    
    // Dirección del dueño del contrato, el director de la escuela
    address public director;

    // Mapping de los certificados por la dirección del estudiante
    mapping(address => CertificateInfo) public certificate;


    // Constructor para establecer el dueño del contrato como el maestro
    constructor() {
        director = msg.sender;
    }

    // Modificador para restringir la función a la escuela del estudiante
    modifier onlyDirector(address _student) {
        require(
            director == msg.sender,
            "Solo el director de la escuela puede crear certificados"
        );
        _;
    }

    // Función para que la escuela otorgue un título a un estudiante
    function grantCertificate( address _student, string memory _studentName, string memory _degree, uint _year ) public onlyDirector(_student) {
        certificate[_student] = CertificateInfo(_studentName, _degree, _year, msg.sender);
    }

    // Función para que el director modifique el nombre de un estudiante
    function modifyStudentName(address _student, string memory _newName) public onlyDirector(_student) {
        CertificateInfo storage certInfo = certificate[_student];
        certInfo.studentName = _newName;
    }

    // Función para que un estudiante vea su diploma
    function viewCertificate() public view returns (CertificateInfo memory) {
        return certificate[msg.sender];
    }

 
}