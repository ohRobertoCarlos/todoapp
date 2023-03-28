# Descrição do projeto
Esta é uma aplicação cliente do seguinte projeto: [todoapp-api](https://github.com/ohRobertoCarlos/todoapp-api). Para poder testá-la é necessário rodar a aplicação server-side.

## Instruções para rodar o projeto

### Denpendências para rodar projeto
  * node
  * git
### Clone o projeto

#### Opção com SSH:
```bash
git clone git@github.com:ohRobertoCarlos/todoapp.git
```

### Entre no diretório do projeto

```bash
cd todoapp
```

### Criar arquivo de configurações.
Copie o conteúdo do arquivo .env.example na raiz do projeto, em seguida, crie um arquivo .env na raiz do projeto e cole o conteúdo copiado.
#### Se estiver no linux apenas rode o seguinte comando:
```bash
cp .env.example .env
```

### Em seguida rode os seguintes comandos, então a aplicação está sendo servida em http://localhost:3000
```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev
```
