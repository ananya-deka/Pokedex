import classes from "./Card.module.css";

const Card = ({ children, showDetails }) => {
	return (
		<section onClick={showDetails} className={classes.card}>
			{children}
		</section>
	);
};

export default Card;
