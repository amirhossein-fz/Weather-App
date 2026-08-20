import { useWeather } from "./WeatherContext";
import { CiLight, CiDark, CiSearch } from "react-icons/ci";
import { useState } from "react";

function Searchbar() {
    const { setCity, searchWeather,fetchWeatherByLocation, darkmode, setDarkmode } = useWeather();
    const [ inputError, setInputError ] = useState("");
    const [ inputValue, setInputvalue ] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    async function getSuggestions(value) {
      if (value.trim().length < 2){
        setSuggestions([])
        return
      }
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(value)}&count=5`,
      );

      if (!response.ok) {
        setSuggestions([])
        return
      }

      const data = await response.json()
      setSuggestions(data.results || [])
    }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const cityName = formData.get("city")
    if (!cityName.trim()) {
      setInputError("Please enter a city")
      return
    }
    setInputError("")
    setCity(cityName)
    searchWeather(cityName)
  }

  function handleSelectSuggestion(suggestion) {
    setInputvalue(suggestion.name);
    setSuggestions([]);
    setCity(suggestion.name);
    fetchWeatherByLocation(suggestion);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bg-white p-6 rounded-xl shadow-lg dark:bg-gray-800"
    >
      <button
        type="button"
        className="text-green-600 text-xl rounded hover:scale-120 border transition-transform absolute top-4 right-4"
        onClick={() => setDarkmode(!darkmode)}
      >
        {darkmode ? <CiDark /> : <CiLight />}
      </button>
      <div>
        <img
          src={darkmode ? "/header-logo-dark.png" : "/header-logo-light.png"}
          alt="Weather app logo"
          className="w-60"
        />
      </div>
      <div className=" flex flex-col  items-center mt-3">
        <div className="flex">
          <div className="relative">
            <input
              className="w-100 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded shadow px-3 py-2"
              type="text"
              name="city"
              placeholder="Search City"
              value={inputValue}
              onChange={(event) => {
                const value = event.target.value;

                setInputvalue(value);
                getSuggestions(value);
              }}
            />

            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10">
                {suggestions.map((suggestion) => (
                  <button
                    key={`${suggestion.id}-${suggestion.latitude}`}
                    type="button"
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <p className="text-gray-900 dark:text-white">
                      {suggestion.name}
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {suggestion.country}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-12 bg-green-600 text-white text-xl rounded shadow hover:bg-green-600 ml-1 py-2 flex items-center justify-center"
          >
            <CiSearch />
          </button>
        </div>
        {inputError && (
          <p className="text-red-500 text-sm mt-2 text-center">{inputError}</p>
        )}
      </div>
    </form>
  );
}

export default Searchbar;
