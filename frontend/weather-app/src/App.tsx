import { useState, useEffect } from 'react'
import './App.css'
import { getWeather, type WeatherResponse } from './services/weatherService'
import WeatherCard from './components/WeatherCard'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState<WeatherResponse | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!city.trim()) {
      setError('Please enter a city name.')
      return
    }

    try {
      setLoading(true)
      setError('')

      const data = await getWeather(city.trim())

      setWeather(data)
    } catch (error) {
      setWeather(null)

      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Unable to fetch weather data.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadDefaultWeather = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getWeather('London')

        setWeather(data)
      } catch (error) {
        setWeather(null)

        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('Unable to fetch weather data.')
        }
      } finally {
        setLoading(false)
      }
    }
    loadDefaultWeather()
  }, [])

  return (
    <div className="app">
      <div className="container">
        <div className="title">
          <h1>Weather App</h1>
          <p>Check the current weather for any city.</p>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearch()
              }
            }}
          />

          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && <WeatherCard weather={weather} />}

      </div>
    </div>
  )
}

export default App
