pragma solidity ^0.8.0;

import "./SchoolGrades.sol";

contract SchoolCertificate {

    // Estructura para almacenar la información de un título
    struct CertificateInfo {
        string studentName;
        string degree;
        uint year;
        address schoolAddress;
    }

    // Mapping de los certificados por la dirección del estudiante
    mapping(address => CertificateInfo) public certificate;

    // Función para que la escuela otorgue un título a un estudiante
    function grantCertificate(
        address _student,
        string memory _studentName,
        string memory _degree,
        uint _year
    ) public onlySchool(_student) {
        certificate[_student] = CertificateInfo(_studentName, _degree, _year, msg.sender);
    }

    // Función para que un estudiante vea su diploma
    function viewCertificate() public view returns (CertificateInfo memory) {
        return certificate[msg.sender];
    }

    // Modificador para restringir la función a la escuela del estudiante
    modifier onlySchool(address _student) {
        SchoolGrades school = SchoolGrades(_student);
        require(
            school.teacher() == msg.sender,
            "Only the student's school can grant a diploma."
        );
        _;
    }
}