import classes from "./FilterOptions.module.css";
import FilterOption from "./FilterOption";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import requests from "../../api/requests";
import { useEffect, useState } from "react";

const FilterOptions = () => {
	const [request, setRequest] = useState("");
	const [dest, setDest] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const { allItems: allFilters, isLoading } = useFetch(
		null,
		request,
		currentPage
	);
	const navigate = useNavigate();

	useEffect(() => {
		if (
			currentPage === 1 &&
			request &&
			!isLoading &&
			allFilters.length > 0
		) {
			navigate(`/filter/${dest}`, {
				state: {
					filters: allFilters,
					request: request,
				},
			});
		}
	}, [currentPage, request, navigate, dest, isLoading, allFilters]);

	function handleNavigation(dest) {
		setCurrentPage(1);
		setRequest(
			dest === "abilities"
				? requests.getAllAbilities
				: dest === "forms"
				? requests.getAllForms
				: dest === "types"
				? requests.getAllTypes
				: requests.getAllSpecies
		);
		setDest(dest);
	}

	return (
		<section className={classes.filters}>
			<FilterOption onClick={handleNavigation.bind(null, "abilities")}>
				Abilities
			</FilterOption>
			<FilterOption onClick={handleNavigation.bind(null, "forms")}>
				Forms
			</FilterOption>
			<FilterOption onClick={handleNavigation.bind(null, "species")}>
				Species
			</FilterOption>
			<FilterOption onClick={handleNavigation.bind(null, "types")}>
				Types
			</FilterOption>
		</section>
	);
};

export default FilterOptions;
