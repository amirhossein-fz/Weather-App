import { useWeather } from "./WeatherContext";
import { CiLight, CiSearch } from "react-icons/ci";
function Searchbar() {

    const { setCity, searchWeather } = useWeather();

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const cityName = formData.get("city")

    setCity(cityName)
    searchWeather(cityName)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bg-white p-6 rounded-xl shadow-lg"
    >
      <button
        type="button"
        className="text-green-600 text-xl rounded hover:scale-120 border transition-transform absolute top-4 right-4"
      >
        <CiLight />
      </button>
      <div className="flex items-center gap-4">
        <img src="/header-logo.png" alt="Weather app logo" className="w-60" />
        <div>
          {/* <h1 className="text-3xl font-bold leading-none text-slate-950">Weather</h1>
          <p className="text-2xl font-semibold leading-none text-green-600">APP</p> */}
        </div>
      </div>
      <div className=" flex justify-center mt-3">
        <input
          className="w-100 bg-white border border-gray-300 rounded shadow px-3 py-2 center"
          type="text"
          name="city"
          placeholder="Search City"
        />

        <button
          type="submit"
          className="w-12 bg-green-600 text-white text-xl rounded shadow hover:bg-green-600 ml-1 py-2 flex items-center justify-center"
        >
          <CiSearch />
        </button>
      </div>
    </form>
  );
}

export default Searchbar;
