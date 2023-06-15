import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import InfiniteList from "../components/Browse/InfiniteList";
import useFetch from "../hooks/useFetch";
import FilterCard from "../components/Filter/FilterCard";
import Header from "../components/UI/Header";

const FilterPage = () => {
	const location = useLocation();
	const [currentPage, setCurrentPage] = useState(1);
	const params = useParams();
	const type = params.filterType;
	const { filters } = location.state || [];
	const { request } = location.state || "";
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
						<div key={filter.id}>
							<FilterCard filter={filter} />
						</div>
					))}
			</InfiniteList>
		</section>
	);
};

export default FilterPage;
