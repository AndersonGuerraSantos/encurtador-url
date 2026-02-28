# Encurtador de URL

Projeto de encurtador de URLs. Envia uma URL longa e recebe um link curto que redireciona para o endereço original.

## Como rodar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Execute a aplicação:
   ```bash
   npm start
   ```

O servidor sobe em `http://127.0.0.1:5000`.

## Funcionalidades

- **Encurtar URL** – `POST /encurtar` com body JSON `{"url": "https://..."}`  
  Salva no banco e devolve o id e o código.

- **Buscar por id** – `GET /url/:id`  
  Retorna os dados da URL encurtada pelo id.

- **Buscar por data** – `GET /urls/YYYY-MM-DD`  
  Retorna todas as URLs criadas naquela data.

- **Buscar por código** – `GET /url/codigo/:codigo`  
  Retorna os dados da URL pelo código (ex: o "abc123" de /r/abc123).

- **Acessar link curto** – `GET /r/:codigo`  
  Redireciona para a URL original.

## Banco de dados

Usa SQLite. O arquivo `urls.db` é criado na primeira execução.

## Exemplos de uso

Encurtar:
```bash
curl -X POST http://127.0.0.1:5000/encurtar -H "Content-Type: application/json" -d '{"url":"https://www.google.com"}'
```

Buscar por id:
```bash
curl http://127.0.0.1:5000/url/1
```

Listar por data:
```bash
curl http://127.0.0.1:5000/urls/2025-02-27
```

Buscar por código:
```bash
curl http://127.0.0.1:5000/url/codigo/abc123
```

## Entrega no GitHub

1. Crie um repositório novo no GitHub (sem inicializar com README).
2. Na pasta do projeto, rode:
   ```bash
   git init
   git add .
   git commit -m "Encurtador de URL - projeto prático"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git
   git push -u origin main
   ```
3. Troque `SEU_USUARIO` e `NOME_DO_REPO` pelo seu usuário e nome do repositório.
