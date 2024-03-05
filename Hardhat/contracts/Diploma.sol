pragma solidity ^0.8.0;

import "./SchoolGrades.sol";

contract Diploma {

    // Estructura para almacenar la información de un título
    struct DiplomaInfo {
        string studentName;
        string degree;
        uint year;
        address schoolAddress;
    }

    // Mapping de los diplomas por la dirección del estudiante
    mapping(address => DiplomaInfo) public diplomas;

    // Función para que la escuela otorgue un título a un estudiante
    function grantDiploma(
        address _student,
        string memory _studentName,
        string memory _degree,
        uint _year
    ) public onlySchool(_student) {
        diplomas[_student] = DiplomaInfo(_studentName, _degree, _year, msg.sender);
    }

    // Función para que un estudiante vea su diploma
    function viewDiploma() public view returns (DiplomaInfo memory) {
        return diplomas[msg.sender];
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