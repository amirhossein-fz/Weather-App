// import { useState } from "react";
import { useWeather } from "./WeatherContext"
import {  FaSun, FaCloud, FaCloudSun, FaSmog, FaCloudRain, FaRegSnowflake, FaSearch, FaBolt, FaTint, FaWind,} from "react-icons/fa";

function Weathercard(){
    const {city, weather, location, loading, error} = useWeather()


    if (!city) {
        return (
          <p className="text-center mt-2 text-gray-800 dark:text-gray-200">
            Please Search for a City
          </p>
        );
    }

    if (loading) {
      return (
        <p className="text-center mt-2 text-gray-800 dark:text-gray-200">
          Loading Weather...
        </p>
      );
    }

    if (error) {
      return (
        <p className="text-center mt-2 text-gray-800 dark:text-gray-200">
          {error}
        </p>
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
      <div className="w-95 bg-white dark:bg-gray-800 p-6 mt-5 rounded-xl shadow-lg mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300">
          {location?.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Country: {location.country}
        </p>{" "}
        <br />
        <p className="text-6xl flex items-center justify-center">
          {getweatherIcon(weather.weather_code)}
        </p>{" "}
        <br />
        <p className="text-3xl font-bold text-green-600">
          {weather.temperature_2m}°C
        </p>{" "}
        <br />
        <div className="flex justify-between gap-4">
          <div>
            {" "}
            <FaTint className="text-blue-500 mx-auto" />
            <p className="text-gray-500 dark:text-gray-300">
              Humidity: {weather.relative_humidity_2m}%
            </p>
          </div>
          <div>
            {" "}
            <FaWind className="text-gray-500 mx-auto" />
            <p className="text-gray-500 dark:text-gray-300">
              Wind: {weather.wind_speed_10m} km/h
            </p>
          </div>
        </div>{" "}
        <br />
        <p className="text-gray-500 dark:text-gray-300">
          {getweatherDescrption(weather.weather_code)}
        </p>
      </div>
    );
}

export default Weathercard
