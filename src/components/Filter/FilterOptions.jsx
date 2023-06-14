import classes from "./FilterOptions.module.css";
import FilterOption from "./FilterOption";

const FilterOptions = () => {
	return (
		<section className={classes.filters}>
			<FilterOption>Abilities</FilterOption>
			<FilterOption>Forms</FilterOption>
			<FilterOption>Species</FilterOption>
		</section>
	);
};

export default FilterOptions;
