import { useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import InfiniteList from "../components/Browse/InfiniteList";
import useFetch from "../hooks/useFetch";
import FilterCard from "../components/Filter/FilterCard";
import Header from "../components/UI/Header";
import requests from "../api/requests";

const FilterPage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const params = useParams();
	const type = params.filterType;

	const { filters, request } = useLoaderData();

	const {
		allItems: allFilters,
		isLoading,
		hasMore,
	} = useFetch(filters, request, currentPage);

	return (
		<section>
			<Header title={type} />
			<InfiniteList
				setCurrentPage={setCurrentPage}
				isLoading={isLoading}
				hasMore={hasMore}
			>
				{allFilters &&
					allFilters.map((filter) => (
						<div key={filter.name}>
							<FilterCard filter={filter} />
						</div>
					))}
			</InfiniteList>
		</section>
	);
};

export async function loader({ params }) {
	const filterType = params.filterType;

	if (
		filterType !== "abilities" &&
		filterType !== "forms" &&
		filterType !== "species" &&
		filterType !== "types"
	) {
		throw new Error("Invalid path");
	}

	const request =
		filterType === "abilities"
			? requests.getAllAbilities
			: filterType === "forms"
			? requests.getAllForms
			: filterType === "species"
			? requests.getAllSpecies
			: requests.getAllTypes;

	const response = await fetch(request);
	const data = await response.json();
	const filters = data.results;

	return { filters, request };
}

export default FilterPage;
