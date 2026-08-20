import Searchbar from "./component/Searchbar";
import Weathercard from "./component/Weathercard";
import { useWeather } from "./component/WeatherContext";

function App(){
  const {darkmode} = useWeather()
  return (
    <div
      className={
        darkmode ? "dark min-h-screen bg-gray-900" : "min-h-screen bg-gray-200"
      }>
      <Searchbar />
      <Weathercard />
    </div>
  );
}

export default App
