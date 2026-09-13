export interface WeatherResponse {
    city: string
    temperature: number
    feelsLike: number
    humidity: number
    description: string
    icon: string
    windSpeed: number
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getWeather(city: string): Promise<WeatherResponse> {
    const response = await fetch(`${API_BASE_URL}/weather/${encodeURIComponent(city)}`)

    if (!response.ok) {
        throw new Error('Unable to fetch weather data')
    }

    return response.json();
}