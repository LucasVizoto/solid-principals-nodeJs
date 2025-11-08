
# 💪API de Academias em Fastify Aplicando Conceitos de SOLID
API com NodeJS, Fastify e SOLID Este projeto demonstra a construção de uma API em NodeJS utilizando o framework Fastify, com foco especial na aplicabilidade dos princípios SOLID no desenvolvimento de APIs REST.

Um dos maiores desafios ao construir APIs é garantir que os dados recebidos sejam válidos e sigam um formato esperado antes de chegarem à lógica de negócio. Para resolver isso, trouxemos um "Guardião de Tipos" para o nosso projeto: o Zod. Assim como um sentinela rigoroso que verifica cada entrada, esta biblioteca funciona como uma camada de validação robusta, garantindo que apenas as requisições que seguem um schema pré-definido possam ser processadas. Ele é o nosso "Guardião das Rotas", assegurando a integridade e o padrão das informações que entram na aplicação.

### Cenário do Projeto:

Para exemplificar a aplicação dos princípios SOLID com Fastify, foi desenvolvida uma API REST completa, focada em desacoplamento e manutenibilidade.

🐘 **Persistência de Dados Robusta**: Utilizado o ORM Prisma para a comunicação com o banco de dados PostgreSQL. O ambiente de banco de dados é totalmente gerenciado via Docker (utilizando a imagem Bitnami), e o Prisma gerencia as migrations, garantindo o versionamento e a consistência do schema do banco.

🏛️ **Arquitetura Desacoplada (SOLID)**: O projeto implementa o Princípio da Inversão de Dependência (D do SOLID) através de uma arquitetura de repositórios in-memory. Esta abordagem simula o comportamento do ORM durante os testes e o desenvolvimento dos use-cases, evitando o acoplamento direto com o Prisma e permitindo que a biblioteca de banco de dados seja substituída futuramente com mínimo impacto.

🛡️ **Validação e Integridade dos Dados**: A biblioteca Zod atua como uma camada de validação para os dados das rotas. Ela garante a consistência ao processar apenas requisições que sigam um padrão e auxilia na integridade e padronização da recepção de dados, conforme definido nos schemas.

🔐 **Autenticação e Autorização Segura**: Implementado um sistema de autenticação robusto via Token JWT, com o uso de Refresh Tokens para garantir a integridade e a segurança do access token principal. A comunicação dos tokens é realizada via cookies e o sistema inclui autorização baseada em Roles (cargos), onde apenas usuários administradores (ADMIN) têm acesso a rotas restritas.

🧪 **Confiabilidade e Testes Automatizados**: A robustez da aplicação é garantida por uma suíte completa de testes implementada com Vitest. Foram criados testes unitários para validar os use-cases (regras de negócio) e testes E2E (end-to-end) para validar os controllers e o fluxo completo das requisições.

🔄 **CI/CD com GitHub Actions**: O projeto inclui um pipeline de Integração Contínua (CI) configurado com GitHub Actions. Testes unitários são executados automaticamente a cada push, e os testes E2E são acionados ao mesclar uma Pull Request, garantindo a estabilidade e a qualidade do código-fonte.

### Regras de Negócio


#### RFs (Requisitos Funcionais)

- [x]  Deve ser possível se cadastrar;
- [x]  Deve ser possível se autenticar;
- [x]  Deve ser possível obter o perfil de um usuário logado;
- [x]  Deve ser possível obter o número de check-ins; realizados pelo usuário logado;
- [x]  Deve ser possível o usuário obter seu histórico de check0ins;
- [x]  Deve ser possível o usuário buscar academias próximas;
- [x]  Deve ser possível o usuário buscar academia pelo nome;
- [x]  Deve ser possível o usuário realizar check-in em uma academia;
- [x]  Deve ser possível validar o check-in de um usuário;
- [x]  Deve ser possível cadastrar uma academia;


#### RNs (Regras de Negócio)

- [x]  O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x]  O usuário não pode fazer 2 check-ins no mesmo dia;
- [x]  O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x]  O check-in só pode ser validado 20 minutos após criado;
- [x]  O check-in só pode ser validado por administradores;
- [x]  A academia só pode ser cadastrada por administradores;


#### RNFs (Requisitos Não Funcionais)

- [x]  Senha do usuário precisa estar criptografada;
- [x]  Os dados da aplicação precisam persistir em um banco relacional;
- [x]  Toda paginação deve ser realizada com 20 itens por página;
- [x]  O usuário precisa ser autenticado com JWT; 
## ⚙️ Rodando localmente

#### Clone o projeto


```
git clone https://github.com/LucasVizoto/solid-principals-nodeJs.git
```


#### 1. Gere o banco de dados em sua máquina

