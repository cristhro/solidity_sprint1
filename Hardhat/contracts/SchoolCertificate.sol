// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract SchoolCertificate {

    // Estructura para almacenar la información de un título
    struct CertificateInfo {
        string studentName;
        string degree;
        uint year;
        bool paid;
    }
    
    mapping(address => CertificateInfo) public certificates;
    uint public certificatePrice = 0.02 ether; // Precio del certificado
    address payable public director;
    
    // Constructor para establecer el dueño del contrato como el maestro
    constructor() {
        director = payable(msg.sender);
    }

    // Modificador para restringir la función a la escuela del estudiante
    modifier onlyDirector(address _student) {
        require(
            director == msg.sender,
            "Solo el director de la escuela puede crear certificados"
        );
        _;
    }

    // Función para que un estudiante solicite un certificado
    function requestCertificate(string memory _studentName, string memory _degree, uint _year) public {
        // Almacena la solicitud en el mapping
        certificates[msg.sender] = CertificateInfo(_studentName, _degree, _year, false);
    }

    // Función para que un estudiante pague un certificado
    function payCertificate() public payable {
        require(msg.value == certificatePrice, "Debe enviar el precio correcto del certificado");
        require(certificates[msg.sender].paid == false, "El certificado ya ha sido pagado");

        // Marca el certificado como pagado
        certificates[msg.sender].paid = true;
    }

    // Función para que la escuela otorgue un título a un estudiante
    function grantCertificate(address _student) public {
        require(msg.sender == director, "Solo el director puede otorgar certificados");
        require(certificates[_student].paid == true, "El estudiante debe pagar el certificado antes de que se le otorgue");

        // Transfiere el pago del certificado a la cuenta del director
        director.transfer(certificatePrice);
    }

    // Función para que un estudiante vea su diploma
    function viewCertificate() public view returns (CertificateInfo memory) {
        return certificates[msg.sender];
    }
}