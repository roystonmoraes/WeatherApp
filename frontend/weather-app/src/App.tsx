import { useState } from 'react'
import './App.css'
import { getWeather, type WeatherResponse } from './services/weatherService'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState<WeatherResponse | null>(null)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (!city.trim()) {
      return
    }

    try {
      setError('')

      const data = await getWeather(city)

      setWeather(data)
    } catch {
      setWeather(null)
      setError('Unable to fetch weather data.')
    }
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

      {error && <p>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Feels like: {weather.feelsLike}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Conditions: {weather.description}</p>
          <p>Wind speed: {weather.windSpeed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default App