export interface Weather {
	name: string;
	timezone: number;
	visibility: number;
	main: {
		temp: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
		feels_like: number;
	};
	wind: {
		speed: string;
	};
	sys: {
		country: string;
		sunrise: number;
		sunset: number;
	};
	weather: {
		icon: string;
		description: string;
	}[];
}

export interface Forecast {
	list: {
		dt: number;
		main: {
			temp: number;
		};
		weather: [
			{
				icon: string;
			}
		];
	}[];
}

export interface WeatherDetailsData {
	detail: {
		title: string;
		value: string;
	}[];
}
