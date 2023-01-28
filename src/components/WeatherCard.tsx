import { Weather } from "../interfaces/interfaces";

interface DataProps {
	data: Weather | null;
}
export function WeatherCard({ data }: DataProps) {
	function calculateTimeByTimezone(offset: number): string {
		const local = new Date();
		const localOffset = local.getTimezoneOffset() * 60 * 1000;
		const cityDate = new Date(
			local.getTime() + localOffset + offset * 1000
		).toLocaleDateString("en", {
			hour: "2-digit",
			minute: "2-digit",
		});
		return cityDate;
	}

	return (
		<div className="w-full py-3 flex flex-col items-center justify-center text-white">
			<div className="w-full flex flex-col items-center justify-between gap-4">
				<div>
					<div className="flex items-center justify-center gap-3">
						<div className="text-3xl font-semibold sm:text-5xl xl:text-3xl">
							{data?.name}
						</div>
						<img
							src={`https://openweathermap.org/images/flags/${
								data == null ? "" : data.sys.country.toLowerCase()
							}.png`}
							alt="flag"
							className="w-4 sm:w-6 xl:w-5"
						/>
					</div>
					<div className="text-sm font-light sm:text-lg xl:text-base">
						{data == null ? "" : calculateTimeByTimezone(data.timezone)}
					</div>
				</div>

				<div className="w-full text-center text-8xl font-medium">
					{data == null
						? ""
						: data.main.temp.toFixed(0) == "-0"
						? "0\xB0 "
						: data.main.temp.toFixed(0) + "\xB0 "}
				</div>

				<div className="w-full flex justify-center gap-3 text-sm sm:text-2xl xl:text-lg">
					<p>
						Low: {data == null ? "" : data.main.temp_min.toFixed(0) + "\xB0"}
					</p>
					<p>
						High: {data == null ? "" : data.main.temp_max.toFixed(0) + "\xB0"}
					</p>
				</div>
			</div>

			<div className="w-full py-4 flex flex-col items-center justify-center font-sm sm:text-2xl xl:text-lg">
				<img
					src={`https://openweathermap.org/img/wn/${
						data == null ? "" : data.weather[0].icon
					}@4x.png`}
					alt="icon"
					className="w-32 sm:w-60 xl:w-40"
				/>
				{data == null ? "" : data.weather[0].description}
			</div>
		</div>
	);
}
