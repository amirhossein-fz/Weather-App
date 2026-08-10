import { createContext, useContext, useState } from "react";

const  WeatherContext = createContext()

export function WeatherProvider({children}) {

const [city, setCity] = useState("")

const [darkmode, setDarkmode] = useState()

const [location, setLocation] = useState(null);

const [weather, setWeather] = useState(null);

const [loading, setLoading] = useState(false)

const [error, setError ] = useState("")

async function searchWeather(cityName) {
  setLoading(true);
  setError("");

  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`,
    );

    const data = await response.json();
    const result = data.results?.[0];

    if (!result) {
      throw new Error("City not found");
    }

    setLocation(result);

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${result.latitude}&longitude=${result.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh`,
    );

    const weatherData = await weatherResponse.json();

    setWeather(weatherData.current);
  } catch (error) {
    setError(error.message);
    setWeather(null);
  } finally {
    setLoading(false);
  }
}

    return(
        <WeatherContext.Provider value={{city, setCity, location, weather, searchWeather, loading, error}}>
                {children}
        </WeatherContext.Provider>
    )
}

export function useWeather(){
    return useContext(WeatherContext)
}