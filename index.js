const express = require("express");
const res = require("express/lib/response");
const app = express();
const path = require("path");
let menssagem = "";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const pokedex = [
  {
    id: 1,
    nome: "Bulbasaur",
    descricao:
      "Há uma semente de planta nas costas desde o dia em que este Pokémon nasce. A semente cresce lentamente",
    tipo: "Grass",
    altura: 0.7,
    peso: 6.9,
    categoria: "Semente",
    habilidade: "Superar",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
  },
  {
    id: 2,
    nome: "Charmander",
    descricao:
      "Tem preferência por coisas quentes. Quando chove, diz-se que o vapor jorra da ponta de sua cauda.",
    tipo: "Fire",
    altura: "0.6",
    peso: "8.5",
    categoria: "Lagarto",
    habilidade: "Chama",
    imagem: " https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
  },
  {
    id: 3,
    nome: "Squirtle",
    descricao:
      "Quando retrai seu longo pescoço em sua concha, esguicha água com força vigorosa.",
    tipo: "Water",
    altura: 0.5,
    peso: 9.0,
    categoria: "Tartaruga Minúscula",
    habilidade: "Torrente",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
  },
];

// ## ROTAS##
app.get("/", (req, res) => {
  setTimeout(() => {
    menssagem = "";
  }, 1000);
  res.render("index", { pokedex, menssagem });
});

app.post("/cadastrar", (req, res) => {
  let pokemon = req.body;
  pokemon.id = pokedex.length + 1;
  pokedex.push(pokemon);
  console.log(pokemon);
  menssagem = `Cadastro do ${pokemon.nome} efetuado com sucesso!!`;
  res.redirect("/");
});

app.get("/editar/:id", (req, res) => {
  let id = +req.params.id;
  pokemon = pokedex.find((pokemon) => pokemon.id === id);
  console.log(pokemon);
  menssagem = `Alteração do Pokemon ${pokemon.nome} efetuado com sucesso!!`;
  res.render("cadastro", { pokemon });
});

app.get("/cadastro", (req, res) => {
  pokemon = undefined;
  res.render("cadastro");
});

app.get("/descricao/:id", (req, res) => {
  let id = +req.params.id;
  pokemon = pokedex.find((pokemon) => pokemon.id === id);
  console.log(pokemon);
  res.render("descricao", { pokemon });
});

app.get("/delete/:id", (req, res) => {
  let id = +req.params.id - 1;
  delete pokedex[id];
  menssagem = "Pokemon deletado";
  res.redirect("/");
});

app.post("/upDate/:id", (req, res) => {
  let id = +req.params.id - 1;
  let newPokemon = req.body;
  newPokemon.id = id + 1;
  pokedex[id] = newPokemon;
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
