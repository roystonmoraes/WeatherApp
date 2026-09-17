import type { WeatherResponse } from '../services/weatherService'

interface WeatherCardProps {
    weather: WeatherResponse
}

function WeatherCard({ weather }: WeatherCardProps) {
    return (
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
    )
}

export default WeatherCard