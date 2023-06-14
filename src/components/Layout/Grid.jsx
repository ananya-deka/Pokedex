import classes from "./Grid.module.css";

const Grid = (props) => {
	return (
		<div
			className={`${
				props.display === "flex" ? classes.flex : classes.grid
			}`}
		>
			{props.children}
		</div>
	);
};

export default Grid;
