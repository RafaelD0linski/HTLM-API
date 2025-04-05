const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Banco de dados mock (poderia ser de verdade)
const pokemons = {
  25: { nome: 'Pikachu' },
  1: { nome: 'Bulbasaur' },
  4: { nome: 'Charmander' },
  7: { nome: 'Squirtle' }
};

// Rota da API
app.get('/pokemon/:id', (req, res) => {
  const id = req.params.id;
  const pokemon = pokemons[id];

  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).json({ erro: 'Pokémon não encontrado' });
  }
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
