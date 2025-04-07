const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Permite receber JSON no corpo das requisições

const pokemons = {
  25: { nome: 'Pikachu' },
  1: { nome: 'Bulbasaur' },
  4: { nome: 'Charmander' },
  7: { nome: 'Squirtle' }
};

// GET - Buscar Pokémon por ID
app.get('/pokemon/:id', (req, res) => {
  const id = req.params.id;
  const pokemon = pokemons[id];

  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).json({ erro: 'Pokémon não encontrado' });
  }
});

// POST - Adicionar novo Pokémon
app.post('/pokemon', (req, res) => {
  const { id, nome } = req.body;

  if (!id || !nome) {
    return res.status(400).json({ erro: 'ID e nome são obrigatórios' });
  }

  if (pokemons[id]) {
    return res.status(409).json({ erro: 'Pokémon já existe' });
  }

  pokemons[id] = { nome };
  res.status(201).json({ mensagem: 'Pokémon adicionado com sucesso', pokemon: pokemons[id] });
});

// PUT - Atualizar nome de um Pokémon
app.put('/pokemon/:id', (req, res) => {
  const id = req.params.id;
  const { nome } = req.body;

  if (!pokemons[id]) {
    return res.status(404).json({ erro: 'Pokémon não encontrado' });
  }

  pokemons[id].nome = nome;
  res.json({ mensagem: 'Pokémon atualizado com sucesso', pokemon: pokemons[id] });
});

// DELETE - Remover Pokémon
app.delete('/pokemon/:id', (req, res) => {
  const id = req.params.id;

  if (!pokemons[id]) {
    return res.status(404).json({ erro: 'Pokémon não encontrado' });
  }

  delete pokemons[id];
  res.json({ mensagem: 'Pokémon removido com sucesso' });
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
