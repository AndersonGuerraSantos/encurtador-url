# Documentação da API – Encurtador de URL

Base URL: https://encurtador-url-6de8.onrender.com

Em erro a resposta vem com um objeto `{ "erro": "mensagem" }`.

---

## 1. Encurtar URL

Salva a URL no banco e devolve id, código e data.

**POST** `/encurtar`

Body (JSON): campo `url` (string) com a URL que quer encurtar.

Exemplo:

```http
POST /encurtar
Content-Type: application/json

{"url": "https://www.google.com"}
```

Resposta 201:

```json
{
  "id": 1,
  "codigo": "aB3xYz",
  "url_original": "https://www.google.com",
  "data_criacao": "2025-02-27"
}
```

Erro 400 (falta o campo url):

```json
{"erro": "envie um JSON com a chave 'url'"}
```

---

## 2. Buscar por ID

**GET** `/url/:id` — o `id` é número.

Exemplo: `GET /url/1`

Resposta 200:

```json
{
  "id": 1,
  "url_original": "https://www.google.com",
  "codigo": "aB3xYz",
  "data_criacao": "2025-02-27"
}
```

404 (id não existe):

```json
{"erro": "id não encontrado"}
```

---

## 3. Listar por data

**GET** `/urls/:data` — a `data` no formato YYYY-MM-DD.

Exemplo: `GET /urls/2025-02-27`

Resposta 200:

```json
[
  {
    "id": 1,
    "url_original": "https://www.google.com",
    "codigo": "aB3xYz",
    "data_criacao": "2025-02-27"
  },
  {
    "id": 2,
    "url_original": "https://example.com",
    "codigo": "K9mPq2",
    "data_criacao": "2025-02-27"
  }
]
```

Se não tiver nada na data, retorna `[]`.

---

## 4. Buscar por código

**GET** `/url/codigo/:codigo` — o `codigo` é a string do link curto.

Exemplo: `GET /url/codigo/aB3xYz`

Resposta 200:

```json
{
  "id": 1,
  "url_original": "https://www.google.com",
  "codigo": "aB3xYz",
  "data_criacao": "2025-02-27"
}
```

404 (código não existe):

```json
{"erro": "codigo não encontrado"}
```

---

## 5. Acessar link curto

**GET** `/r/:codigo`

Se existir o código, redireciona (302) para a URL original. Se não, 404:

```json
{"erro": "link não encontrado"}
```

---

## 6. Rota raiz

**GET** `/`

```json
{
  "nome": "Encurtador de URL",
  "status": "ok",
  "docs": "veja DOCUMENTACAO.md no repositório"
}
```

---

## Resumo

- GET / – info da API
- POST /encurtar – encurtar URL
- GET /url/:id – buscar por id
- GET /urls/:data – listar por data
- GET /url/codigo/:codigo – buscar por código
- GET /r/:codigo – redireciona pra URL original
