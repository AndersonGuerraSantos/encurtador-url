const { getDb } = require("./database");

function gerarCodigo(tamanho = 6) {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let codigo = "";
  for (let i = 0; i < tamanho; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
}

function encurtarUrl(urlOriginal) {
  const codigo = gerarCodigo();
  const hoje = new Date().toISOString().slice(0, 10);
  const database = getDb();
  const stmt = database.prepare(
    "INSERT INTO urls (url_original, codigo, data_criacao) VALUES (?, ?, ?)"
  );
  const result = stmt.run(urlOriginal, codigo, hoje);
  return {
    id: result.lastInsertRowid,
    codigo,
    url_original: urlOriginal,
    data_criacao: hoje,
  };
}

function buscarPorId(idUrl) {
  const database = getDb();
  const row = database.prepare(
    "SELECT id, url_original, codigo, data_criacao FROM urls WHERE id = ?"
  ).get(idUrl);
  return row || null;
}

function buscarPorData(dataStr) {
  const database = getDb();
  const rows = database.prepare(
    "SELECT id, url_original, codigo, data_criacao FROM urls WHERE data_criacao = ?"
  ).all(dataStr);
  return rows;
}

function buscarPorCodigo(codigo) {
  const database = getDb();
  const row = database.prepare(
    "SELECT id, url_original, codigo, data_criacao FROM urls WHERE codigo = ?"
  ).get(codigo);
  return row || null;
}

module.exports = {
  encurtarUrl,
  buscarPorId,
  buscarPorData,
  buscarPorCodigo,
};
