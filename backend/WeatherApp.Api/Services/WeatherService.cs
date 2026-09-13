using System.Text.Json;
using WeatherApp.Api.Models;

namespace WeatherApp.Api.Services;

public class WeatherService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public WeatherService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<WeatherResponse?> GetWeatherAsync(string city)
    {
        var apiKey = _configuration["OpenWeather:ApiKey"];
        var baseUrl = _configuration["OpenWeather:BaseUrl"];

        if (string.IsNullOrWhiteSpace(apiKey))
        {
            throw new InvalidOperationException("OpenWeather API key is not configured.");
        }

        if (string.IsNullOrWhiteSpace(baseUrl))
        {
            throw new InvalidOperationException("OpenWeather BaseUrl is not configured.");
        }

        var url = $"{baseUrl}/weather?q={Uri.EscapeDataString(city)}&appid={apiKey}&units=metric";

        var response = await _httpClient.GetAsync(url);

        var responseBody = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            throw new HttpRequestException(
                $"OpenWeather API returned {(int)response.StatusCode}: {responseBody}"
            );
        }

        using var document = JsonDocument.Parse(responseBody);

        var root = document.RootElement;

        return new WeatherResponse
        {
            City = root.GetProperty("name").GetString() ?? city,
            Temperature = root.GetProperty("main").GetProperty("temp").GetDouble(),
            FeelsLike = root.GetProperty("main").GetProperty("feels_like").GetDouble(),
            Humidity = root.GetProperty("main").GetProperty("humidity").GetInt32(),
            Description =
                root.GetProperty("weather")[0].GetProperty("description").GetString()
                ?? string.Empty,
            Icon = root.GetProperty("weather")[0].GetProperty("icon").GetString() ?? string.Empty,
            WindSpeed = root.GetProperty("wind").GetProperty("speed").GetDouble(),
        };
    }
}
