# WeatherApp

A simple full-stack weather application built with **React + TypeScript** and **ASP.NET Core Web API**.

The application allows users to search for a city and view its current weather information using the **OpenWeather API**.

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* CSS

### Backend

* C#
* ASP.NET Core Web API
* HttpClient
* OpenWeather API

### Development Tools

* Visual Studio Code
* Git
* GitHub

## Architecture

```text
React + TypeScript
       │
       │ HTTP
       ▼
ASP.NET Core Web API
       │
       │ HTTP
       ▼
OpenWeather API
```

The OpenWeather API key is kept on the backend and is **not exposed to the frontend**.

## Project Structure

```text
WeatherApp/
│
├── backend/
│   └── WeatherApp.Api/
│
├── frontend/
│   └── weather-app/
│
├── .gitignore
└── README.md
```

## Features

* Search weather by city
* Display current temperature
* Display "feels like" temperature
* Display weather conditions
* Display humidity
* Display wind speed
* Handle loading and API errors
* Keep the OpenWeather API key on the backend

## Getting Started

### Prerequisites

Install:

* .NET SDK
* Node.js
* npm
* Git

### 1. Clone the repository

```bash
git clone <repository-url>
cd WeatherApp
```

### 2. Start the Backend

Navigate to the backend project:

```bash
cd backend/WeatherApp.Api
```

Configure the OpenWeather API key using local configuration.

Then run:

```bash
dotnet run
```

### 3. Start the Frontend

Open another terminal:

```bash
cd frontend/weather-app
npm install
npm run dev
```

Open the URL displayed by Vite in your browser.

## API

The backend exposes an endpoint similar to:

```text
GET /api/weather/{city}
```

Example:

```text
GET /api/weather/London
```

The backend communicates with OpenWeather and returns a simplified weather response to the frontend.

## Configuration

The OpenWeather API key should **never be committed to GitHub**.

Local configuration and secret files are excluded through `.gitignore`.

## Future Improvements

Possible future enhancements:

* 5-day forecast
* Weather icons
* Automatic current-location weather
* Recent searches
* Temperature unit selection
* Responsive mobile UI
* Docker support
* Automated tests
* CI/CD with GitHub Actions

## License

This project is for learning and portfolio purposes.
