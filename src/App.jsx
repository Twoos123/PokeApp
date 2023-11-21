import { useEffect, useState } from 'react'
import './App.css'

async function fetchPokemonSprite(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();
  const frontDefaultSprite = data.sprites.front_default;
  return frontDefaultSprite
}


function PokemonSprite({ name }) {
  const [sprite, setSprite] = useState('')

  useEffect(() => {
    async function updateSprite() {
      if (name.length > 0) {
        const sprite = await fetchPokemonSprite(name)
        setSprite(() => sprite)
      }
    }
    updateSprite()

  }, [name])


  return <div>
    {sprite.length > 0 &&
      <div>
        <img src={sprite} />
      </div>
    }
  </div >
}


function App() {
  const [textbox, setTextBox] = useState('')
  const [pokemon, setPokemon] = useState('')

  const onSubmit = () => {
    setPokemon(textbox)
  }


  return (
    <>
      <div>Pokemon App</div>
      <input onChange={(e) => setTextBox(e.target.value)} />
      <button onClick={onSubmit}>Submit</button>
      <PokemonSprite name={pokemon} />
    </>

  )
}

export default App