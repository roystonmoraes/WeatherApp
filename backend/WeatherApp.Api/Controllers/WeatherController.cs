using Microsoft.AspNetCore.Mvc;
using WeatherApp.Api.Services;

namespace WeatherApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly WeatherService _weatherService;

    public WeatherController(WeatherService weatherService)
    {
        _weatherService = weatherService;
    }

    [HttpGet("{city}")]
    public async Task<IActionResult> GetWeather(string city)
    {
        var weather = await _weatherService.GetWeatherAsync(city);

        if (weather is null)
        {
            return NotFound(new { message = $"Weather data not found for '{city}'." });
        }

        return Ok(weather);
    }
}
