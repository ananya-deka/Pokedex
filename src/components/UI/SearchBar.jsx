import classes from "./SearchBar.module.css";
import { forwardRef } from "react";

const SearchBar = forwardRef(function SearchBar(
	{ search, placeholder, disabled },
	ref
) {
	return (
		<form className={classes.searchbar} onSubmit={search}>
			<input
				className={classes.search}
				type="search"
				placeholder={placeholder}
				disabled={disabled}
				ref={ref}
			/>
		</form>
	);
});

export default SearchBar;
