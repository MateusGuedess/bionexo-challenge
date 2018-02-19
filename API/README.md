# Bionexo Challenge: API

## Instalação
```bash
    npm run install
```

## Rotas
| Método HTTP | Rota | Descrição |
| ----------- | ---- | --------- |
| **POST** | /v1/ubs/sync | Upload de arquivo CSV com informações das UBS's. |
| **GET** | /v1/ubs | Permite a listagem de UBS's registradas. |
| **GET** | /v1/ubs/<id> | Permite a exibição de informações de uma única UBS. |

## Executando
Por padrão a aplicação irá rodar na porta 3000, mas caso queria alterar basta acessar o arquivo
server.js e alterar o valor na variavel PORT.
Também é necessário gerar um arquivo similar ao [.env.default](/API/.env.default) porém chamado .env com as informações de conexão com
o banco de dados.
```bash
    npm run build
    npm run test
```