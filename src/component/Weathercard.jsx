// import { useState } from "react";
import { useWeather } from "./WeatherContext"

function Weathercard(){
    const {city, weather, location, loading, error} = useWeather()


    if (!city) {
        return <p className="text-center mt-2">Please Search for a City</p>;
    }

    if (loading) {
      return <p>Loading Weather...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (!weather){
        return <p> Loading Weather...</p>
    }


    return (
      <div className="bg-white p-6 mt-5 rounded-xl shadow-lg">
        <h2 className="text-2x1 font-bold text-gray-600">{location?.name}</h2>
        <p className="text-gray-500">Country:{location.country}</p>
        <p className="text-3xl font-bold text-green-600">
          {weather.temperature_2m}°C
        </p>
        <p className="text-gray-500">
          Humidity: {weather.relative_humidity_2m}%
        </p>
        <p className="text-gray-500">Wind: {weather.wind_speed_10m} km/h</p>

        <p className="text-gray-500">Weather code: {weather.weather_code}</p>
      </div>
    );
}

export default Weathercard
