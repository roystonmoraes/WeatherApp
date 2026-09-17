import { useState, useEffect } from 'react'
import './App.css'
import { getWeather, type WeatherResponse } from './services/weatherService'
import WeatherCard from './components/WeatherCard'
import SearchBar from './components/SearchBar'

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

        const data = await getWeather(import.meta.env.VITE_DEFAULT_CITY)

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

        <SearchBar
          city={city}
          loading={loading}
          onCityChange={setCity}
          onSearch={handleSearch}
        />

        {error && <p className="error">{error}</p>}

        {weather && <WeatherCard weather={weather} />}

      </div>
    </div>
  )
}

export default App
