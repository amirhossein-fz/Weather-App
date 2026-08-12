// import { useState } from "react";
import { useWeather } from "./WeatherContext"
import {
  FaSun,
  FaCloud,
  FaCloudSun,
  FaSmog,
  FaCloudRain,
  FaRegSnowflake,
  FaSearch,
  FaBolt,
  FaTint,
  FaWind,
  FaThermometerFull,
  FaThermometerEmpty,
} from "react-icons/fa";

function Weathercard(){
    const {city, weather, location, loading, error, forecast} = useWeather()


    if (!city) {
        return (
          <p className="text-center mt-2 text-gray-800 dark:text-gray-200">
            Please Search for a City
          </p>
        );
    }

    if (loading) {
      return (
        <div className="w-full max-w-2xl mx-auto mt-5 p-10 rounded-xl shadow-lg bg-white dark:bg-gray-800 text-center">
          <div
            className="w-10 h-10 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin mx-auto"
            aria-label="Loading weather"
          ></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="w-95 mx-auto mt-5 p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 text-center">
          <p className="text-center mt-2 text-gray-800 dark:text-gray-200">
            {error}
          </p>
        </div>
      );
    }

    if (!weather){
        return <p> <FaSearch/> </p>
    }

    function getweatherDescrption(code) {
        switch (code) {
            case 0: return "Clear sky";
            case 1: return "Mainly Clear"
            case 2: return "Partly Cloudy"
            case 3: return "Overcast"
            case 45: case 48: return "Fog"
            case 51: case 53: case 55: return "Drizzle"
            case 56: case 57: return "Freezing drizzle"
            case 61: case 63: case 65: return "Rain"
            case 66: case 67: return "Freezing rain"
            case 71: case 73: case 75: return "Snow"
            case 77: return "Snow grains"
            case 80: case 81: case 82: return "Rain showers"
            case 85: case 86: return "Snow showers"
            case 95: return "Thunderstorm"
            case 96: case 99: return "Thunderstorm + hail"
            default: return "Unknown"

        }
    }

    function getweatherIcon (code){
        switch (code) {
          case 0:
            return <FaSun className="text-yellow-400" />;
          case 1:
            return <FaCloudSun className="text-gray-400" />;
          case 2:
          case 3:
            return <FaCloud className="text-gray-400" />;
          case 45:
          case 48:
            return <FaSmog className="text-gray-400" />;
          case 51:
          case 53:
          case 55:
          case 56:
          case 57:
          case 61:
          case 63:
          case 65:
          case 66:
          case 67:
          case 80:
          case 81:
          case 82:
            return <FaCloudRain className="text-blue-500" />;
          case 71:
          case 73:
          case 75:
          case 77:
          case 85:
          case 86:
            return <FaRegSnowflake className="text-blue-300" />;
          case 95:
          case 96:
          case 99:
            return <FaBolt className="text-yellow-500" />;
          default:
            return <FaSearch className="text-green-600" />;
        }
    }

    return (
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 mt-5 rounded-xl shadow-lg mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300">
          {location?.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Country: {location.country}
        </p>{" "}
        <br />
        <div>
          {" "}
          <div>
            {" "}
            <p className="text-6xl flex items-center justify-center">
              {getweatherIcon(weather.weather_code)}
            </p>{" "}
          </div>{" "}
          <br />
          <p className="text-gray-500 dark:text-gray-300">
            {getweatherDescrption(weather.weather_code)}
          </p>{" "}
          <br />
          <p className="text-3xl font-bold text-green-600">
            {weather.temperature_2m}°C
          </p>{" "}
        </div>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
            <FaTint className="text-blue-500 mx-auto mb-1" />

            <p className="text-sm text-gray-500 dark:text-gray-300">Humidity</p>

            <p className="font-bold text-gray-800 dark:text-white">
              {weather.relative_humidity_2m}%
            </p>
          </div>

          <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
            <FaWind className="text-gray-500 mx-auto mb-1" />

            <p className="text-sm text-gray-500 dark:text-gray-300">Wind</p>

            <p className="font-bold text-gray-800 dark:text-white">
              {weather.wind_speed_10m} km/h
            </p>
          </div>
        </div>
        {forecast && (
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200">
              7-Day Forecast
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-4">
              {forecast.time.map((date, index) => (
                <div
                  key={date}
                  className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-center"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>

                  <div className="flex justify-center items-center text-3xl my-3">
                    {getweatherIcon(forecast.weather_code[index])}
                  </div>
                  <p className="flex items-center justify-center gap-1 font-bold text-gray-800 dark:text-white">
                    <FaThermometerFull className="text-red-600 shrink-0" />
                    <span>
                      {Math.round(forecast.temperature_2m_max[index])}°C
                    </span>
                  </p>
                  <p className="flex items-center justify-center gap-1 font-bold text-gray-600 dark:text-gray-300">
                    <FaThermometerEmpty className="text-blue-600 shrink-0" />
                    <span>
                      {Math.round(forecast.temperature_2m_min[index])}°C
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
}

export default Weathercard
