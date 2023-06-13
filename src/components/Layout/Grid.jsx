import classes from "./Grid.module.css";

const Grid = (props) => {
	return <div className={classes.flex}>{props.children}</div>;
};

export default Grid;
