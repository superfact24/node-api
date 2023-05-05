const express = require('express');

const conexao = require('./conexao');

conexao.conexao();
const app = express();

// Permitir usar json no body(corpo) da requisição
app.use(express.json());
// Permitir usar formulario no body(corpo) da requisição
app.use(express.urlencoded());

const cursos = [
  {
    id: 1,
    nome: 'Introdução ao flexbox',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    duracao: 10
  },
  {
    id: 2,
    nome: 'Boostrap do jeito certo',
    descricao: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    duracao: 20
  }
]

app.get('/', function(req, res){
  res.send('Ola mundo!')
});
// listagem de todos os cursos
app.get('/curso', function(req, res){
  conexao.listarCursos(function(dados) {
    return res.send(dados);
  });
});

// listagem de um curso pelo id
app.get('/curso/:id', function(req, res){
  conexao.listarCurso(req.params.id, function(dados) {
    return res.send(dados);
  });
});

// criar um novo curso
app.post('/curso/', function(req, res){
  var curso = req.body;
  conexao.criarCurso(curso);
  res.send(curso)
});

// editar um curso
app.put('/curso/:id', function(req, res){
  var curso = req.body;
  var id = req.params.id;
  conexao.editarCurso(id, curso)
  res.send(curso)
});

// apgar um curso
app.delete('/curso/:id', function(req, res){
  conexao.eliminarCurso(req.params.id);
  res.send("Curso eliminado com sucesso")
});



// listagem de todos os alunos
app.get('/aluno', function(req, res){
  conexao.listarAlunos(function(dados) {
    return res.send(dados);
  });
});

// listagem de um aluno pelo id
app.get('/aluno/:id', function(req, res){
  conexao.listarAluno(req.params.id, function(dados) {
    return res.send(dados);
  });
});

// criar um novo aluno
app.post('/aluno/', function(req, res){
  var aluno = req.body;
  conexao.criarAluno(aluno);
  res.send(aluno)
});

// editar um aluno
app.put('/aluno/:id', function(req, res){
  var aluno = req.body;
  var id = req.params.id;
  conexao.editarAluno(id, aluno)
  res.send(aluno)
});

// apgar um aluno
app.delete('/aluno/:id', function(req, res){
  conexao.eliminarAluno(req.params.id);
  res.send("Aluno eliminado com sucesso")
});
app.listen(3000, function(){
  console.log('Servidor operacional');
})

