import { useState } from "react";

interface SearchBarProps {
	searchCity: (city: string) => void;
}

export function SearchBar({ searchCity }: SearchBarProps) {
	const [searchCityValue, setSearchCityValue] = useState("");

	function handleSearchCity() {
		const regex = /^[a-zA-Z ]+(,[a-zA-Z]{2})?$/;
		if (regex.test(searchCityValue)) {
			searchCity(searchCityValue);
		} else {
			alert(`Insert a valid city name like: "New York" or "New York, US"`);
		}
	}

	return (
		<div className="w-full py-4 flex flex-col items-center justify-between text-slate-50 gap-4">
			<div className="flex">
				<input
					type="text"
					value={searchCityValue}
					onChange={(e) => setSearchCityValue(e.target.value)}
					onKeyUp={(e) => {
						if (e.key == "Enter") handleSearchCity();
					}}
					className="w-60 px-4 py-2 rounded outline-none bg-sky-900 bg-opacity-30 placeholder:text-slate-200 sm:w-96 sm:text-lg xl:text-base"
					placeholder="Search city"
				/>
				<button
					className="w-5 h-5 relative right-7 top-2 sm:w-7 sm:h-7 sm:right-9 sm:top-2 xl:w-6 xl:h-6"
					onClick={() => handleSearchCity()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="w-5 h-5 sm:w-7 sm:h-7 xl:w-6 xl:h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
