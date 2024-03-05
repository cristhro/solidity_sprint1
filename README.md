## Descripción de los casos de uso
### Casos de uso para estudiante:

- Ver mis notas: El estudiante puede ver sus notas en el contrato SchoolGrades.
- Solicitar diploma: El estudiante puede solicitar un diploma al contrato Diploma.
- Verifica elegibilidad: El contrato Diploma verifica con el contrato SchoolGrades si el estudiante es elegible para obtener un título.
- Otorga diploma: Si el estudiante es elegible, el contrato Diploma le otorga un título.
- Mostrar diploma: El estudiante puede ver su diploma en el contrato Diploma.

### Casos de uso para escuela/universidad:

- Agregar notas: La escuela puede agregar notas al contrato SchoolGrades.

### Casos de uso para gestor de diplomas:

- Verifica elegibilidad: El contrato Diploma verifica con el contrato SchoolGrades si el estudiante es elegible para obtener un título.
- Otorga diploma: Si el estudiante es elegible, el contrato Diploma le otorga un título.

```sh
npx hardhat clean
npx hardhat compile
npx hardhat run ./scripts/deploySchoolCertificate.ts --network ethereum_sepolia_testnet
```

```sh
Contract SchoolCertificate deployed to: 0x7cAC1d2Ff482Cf98804B3355Ea4A65f74aA4eDC2
```

#### Validar School Certificate
```sh
Hardhat % npx hardhat verify --network ethereum_sepolia_testnet 0x7cAC1d2Ff482Cf98804B3355Ea4A65f74aA4eDC2
```

```sh
Successfully submitted source code for contract
contracts/SchoolCertificate.sol:SchoolCertificate at 0x7cAC1d2Ff482Cf98804B3355Ea4A65f74aA4eDC2
for verification on the block explorer. Waiting for verification result...

Successfully verified contract SchoolCertificate on Etherscan.
https://sepolia.etherscan.io/address/0x7cAC1d2Ff482Cf98804B3355Ea4A65f74aA4eDC2#code
```


