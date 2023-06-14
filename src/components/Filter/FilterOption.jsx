import classes from "./FilterOption.module.css";

const FilterOption = ({ onClick, children }) => {
	return (
		<div onClick={onClick} className={classes.option}>
			{children}
		</div>
	);
};

export default FilterOption;
