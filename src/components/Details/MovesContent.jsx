import classes from "./MovesContent.module.css";

const MovesContent = ({ moves }) => {
	return (
		<ul className={classes.moves}>
			{moves.map((move) => (
				<li className={classes.move} key={move.move.name}>
					{move.move.name}
				</li>
			))}
		</ul>
	);
};

export default MovesContent;
