import axios from "axios";
import { useEffect, useState } from "react";
import githubLogo from "./assets/github.png";
import { HourlyForecastCard } from "./components/HourlyForecastCard";
import { SearchBar } from "./components/SearchBar";
import { WeatherCard } from "./components/WeatherCard";
import { WeatherDetails } from "./components/WeatherDetails";
import { Forecast, Weather, WeatherDetailsData } from "./interfaces/interfaces";

export function App() {
	const [weatherData, setWeatherData] = useState<Weather | null>(null);
	const [forecastData, setForecastData] = useState<Forecast | null>(null);
	const [weatherDetailsData, setWeatherDetailsData] =
		useState<WeatherDetailsData | null>(null);

	function searchCity(city: string) {
		const apiKey: string = import.meta.env.VITE_WEATHER_API_KEY;
		const instance = axios.create({
			baseURL: "https://api.openweathermap.org/data/2.5/",
		});
		instance
			.get(`weather?q=${city}&appid=${apiKey}&units=metric`)
			.then((response) => setWeatherData(response.data))
			.catch((err) => console.log(err));
		instance
			.get(`forecast?q=${city}&appid=${apiKey}&units=metric`)
			.then((response) => setForecastData(response.data))
			.catch((err) => console.log(err));
		localStorage.clear();
		localStorage.setItem("City", city);
	}

	useEffect(() => {
		const localStorageCity = localStorage.getItem("City");
		if (localStorageCity) {
			searchCity(localStorageCity);
		} else {
			localStorage.setItem("City", "calgary");
			searchCity("calgary");
		}
	}, []);

	useEffect(() => {
		const detail = [
			{
				title: "Visibility",
				value: `${(weatherData == null
					? 0
					: weatherData.visibility / 1000
				).toFixed(1)} km`,
			},
			{
				title: "Pressure",
				value: `${weatherData == null ? 0 : weatherData.main.pressure} hPa`,
			},
			{
				title: "Humidity",
				value: `${weatherData == null ? 0 : weatherData.main.humidity}%`,
			},
			{
				title: "FeelsLike",
				value: `${
					weatherData == null ? 0 : weatherData.main.feels_like.toFixed(0)
				}\xB0`,
			},
			{
				title: "Wind",
				value: `${weatherData == null ? "" : weatherData.wind.speed} km/h`,
			},
			{
				title: "Sunrise",
				value: `${
					weatherData == null
						? 0
						: new Date(weatherData.sys.sunrise * 1000).toLocaleString("en", {
								hour: "numeric",
								minute: "numeric",
						  })
				}`,
			},
			{
				title: "Sunset",
				value: `${
					weatherData == null
						? 0
						: new Date(weatherData.sys.sunset * 1000).toLocaleString("en", {
								hour: "numeric",
								minute: "numeric",
						  })
				}`,
			},
		];
		setWeatherDetailsData({ detail: detail });
	}, [weatherData]);

	return (
		<div className="min-w-fit w-screen h-screen pt-4 pb-8 flex flex-col items-center gap-2 bg-gradient-to-b from-sky-300 via-sky-600 to-sky-800 lg:px-1">
			<div className="h-full w-full overflow-y-scroll select-none">
				<SearchBar searchCity={searchCity} />
				<WeatherCard data={weatherData} />
				<HourlyForecastCard data={forecastData} />
				<div className="min-w-[360px] w-80 m-auto py-2 grid grid-cols-2 gap-2 sm:w-[600px]   md:w-[740px]  lg:w-[960px] xl:w-[1100px]   2xl:w-[1500px]">
					{weatherDetailsData?.detail.map((detail, index) => {
						return (
							<WeatherDetails
								key={index}
								title={detail.title}
								value={detail.value.toString()}
							/>
						);
					})}
					<div className="py-3 px-5 h-24 flex flex-col gap-2 bg-sky-900 rounded bg-opacity-20 text-white">
						<div className="text-sm text-slate-200 sm:text-lg xl:text-base">
							GitHub
						</div>
						<div className="flex justify-center">
							<a
								target="_blank"
								href="https://github.com/VictorCazaes/WeatherApp/"
							>
								<img src={githubLogo} alt="github" className="w-8 invert" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
