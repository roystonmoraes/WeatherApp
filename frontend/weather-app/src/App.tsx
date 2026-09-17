import { useState, useEffect } from 'react'
import './App.css'
import { getWeather, type WeatherResponse } from './services/weatherService'

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

        {weather && (
          <div className="weather-card">
            <div className="weather-header">
              <div>
                <h2>{weather.city}</h2>
                <p>{weather.description}</p>
              </div>

              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
              />
            </div>

            <div className="temperature">
              {Math.round(weather.temperature)}°C
            </div>

            <p className="feels-like">
              Feels like {Math.round(weather.feelsLike)}°C
            </p>

            <div className="weather-details">
              <div>
                <span>Humidity</span>
                <strong>{weather.humidity}%</strong>
              </div>

              <div>
                <span>Wind</span>
                <strong>{weather.windSpeed} m/s</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
