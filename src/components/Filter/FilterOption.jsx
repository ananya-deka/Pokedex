import classes from "./FilterOption.module.css";

const FilterOption = (props) => {
	return <div className={classes.option}>{props.children}</div>;
};

export default FilterOption;
