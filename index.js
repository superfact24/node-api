const express = require('express');
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
  res.send(cursos)
});

// listagem de um curso pelo id
app.get('/curso/:id', function(req, res){
  var curso = cursos.find(function(item) {return item.id == req.params.id})
  res.send(curso)
});

// criar um novo curso
app.post('/curso/', function(req, res){
  var curso = req.body;
  /* 
  comanda para pegar o id do ultimoo elemento do array
   e adicionar 1 para ser o id no novo curso */
  curso.id = cursos[cursos.length-1].id+1;
  cursos.push(curso);
  res.send(curso)
});

// editar um curso
app.put('/curso/:id', function(req, res){
  var curso = req.body;
  curso.id = req.params.id;
  var index = cursos.findIndex(function(item) {
    return item.id == curso.id;
  })
  cursos[index] = curso;
  res.send(curso)
});

// apgar um curso
app.delete('/curso/:id', function(req, res){
  var index = cursos.findIndex(function(item) {
    return item.id == req.params.id;
  })
  
  cursos.splice(index, 1);
  res.send(cursos)
});
app.listen(3000, function(){
  console.log('Servidor operacional');
})

