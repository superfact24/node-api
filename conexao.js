const mysql = require('mysql');

var db;

function conexao() {
  db = mysql.createPool({
    host: '127.0.0.1',
     user: 'root',
     password: '',
     database: 'lumen_node',
  });
  
  db.query('select 1+1 as total',
   function(erro, resultados) {
    if(erro) {
      console.error(erro)
      return
    }
    console.log('Banco de dados conectado')
    console.log(resultados[0].total)
  })
}

function listarCursos(dados) {
  db.query('select * from curso', 
  function(erro, resultados) {
    if(erro) {
      console.log(erro)
      return;
    }
    console.log(resultados);
    dados(resultados);
  })
}

function listarCurso(id, dados) {
  db.query('select * from curso where id=?', id, 
  function(erro, resultados) {
    if(erro) {
      console.log(erro)
      return
    }
    console.log(resultados);
    dados(resultados[0]);
  })
}

function criarCurso(curso) {
  db.query('insert into curso (nome, descricao, duracao) values(?, ?, ?)', 
  [curso.nome, curso.descricao, curso.duracao], 
  function(erro) {
    if(erro) {
      console.error(erro);
      return
    }
    console.log("Curso criado com sucesso")
  })
}

function editarCurso(id, curso) {
  db.query('update curso set nome=?, descricao=?, duracao=? where id=?', 
  [curso.nome, curso.descricao, curso.duracao, id], 
  function(erro) {
    if(erro) {
      console.error(erro);
      return
    }
    console.log("Curso editado com sucesso")
  })
}

function eliminarCurso(id) {
  db.query('delete from curso where id=?', 
  id, 
  function(erro) {
    if(erro) {
      console.error(erro);
      return
    }
    console.log("Curso eliminado com sucesso")
  })
}

module.exports = {
  conexao,
  listarCursos,
  listarCurso,
  criarCurso,
  editarCurso,
  eliminarCurso
}