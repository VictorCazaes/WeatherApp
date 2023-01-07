import { Forecast } from "../interfaces/interfaces";

interface hourlyForecastDataProps {
	data: Forecast | null;
}

export function HourlyForecastCard({ data }: hourlyForecastDataProps) {
	return (
		<div className="w-full flex justify-center">
			<div className="min-w-[360px] h-44 py-3 px-5 flex flex-col justify-center gap-2 bg-sky-900 rounded bg-opacity-20 text-white sm:w-[600px] sm:h-56 sm:gap-8 md:w-[740px] md:h-56 lg:w-[960px] xl:w-[1100px] xl:h-56 xl:gap-1 2xl:w-[1500px]">
				<div className="text-sm text-slate-200 sm:text-lg">Hourly Forecast</div>
				<div className="h-28 w-80 flex flex-row items-center gap-3 overflow-x-scroll self-center sm:w-[540px] sm:h-52 sm:gap-6 md:w-[700px] md:h-56 md:gap-8 lg:w-[900px] lg:gap-10 xl:w-[930px] xl:h-40 xl:gap-14 2xl:w-[1370px]">
					{data?.list.map((hourlyData, index) => {
						const weatherIcon = `https://openweathermap.org/img/wn/${hourlyData.weather[0].icon}@2x.png`;
						return (
							<div
								className="min-w-[40px] flex flex-col items-center gap-1 sm:min-w-[55px] xl:min-w-[50px]"
								key={index}
							>
								<div className="text-xs font-light sm:text-lg xl:text-base">
									{new Date(hourlyData.dt * 1000).toLocaleString("en", {
										hour: "numeric",
									})}
								</div>
								<div>
									<img src={weatherIcon} alt="icon" />
								</div>
								<div className="text-lg font-medium sm:text-xl xl:text-lg">
									{hourlyData.main.temp.toFixed(0) == "-0"
										? "0\xB0 "
										: hourlyData.main.temp.toFixed(0) + "\xB0"}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
