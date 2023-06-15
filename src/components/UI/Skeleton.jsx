import classes from "./Skeleton.module.css";

const Skeleton = ({ text }) => {
	return (
		<div
			className={classes.skeleton}
			style={text ? { height: `${1}rem` } : {}}
		></div>
	);
};

export default Skeleton;
