import React, { Component } from "react";
import "./App.css";

// Liste de syllabes pour générer des noms de pokemons of course
const syllables = [
  "pi",
  "ka",
  "chu",
  "sa",
  "ri",
  "to",
  "bu",
  "lu",
  "dra",
  "go",
  "ni",
  "ta",
  "lu",
  "gi",
  "ca",
];

// Types de pokemon
const types = ["eau", "feu", "éclair", "fée", "spectre", "vol"];

// Composant pour afficher un pokemon
class Pokemon extends Component {
  render() {
    const { name, type, image } = this.props;
    return (
      <div className="pokemon">
        <img src={image} alt={name} />
        <div className="info">
          <h2>{name}</h2>
          <p>Type: {type}</p>
        </div>
      </div>
    );
  }
}

// Composant principal
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfPokemon: 0,
      pokemonList: [],
    };
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      numberOfPokemon: value,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.generatePokemon();
    }
  };

  generatePokemon = () => {
    const { numberOfPokemon } = this.state;
    const pokemonList = [];
    for (let i = 0; i < numberOfPokemon; i++) {
      const name = this.generateName();
      const type = types[Math.floor(Math.random() * types.length)];
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Math.floor(
        Math.random() * 100
      )}.png`;
      pokemonList.push({
        name,
        type,
        image,
      });
    }
    this.setState({
      pokemonList,
    });
  };

  generateName = () => {
    let name = "";
    const syllableCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < syllableCount; i++) {
      const index = Math.floor(Math.random() * syllables.length);
      name += syllables[index];
    }
    return name;
  };

  render() {
    const { numberOfPokemon, pokemonList } = this.state;
    return (
      <div className="app">
        <div className="input-container">
          <label htmlFor="numberOfPokemon">Nombre de pokemon:</label>
          <input
            type="number"
            id="numberOfPokemon"
            value={numberOfPokemon}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
          />
        </div>
        <div className="pokemon-list">
          {pokemonList.map((pokemon, index) => (
            <Pokemon
              key={index}
              name={pokemon.name}
              type={pokemon.type}
              image={pokemon.image}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
