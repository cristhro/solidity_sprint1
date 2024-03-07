# IEBS
Sprint 1 - Programación de un primer Smart Contract
- Grupo: 15
- Cristhian Rodriguez Gomez
- Jesus Rosas Rosales

## Introducción 
En esta practica usaremos el Smart contract SchoolGrades para gestionar las notas de los estudiantes  creadas por el profesor (teacher), donde los estudiantes solo podran ver sus notas, y el profesor podra crear y ver las notas de los estudiantes.
Por otro lado con el contrato SchoolCertificate un estudiante podra solicitar su titulo (certificate), pagarlo (0.02 eth cuesta el titulo) y el director una vez esta pagado el titulo podra firmarlo (validando antes que las todas las notas son > 5).


## Configuración del entorno
- Requisitos:
  - Tener node instalado: https://nodejs.org/en/download
  - Instalar los paquetes de node una vez estas dentro del proyecto: usar el comando npm install

#### .env:
```sh
SIGNER_DIRECTOR_PRIVATE_KEY = ''
SIGNER_STUDENT_PRIVATE_KEY = ''
SIGNER_TEACHER_PRIVATE_KEY = ''
SCHOOL_GRADES_CONTRACT_ADDRESS = 0x34d1bF50ed85513e47995Cde2D55D1b5C2481839 ('TOBE CONFIGURED AFTER run script school-grades:deploy')
SCHOOL_CERTIFICATE_CONTRACT_ADDRESS = 0x50cB8A98c6a468adCF4A7e6CCe28e8DebA34D3F3 ('TOBE CONFIGURED AFTER run script school-certificate:deploy')
STUDENT_ADDRESS = 0x664f16E7dC4F28fF1748aD70E3cf228F7D6E66FB

ETH_SEPOLIA_TESTNET_RPC = https://ethereum-sepolia.blockpi.network/v1/rpc/public
ETH_SCAN_API_KEY = ''
ETH_SEPOLIA_SCAN_WEB = https://sepolia.etherscan.io/

```
#### hardhat.config.ts:
Aqui hemos configurado una red para cada cuenta de cada usuario (student, director, teacher)
```sh
  networks: {
    ethereum_sepolia_testnet_as_student: {
      url: ETH_SEPOLIA_TESTNET_RPC,
      chainId: chainIds.eth_sepolia_id,
      accounts: SIGNER_STUDENT_PRIVATE_KEY !== undefined ? [SIGNER_STUDENT_PRIVATE_KEY] : []
    },
    ethereum_sepolia_testnet_as_director: {
      url: ETH_SEPOLIA_TESTNET_RPC,
      chainId: chainIds.eth_sepolia_id,
      accounts: SIGNER_DIRECTOR_PRIVATE_KEY !== undefined ? [SIGNER_DIRECTOR_PRIVATE_KEY] : []
    },
    ethereum_sepolia_testnet_as_teacher: {
      url: ETH_SEPOLIA_TESTNET_RPC,
      chainId: chainIds.eth_sepolia_id,
      accounts: SIGNER_TEACHER_PRIVATE_KEY !== undefined ? [SIGNER_TEACHER_PRIVATE_KEY] : []
    },
  },
```

