graph LR
A(Estudiante)

A --> B(Ver mis notas)
A --> C(Solicitar diploma)

B(Ver mis notas)
B --> D(SchoolGrades)
D --> B(Mostrar notas)

C(Solicitar diploma)
C --> E(Diploma)
E --> F(Verifica elegibilidad)
F --> E(Otorga diploma)
E --> C(Mostrar diploma)

D(SchoolGrades)

E(Diploma)