Para isso, é requisito mínimo que o Docker esteja devidamente instalado localmente.


```
docker compose up -d

```

#### 2. Instale as dependências

```
npm i
```


#### 4. Rode as Migrations para criação das tabelas no banco

```
npx prisma migrate dev
```

#### 5. Configure um arquivo .env seguindo os campos presentes em .env.example
Basta editar o arquivo `.env.example` e alterar seu nome para apenas `.env`.
```
NODE_ENV=
JWT_SECRET=
DATABASE_URL=
```

#### 6. Faça o build do projeto
```
npm run build
```

#### 7. Execute o projeto
```
npm run dev
```
## 📖 Documentação da API

#### 
***USUÁRIO***
####
- Faz o registro de um novo usuário
O campo `role` é opcional, se não for encmainhado, o usuário é criado com a role **MEMBER**, caso contrário, é possível identificá-lo como um **ADMIN**.

```
  POST /users
```

#### Body da Requisição:
```
{
    "name":"John Doe",
    "email": "johndoe@example.com",
    "password":'123456',
    "role"?: 'ADMIN' or 'MEMBER'
}
```

#### Status Code: 201 CREATED


---
####
- Realiza a autenticação na aplicação

```
  POST /authenticate
```

#### Body da Requisição:
```
{
    "email": "admin@gmail.com",
    "password": "1234567"
}
```
#### Resposta esperada:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURN
SU4iLCJzdWIiOiI2YTE2OGU4Yy0xYTM5LTQ4YmE
tYTFlMi05MmQzMWY1MzYzODQiLCJpYXQiOjE3NjI2MDk5O
DcsImV4cCI6MTc2MjYxMDU4N30.OEbZkMz6zTnDPBSe0K_
KTDtpjhRjclKBkATOnZ0U1Pc"
}
```



#### Status Code: 200 OK


---
####
- Acessa as informações do perfil do usuário
Para utilização dessa rota é necessário estar autenticado na aplicação, pois nesta é feita a validação do token JWT obtido na anteriormente.
```
  GET /me
```


#### Resposta esperada: 
```
{
    "user": {
        "id": "6a168e8c-1a39-48ba-a1e2-92d31f536384",
        "name": "Lucas Admin",
        "email": "admin@gmail.com",
        "role": "ADMIN",
        "created_at": "2025-11-02T23:05:53.736Z"
    }
}
```
#### Status Code: 200 OK

---
####
- Renova o Refresh Token presente no cookie
Para utilização dessa rota é necessário estar autenticado na aplicação
```
  PATCH /token/refresh
```


#### Resposta esperada: 
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURN
SU4iLCJzdWIiOiI2YTE2OGU4Yy0xYTM5LTQ4YmE
tYTFlMi05MmQzMWY1MzYzODQiLCJpYXQiOjE3NjI2MDk5O
DcsImV4cCI6MTc2MjYxMDU4N30.OEbZkMz6zTnDPBSe0K_
KTDtpjhRjclKBkATOnZ0U1Pc"
}
```

#### Status Code: 200 OK
---

#### 
***ACADEMIAS (GYMS)***
####    
- Criar uma nova academia. 
**Para a criação de uma nóva academia é necessário que a requisição seja realizada por um usuário com a role "ADMIN".**

```
  POST /gyms
```

#### Body da Requisição:
```
{
    "title": "JavaScript Gym",
    "description": "Some description about JavaScript Gym",
    "phone": "11999999999",
    "latitude": -20.5107557,
    "longitude": -47.0061818
}
```

#### Status Code: 201 CREATED

---
####
- Procura academias com base no parâmetro enviado

```
  GET /gyms/search
```
#### Query Params:
| Campo   | Tipo | Descrição|Exemplo|
| :---------- | :--------- | :---------- |:---------------------------------- |
| `query` | `string` | **Obrigatório**. Nome da Academia| 'JavaScript Gym' |
| `page` | `number` | **Opcional**. Número da página a ser visualizado| 1 |

#### Resposta esperada: 
```
{
    "gyms": [
        {
            "id": "8b2ae2f3-8737-4007-befd-a1206463bc2c",
            "title": "JavaScript Gym",
            "description": "Some description about JavaScript Gym",
            "phone": "11999999999",
            "latitude": "-20.5107557",
            "longitude": "-47.0061818"
        }
    ]
}

```
#### Status Code: 200 OK

---
####
- Procura academias próximas ao usuário (até 100m)

```
  GET /gyms/nearby
```
#### Body da Requisição:
```
{
    "latitude": -20.5107557,
    "longitude": -47.0061818
}
```

