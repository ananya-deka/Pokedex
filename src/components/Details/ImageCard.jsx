import classes from "./ImageCard.module.css";
import { imageBaseUrl } from "../../api/requests";
import bookmarkLogo from "../../assets/bookmark.svg";
import filledBookmarkLogo from "../../assets/bookmark-filled.svg";
import { useBookmarks } from "../../contexts/bookmark-context";

const ImageCard = (props) => {
	const id = props.id;
	const name = props.name || "";
	const types = props.types || [];
	const { bookmarks } = useBookmarks();

	return (
		<section className={classes.image_card}>
			<div className={classes.logo_wrapper} onClick={props.addToBookmark}>
				<img
					src={bookmarks[id] ? filledBookmarkLogo : bookmarkLogo}
					height={40}
					width={40}
				/>
			</div>
			<div className={classes.info}>
				<p className={classes.name}>
					{props.name && props.name.toUpperCase()}
				</p>
				<p className={classes.id}>#{id}</p>
			</div>

			<ul className={classes.types}>
				{types.map((type) => (
					<li className={classes.type} key={type.slot}>
						{type.type.name}
					</li>
				))}
			</ul>

			<div className={classes.pokemon}>
				<img
					className={classes.pokemon_img}
					width="200"
					height="100"
					src={`${imageBaseUrl}/${id}.svg`}
					alt={name}
				/>
			</div>
		</section>
	);
};

export default ImageCard;
