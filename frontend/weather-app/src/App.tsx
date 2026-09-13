import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('')

  const handleSearch = () => {
    console.log('Searching for:', city)
  }

  return (
    <div className="app">
      <h1>Weather App</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />

        <button onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  )
}

export default App