#### packages.json:
Pre configuración antes ejecutar los scripts tests, el order para ejecutar es importante (Ya que SchoolCertificate depende de SchoolGrades ): 
1. Primero hacemos deploy de school-grades:deploy 
  - Resultado: [dirección del contrato School Grades](https://sepolia.etherscan.io/address/0x34d1bF50ed85513e47995Cde2D55D1b5C2481839)
  ```sh
    npm run school-grades:deploy
  ```

2. Verificamos el contrato School Grades
  - Resultado: [dirección del contrato School Grades- verificado](https://sepolia.etherscan.io/address/0x34d1bF50ed85513e47995Cde2D55D1b5C2481839#code)
  ```sh
    npm run school-grades:verify 0x34d1bF50ed85513e47995Cde2D55D1b5C2481839
    -> Successfully verified contract SchoolGrades on Etherscan.
  ```

3. Configuramos la variable de entorno en .env
  ```sh
    SCHOOL_GRADES_CONTRACT_ADDRESS=0x34d1bF50ed85513e47995Cde2D55D1b5C2481839
  ```
4. Hacer deploy de school-certificate:deploy (require la variable de entorno SCHOOL_GRADES_CONTRACT_ADDRESS ya que lo usa en el constructor del contrato)
  - Requisito: tener la variable SCHOOL_GRADES_CONTRACT_ADDRESS configurada en .env
  - Resultado: [dirección del contrato School Certificate ](https://sepolia.etherscan.io/address/0x34d1bF50ed85513e47995Cde2D55D1b5C2481839)
  ```sh
     npm run school-certificate:deploy
  ```
5. Verificamos el contrato School Certificate
  - Resultado: [dirección del contrato School Certificate - verificado](https://sepolia.etherscan.io/address/0x34d1bF50ed85513e47995Cde2D55D1b5C2481839#code)
  ```sh
     npm run school-certificate:verify 0x50cB8A98c6a468adCF4A7e6CCe28e8DebA34D3F3 "0x34d1bF50ed85513e47995Cde2D55D1b5C2481839"
    -> Successfully submitted source code for contract
  ```
6. Configuramos la variable de entorno en .env
  ```sh
    SCHOOL_CERTIFICATE_CONTRACT_ADDRESS=0x50cB8A98c6a468adCF4A7e6CCe28e8DebA34D3F3
  ```

Con esto configurado ya se pueden ejecutar los scripts de test ✅

Aqui tenemos todos los scripts que estan configurados en packages.json
  ```sh
    "scripts": {
        "compile": "hardhat compile",
        "school-grades:deploy": "hardhat run scripts/schoolGrades/deploy.ts --network ethereum_sepolia_testnet_as_teacher  ",
        "school-grades:verify": "hardhat verify  --network ethereum_sepolia_testnet_as_teacher ",
        "school-grades:test1": "hardhat run scripts/schoolGrades/test1_teacher_add_grades_to_student.ts --network ethereum_sepolia_testnet_as_teacher",
        "school-grades:test2": "hardhat run scripts/schoolGrades/test2_teacher_view_grades.ts --network ethereum_sepolia_testnet_as_teacher",
        "school-grades:test3": "hardhat run scripts/schoolGrades/test3_student_view_my_grades.ts --network ethereum_sepolia_testnet_as_student",
        "school-certificate:deploy": "hardhat run scripts/schoolCertificate/deploy.ts --network ethereum_sepolia_testnet_as_director  ",
        "school-certificate:verify": "hardhat verify  --network ethereum_sepolia_testnet_as_director ",
        "school-certificate:test1": "hardhat run scripts/schoolCertificate/test1_student_request_certificate.ts --network ethereum_sepolia_testnet_as_student",
        "school-certificate:test2": "hardhat run scripts/schoolCertificate/test2_student_pay_certificate.ts --network ethereum_sepolia_testnet_as_student",
        "school-certificate:test3": "hardhat run scripts/schoolCertificate/test3_student_view_certificate.ts --network ethereum_sepolia_testnet_as_student",
        "school-certificate:test4": "hardhat run scripts/schoolCertificate/test4_director_grant_certificate.ts --network ethereum_sepolia_testnet_as_director",
        "school-certificate:test5": "hardhat run scripts/schoolCertificate/test5_student_view_certificate.ts --network ethereum_sepolia_testnet_as_student"
    -
  ```


## Descripción de los casos de uso y los tests aplicados


  ### Agregar notas: 
  El profesor puede agregar notas al contrato SchoolGrades (en este caso agregamos 3 notas) [school-grades:test1].
  
  - Requisitos: Configurar la variable de entorno SCHOOL_GRADES_CONTRACT_ADDRESS, STUDENT_ADDRESS
  ```sh
      npm run school-grades:test1
      > hardhat run scripts/schoolGrades/test1_teacher_add_grades_to_student.ts --network ethereum_sepolia_testnet_as_teacher
      > tx1 [Ethereum: Clientes y transacciones = 7] Grades for 0x664f16E7dC4F28fF1748aD70E3cf228F7D6E66FB
      > tx2 [Tecnología Blockchain = 10] Grades for 0x664f16E7dC4F28fF1748aD70E3cf228F7D6E66FB  
      > tx3 [Ecosistema Blockchain = 8] Grades for 0x664f16E7dC4F28fF1748aD70E3cf228F7D6E66FB  
  ```
  - Resultado: 
    - tx1: https://sepolia.etherscan.io/tx/0x907de3f6af5324ce8e977e09bd9e9dc95632c4af7779ddfaf1baae75583ff5ff
    - tx2: https://sepolia.etherscan.io/tx/0xb5e5d3a45e4b2761d7797b88d6700159d1a205b1472e12e53c1540399a0f26b1
    - tx3: https://sepolia.etherscan.io/tx/0xb6643e07da904ffbf0008f6b3eb451bd31bfe07790e88e6fa1729bfe360ad1e2
      
  ### Ver notas: 
  El profesor puede ver las notas de un alumno. [school-grades:test2]
  
  - Requisitos: Tener configurado la variable de entorno SCHOOL_GRADES_CONTRACT_ADDRESS, STUDENT_ADDRESS en .env
  ```sh
    npm run school-grades:test2
    > hardhat run scripts/schoolGrades/test2_student_view_grades.ts --network ethereum_sepolia_testnet_as_teacher

    > Grades for 0x664f16E7dC4F28fF1748aD70E3cf228F7D6E66FB  
       [
        [
          'Ethereum: Clientes y transacciones',
          BigNumber { value: "7" },
          subjectName: 'Ethereum: Clientes y transacciones',
          grade: BigNumber { value: "7" }
        ],
        [
          'Tecnología Blockchain',
          BigNumber { value: "10" },
          subjectName: 'Tecnología Blockchain',
          grade: BigNumber { value: "10" }
        ],
        [
          'Ecosistema Blockchain',
          BigNumber { value: "8" },
          subjectName: 'Ecosistema Blockchain',
          grade: BigNumber { value: "8" }
        ]
      ]
  ```


  ### Ver mis notas: 
  El estudiante puede ver sus notas. [school-grades:test3]
  
  - Requisitos: Tener configurado la variable de entorno SCHOOL_GRADES_CONTRACT_ADDRESS en .env
    ```sh
      npm run school-grades:test3   
      > hardhat run scripts/schoolGrades/test3_student_view_my_grades.ts --network ethereum_sepolia_testnet_as_student
      > My Grades for 0x664f16E7dC4F28fF1748aD70E3cf228F7D6E66FB  
     [
      [
        'Ethereum: Clientes y transacciones',
        BigNumber { value: "7" },
        subjectName: 'Ethereum: Clientes y transacciones',
        grade: BigNumber { value: "7" }
      ],
      [
        'Tecnología Blockchain',
        BigNumber { value: "10" },
        subjectName: 'Tecnología Blockchain',
        grade: BigNumber { value: "10" }
      ],
      [
        'Ecosistema Blockchain',
        BigNumber { value: "8" },
        subjectName: 'Ecosistema Blockchain',
        grade: BigNumber { value: "8" }
      ]
    ]
    ```

    
  ### Solicitar certificado: 
  El estudiante puede solicitar un certificado al contrato SchoolCertificate. [school-certificate:test1]
  
  - Requisitos: Tener configurado la variable de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS en .env
    ```sh
      npm run school-certificate:test1 
      > hardhat run scripts/schoolCertificate/test1_student_request_certificate.ts --network ethereum_sepolia_testnet_as_student
      > certificate : [
          'Juan',
          'Tecnología Blockchain',
          BigNumber { value: "2023" },
          false,
          false,
          studentName: 'Juan',
          degree: 'Tecnología Blockchain',
          year: BigNumber { value: "2023" },
          paid: false,
          granted: false
        ]
    ```
  - Resultado: https://sepolia.etherscan.io/tx/0x36d7435016bafea5b7319c73150ae77c307a9321a332b0cd4b000958450fb7b8

  
  ### Pagar certificado: 
  El estudiante paga 0.02 ethers para obtener su certificado [school-certificate:test2].
  Si la cantidad coincide con el costo del certificado, paid se modifica a true.
  
   - Requisitos: Tener configurado la variable de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS en .env
   - Resultado: https://sepolia.etherscan.io/tx/0x548d2f959fa484f6e68c604ed566d26f8d6891e18ffef9c4f6b55bed30cc8e42
     ```sh
        npm run school-certificate:test2
        > hardhat run scripts/schoolCertificate/test2_student_pay_certificate.ts --network ethereum_sepolia_testnet_as_student
        > certificate : [
            'Juan',
            'Tecnología Blockchain',
            BigNumber { value: "2023" },
            true,
            false,
            studentName: 'Juan',
            degree: 'Tecnología Blockchain',
            year: BigNumber { value: "2023" },
            paid: true, <-- ESTO CAMBIA 
            granted: false
          ]
      ```
  ### Ver solicitud: 
  Como estudiante puedo consultar si mi solicitud ha sido aprobada (granted). [school-certificate:test3].
  - Requisitos: Tener configurado la variable de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS en .env
     ```sh
        npm run school-certificate:test3
        > hardhat run scripts/schoolCertificate/test3_student_view_certificate.ts --network ethereum_sepolia_testnet_as_student
        > certificate : [
            'Juan',
            'Tecnología Blockchain',
            BigNumber { value: "2023" },
            true,
            false,
            studentName: 'Juan',
            degree: 'Tecnología Blockchain',
            year: BigNumber { value: "2023" },
            paid: true,
            granted: false
          ]
    ```
  ### Firmar certificado: 
  #### El director firmara el certificado, haciendo una comprobación de las notas del alumno
  Depende de el contrato School Grades para validar que las asignaturas han sido aprobadas (>5)
  Devuelve un error "El estudiante debe haber pasado todas sus materias" si no se cumple esta funcion hasPassedAllSubjects
  
  - Requisitos: Tener configurado las variables de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS y STUDENT_ADDRESS en .env
    
  ```sh
      npm run school-certificate:test4
      > hardhat run scripts/schoolCertificate/test4_director_grant_certificate.ts --network ethereum_sepolia_testnet_as_director
      certificate : [
        'Juan',
        'Tecnología Blockchain',
        BigNumber { value: "2023" },
        true,
        false,
        studentName: 'Juan',
        degree: 'Tecnología Blockchain',
        year: BigNumber { value: "2023" },
        paid: true,
        granted: true <--- ESTO CAMBIA
      ]
    ]
  ```
   - Resultado: https://sepolia.etherscan.io/tx/0x741bbfca7b86c5b5ad27d8b2fc1e538ce79d02044dd8d8ab3f21a9347a358ed0