#### Resposta esperada: 
```
{
    "gyms": [
        {
            "id": "8b2ae2f3-8737-4007-befd-a1206463bc2c",
            "title": "JavaScript Gym",
            "description": "Some description about JavaScript Gym",
            "phone": "11999999999",
            "latitude": "-20.5107557",
            "longitude": "-47.0061818"
        }
    ]
}

```
#### Status Code: 200 OK

---

####
***CHECK-INS***
####
- Cria um novo check-in em uma academia

```
  POST /gyms/:gymId/check-ins
```

#### Body da Requisição:
```
{
    "latitude": -20.5107557,
    "longitude": -47.0061818
}
```


#### Path Variables:
| Campo   | Tipo | Descrição  |  Exemplo  |
| :---------- | :--------- | :---------- |:---------------------------------- |
| `gymId` | `string` | **Obrigatório**. UUID da academia cadastrada| '8b2ae2f38s73d74007'|

#### Status Code: 201 CREATED

---
####
- Lista o histórico de check-ins realizados pelo usuário

```
  GET /check-ins/history
```
#### Path Params:
| Campo   | Tipo | Descrição  |  Exemplo  |
| :---------- | :--------- | :---------- |:---------------------------------- |
| `page` | `number` | **Opcional**. Número da página a ser visualizado| 1 |

#### Resposta esperada: 
```
{
    "checkIns": [
        {
            "id": "f54a49fc-a66d-469b-84e0-841ea0c611a7",
            "created_at": "2025-11-08T14:38:18.668Z",
            "validated_at": null,
            "user_id": "6a168e8c-1a39-48ba-a1e2-92d31f536384",
            "gym_id": "8b2ae2f3-8737-4007-befd-a1206463bc2c"
        }
    ]
}

```
#### Status Code: 200 OK

---
####
- Retorna a contagem de check-ins realizados pelo usuário

```
  GET /check-ins/metrics
```

#### Resposta esperada: 
```
{
    "checkInsCount": 1
}

```
#### Status Code: 200 OK

---
####

-  Esta funcionalidade processa a validação do check-in de um usuário, aplicando as seguintes regras de negócio:

    **Limite de Tempo**: O check-in só pode ser validado com sucesso se a solicitação ocorrer em até 20 minutos após o seu momento de criação.

    **Falha por Tempo Excedido**: Se a tentativa de validação ocorrer após esse período de 20 minutos, a API rejeitará a solicitação e retornará um status code 403 FORBIDDEN.

    **Confirmação no Banco de Dados**: Em caso de sucesso (dentro da janela de tempo), o campo validated_at do check-in no banco de dados é preenchido com o timestamp exato do processamento da validação.
```
  PATCH /check-ins/:checkInId/validate
```
#### Path Variables:
| Campo   | Tipo | Descrição|Exemplo|
| :---------- | :--------- | :---------- |:---------------------------------- |
| `checkInId` | `string` | **Obrigatório**. ID do check-in realizado| 8b2ae2f38s73d74007 |

#### Status Code: 204 NO CONTENT

## ⚗️ Rodando os testes

A suíte de testes da aplicação foi construída com Vitest, permitindo a validação completa da aplicação, desde unidades de lógica de negócio até fluxos completos de API.

- ***Testes Unitários***

Os testes unitários focam em validar os use-cases (regras de negócio) de forma isolada. Eles estão localizados na pasta `src/use-cases/`

Para executá-los, utilize o comando:

```
  npm run test
```

- ***Testes End-to-End (E2E)***

Os testes E2E validam o fluxo completo da aplicação, simulando requisições HTTP e interagindo com o banco de dados.

Para garantir a integridade dos dados e evitar "poluir" o banco de desenvolvimento, foi implementada uma estratégia de banco de dados de teste isolado. Ao executar o comando E2E, um schema de banco de dados temporário é criado dinamicamente na instância do PostgreSQL (via Docker). Todos os testes rodam contra este banco isolado e, ao finalizar, o schema é completamente destruído.

Para executar os testes E2E, utilize o comando:

```
npm run test:e2e
```
####

🔄 ***Automação com GitHub Actions***

O projeto possui um pipeline de Integração Contínua (CI) configurado com GitHub Actions para garantir a qualidade do código automaticamente:

- Ao realizar `git push`: Os testes unitários são executados automaticamente.

- Ao abrir uma `Pull Request`: Os testes E2E são executados para validar a integração completa das novas alterações.
## 🔎 Onde me encontrar

<div> 
<a href="https://www.linkedin.com/in/lucasvizoto" target="_blank">
  <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank">
</a>
<a href="mailto:lucasvizoto364@gmail.com">
  <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank">
</a>
<a href="https://lucasvizoto.com">
  <img src="https://img.shields.io/badge/Website-000000?style=for-the-badge" target="_blank">
</a>
</div>

