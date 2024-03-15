# Digital Wallet

Digital Wallet é uma API com as principais funcionalidades de uma aplicação financeira.

## Sobre a aplicação

- A aplicação foi construída utilizando NodeJS, Typescript com o framework Express.
- O ORM escolhido foi o [TypeORM](https://typeorm.io/).
- O banco é o [PostgreSQL](https://www.postgresql.org/)
- Migrations foram utilizadas.
- As rotas são protegidas no padrão [Bearer Authentication](https://swagger.io/docs/specification/authentication/bearer-authentication).

## Requisitos

Uma pessoa deseja se cadastrar em sua aplicação para usufruir dos serviços financeiros oferecidos:
- Pessoa pode ter várias contas.
- Conta pode ter vários cartões.
- Cartão pode ser do tipo físico ou virtual, onde é possível ter apenas um físico e vários virtuais por conta.
- Conta possui diversas transações de crédito e débito.

## Funcionalidades

- Criar uma pessoa: o documento deve ser único por pessoa, deve ser um CPF ou um CNPJ válidos.
- Adicionar e listar contas de uma pessoa.
- Adicionar e listar cartões de uma conta.
- Listar cartões de uma pessoa.
- Realizar transações em uma conta, validando o saldo (não é permitido saldo negativo).
- Listar transações em uma conta com filtros.
- Consultar o saldo de uma conta.


## Variáveis de Ambiente

Para usar a aplicação, você precisará configurar as variáveis ​​de ambiente.
Renomeie o arquivo raiz do projeto `.env.example` para `.env`. Este arquivo contém todas as variáveis ​​necessárias para iniciar o aplicativo.

⚠️ **Importante**
Você deve substituir as informações do arquivo pelas credenciais do seu banco de dados.


## Instalação

```bash
$ npm install
```

## Rodando o app

```bash
# development
$ npm run dev

# production mode
$ npm start
```

## Banco de Dados

O aplicativo usa o banco de dados PostgreSQL. Certifique-se de tê-lo instalado em seu computador ou crie um contêiner Docker. A aplicação possui os scripts necessários para criar ou excluir o banco de dados.

_**Ao iniciar a aplicação, o banco de dados será criado automaticamente.**_

Scripts:
- `npm run db:create` para criar seu banco de dados.
- `npm run db:drop` para excluir o banco de dados.
- `npm run migração:run` para executar as migrações.


# Endpoints

### Paginação
Todo endpoint de listagem de uma entidade é paginado, seguindo este padrão via query string:
- **itemsPerPage:** Quantidade de itens que devem ser retornados por página.
- **currentPage:** Página que deve ser paginada.

Quando a paginação não for informada, a aplicação considera os seguintes valores como padrão:

	- itemsPerPage: 10
	- currentPage: 1
	
Sempre será retornado uma propriedade com as seguintes informações da paginação:

- totalCount: Total de itens que satisfazem a busca.
- itemsPerPage: Quantidade de itens que devem ser retornados por página.
- currentPage: Página atual.
- pageCount: Total de páginas de acordo com a busca.

Exemplo:
**GET /entity?itemsPerPage=10&currentPage=1**

Response:
 ```
 {
	 "entities": [
		 {
			 "id": "74a85245-bf7b-43f9-b4f8-88c6f8c47dce",
			 "name": "ab",
		 },
		 {
			 "id": "74a85245-bf7b-43f9-b4f8-88c6f8c47dce",
			 "name": "cd",
		 },
	 ],
	 "pagination": {
		 "totalCount": 4,
		 "itemsPerPage": 2,
		 "currentPage": 1,
		 "pageCount": 2,
	 }
 }
 ```
 
## Rotas desprotegidas

### POST /people

 Objetivo: Realizar a criação de uma pessoa.

 - O documento deve ser único por pessoa, deve ser um CPF ou um CNPJ válidos.
 
 Request:
 ```json
 {
	 "name": "Carolina Rosa Marina Barros",
	 "document": "569.679.155-76",
	 "password": "senhaforte"
 }
 ```
 
 Response:
 ```json
 {
	 "id": "4ca3`-08-01T14:30:41.203653"
 }
 ```
 
 ### POST /login
 
 Objetivo: Realizar o login de uma pessoa.

 - O token é retornado no padrão Bearer.
 - O token expira em 10 minutos.
 
 Request:
 ```json
 {
	 "document": "56967915576",
	 "password": "senhaforte"
 }
 ```
 Response:
 ```json
 {
	 "token": "Bearer "
 }
 ```
 
## Rotas protegidas

 ### ⚠️ Atenção
 De agora em diante, as ações devem ser realizadas na pessoa/conta(s) da pessoa autenticada.
O token retornado do login deve ser enviado no header com o nome de `Authorization`.

 Exemplo:
 ```
 Authorization: Bearer {TOKEN_AQUI}
 ```
 
 ### POST /accounts
 
 Objetivo: Realizar a criação de uma conta para uma pessoa.

 - A agência, propriedade `branch`, deve possuir exatos 3 dígitos.
 - O número da conta deve ser único no sistema.
 
 Request:
 ```json
 {
	 "branch": "001",
	 "account": "20333925",
 }
 ```
 Response:
 ```json
 {
	 "id": "b0a0ec35-6161-4ebf-bb4f-7cf73cf6448f",
	 "branch": "001",
	 "account": "2033392-5",
	 "createdAt": "2022-08-01T14:30:41.203653",
	 "updatedAt": "2022-08-01T14:30:41.203653"
 }
 ```
 
 ### GET /accounts
 
 Objetivo: Realizar a listagem de todas as contas da pessoa.
 
 Response:
 ```json
 {
	 "cards": [
		 {
			 "id": "48bb7773-8ccc-4686-83f9-79581a5e5cd8",
			 "branch": "001",
			 "account": "2033392-5",
			 "createdAt": "2022-08-01T14:30:41.203653",
			 "updatedAt": "2022-08-01T14:30:41.203653"
		 }
	 ]
 }
 ```
 
 ### POST /accounts/:accountId/cards
 
 Objetivo: Realizar a criação de um cartão em uma conta.

 - Tipo do cartão: Um cartão pode ser do tipo `physical` ou `virtual`.
 - Uma conta pode ter vários cartões, porém é permitido somente um cartão físico por conta. Virtuais são ilimitados.
 - No campo `number`, o número completo do cartão deve ser informado na criação.
 - O cvv deve conter exatos 3 dígitos.

 
 Request:
 ```json
 {
	 "type": "virtual",
	 "number": "5179 7447 8594 6978",
	 "cvv": "512"
 }
 ```
 Response:
 ```json
 {
	 "id": "b0a0ec35-6161-4ebf-bb4f-7cf73cf6448f",
	 "type": "virtual",
	 "number": "6978",
	 "cvv": "512",
	 "createdAt": "2022-08-01T14:30:41.203653",
	 "updatedAt": "2022-08-01T14:30:41.203653"
 }
 ```
 
 ### GET /accounts/:accountId/cards
 Objetivo: Realizar a listagem de todos os cartões de uma conta.
 
 Response:
 ```json
 {
	 "cards": [
		 {
			 "id": "05a0ab2d-5ece-45b6-b7d3-f3ecce2713d5",
			 "type": "physical",
			 "number": "5978",
			 "cvv": "231",
			 "createdAt": "2022-08-01T14:30:41.203653",
			 "updatedAt": "2022-08-01T14:30:41.203653"
		 },
		 {
			 "id": "b0a0ec35-6161-4ebf-bb4f-7cf73cf6448f",
			 "type": "virtual",
			 "number": "1325",
			 "cvv": "512",
			 "createdAt": "2022-08-01T14:30:41.203653",
			 "updatedAt": "2022-08-01T14:30:41.203653"
		 }
	 ]
 }
 ```
 
 ### GET /accounts/cards
 
 Objetivo: Realizar a listagem de todos os cartões de uma pessoa.

 
 Response:
 ```json
 {
	 "cards": [
		 {
			 "id": "05a0ab2d-5ece-45b6-b7d3-f3ecce2713d5",
			 "type": "physical",
			 "number": "0423",
			 "cvv": "231",
			 "createdAt": "2022-08-01T14:30:41.203653",
			 "updatedAt": "2022-08-01T14:30:41.203653"
		 },
		 {
			 "id": "b0a0ec35-6161-4ebf-bb4f-7cf73cf6448f",
			 "type": "virtual",
			 "number": "6978",
			 "cvv": "512",
			 "createdAt": "2022-08-01T14:30:41.203653",
			 "updatedAt": "2022-08-01T14:30:41.203653"
		 }
	 ]
 }
 ```
 
 ### POST /accounts/:accountId/transactions
 
 Objetivo: Realizar a criação de uma transação em uma conta. Uma transação pode ser de débito ou crédito.

 - Caso a operação seja de débito, o saldo é validado. Não é permitido saldo negativo.
 - Os tipos de transação aceitos são: `credit` e `debit`.
 

 Request:
 ```json
 {
	 "value": 100.00,
	 "description": "Pizzaria São Tomé",
	 "type": "credit"
 }
 ```
 Response:
 ```json
 {
	 "id": "05a0ab2d-5ece-45b6-b7d3-f3ecce2713d5",
	 "value": 100.00,
	 "description": "Calça Jeans",
	 "createdAt": "2022-08-01T14:30:41.203653",
	 "updatedAt": "2022-08-01T14:30:41.203653"
 }
 ```
 
 ### GET /accounts/:accountId/transactions
 Objetivo: Listagem de todas as transações de uma conta, com filtros opcionais via query string.
 Filtros que devem ser aplicados:
 - type: credit ou debit
 - search: Busca por descrição da transação.
 
 Response:
 ```json
 {
	 "transactions": [
		 {
			 "id": "05a0ab2d-5ece-45b6-b7d3-f3ecce2713d5",
			 "value": 100.00,
			 "description": "Pagamento João",
			 "createdAt": "2022-08-01T14:30:41.203653",
			 "updatedAt": "2022-08-01T14:30:41.203653"
		 }
	 ]
 }
 ```
 
 ### GET /accounts/:accountId/balance
 Objetivo: Retorna o saldo de uma conta.
 
 Response:
 ```json
 {
	 "balance": 100.00
 }
 ```
 
 
</br>

 
 ---

Projeto desenvolvido por [Thais R Kotovicz](https://www.linkedin.com/in/thaiskotovicz/).
</br>
