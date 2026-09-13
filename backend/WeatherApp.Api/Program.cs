using WeatherApp.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod();
        }
    );
});

builder.Services.AddHttpClient<WeatherService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.MapControllers();

app.Run();
