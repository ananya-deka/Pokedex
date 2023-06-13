import classes from "./ImageCard.module.css";
import { imageBaseUrl } from "../../api/requests";

const ImageCard = (props) => {
	const id = props.id;
	const name = props.name || "";
	const types = props.types || [];

	return (
		<div className={classes.pokemon}>
			<img
				className={classes.pokemon_img}
				width="200"
				height="100"
				src={`${imageBaseUrl}/${id}.svg`}
				alt={name}
			/>
			<small className={classes.id}>#{id}</small>
			<ul className={classes.types}>
				{types.map((type) => (
					<li className={classes.type} key={type.slot}>
						{type.type.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ImageCard;
