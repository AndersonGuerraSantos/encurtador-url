const express = require("express");
const { initDb } = require("./database");
const encurtador = require("./encurtador");

const app = express();
app.use(express.json());

initDb();

app.post("/encurtar", (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ erro: "envie um JSON com a chave 'url'" });
  }
  const resultado = encurtador.encurtarUrl(url);
  res.status(201).json(resultado);
});

app.get("/url/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const resultado = encurtador.buscarPorId(id);
  if (!resultado) {
    return res.status(404).json({ erro: "id não encontrado" });
  }
  res.json(resultado);
});

app.get("/urls/:data", (req, res) => {
  const resultado = encurtador.buscarPorData(req.params.data);
  res.json(resultado);
});

app.get("/url/codigo/:codigo", (req, res) => {
  const resultado = encurtador.buscarPorCodigo(req.params.codigo);
  if (!resultado) {
    return res.status(404).json({ erro: "codigo não encontrado" });
  }
  res.json(resultado);
});

app.get("/r/:codigo", (req, res) => {
  const resultado = encurtador.buscarPorCodigo(req.params.codigo);
  if (!resultado) {
    return res.status(404).json({ erro: "link não encontrado" });
  }
  res.redirect(resultado.url_original);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor em http://127.0.0.1:${PORT}`);
});
