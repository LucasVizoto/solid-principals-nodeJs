# App

Gympass style app.

## RFs (Requisitos Funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins; realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check0ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academia pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;


## RNs (Regras de Negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;


## RNFs (Requisitos Não Funcionais)

- [ ] Senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam persistir em um banco relacional;
- [ ] Toda paginação deve ser realizada com 20 itens por página;
- [ ] O usuário precisa ser autenticado com JWT; 