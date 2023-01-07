type WeatherDetailsType = {
	title: string;
	value: string;
};

export function WeatherDetails({ title, value }: WeatherDetailsType) {
	return (
		<div className="py-3 px-5 h-24 flex flex-col gap-2 bg-sky-900 rounded bg-opacity-20 text-white">
			<div className="text-sm text-slate-200 sm:text-lg xl:text-base">
				{title}
			</div>
			<div className="text-center text-lg font-medium sm:text-2xl xl:text-xl">
				{value}
			</div>
		</div>
	);
}
