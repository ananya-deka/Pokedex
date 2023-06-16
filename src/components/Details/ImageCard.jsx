import classes from "./ImageCard.module.css";
import { imageBaseUrl } from "../../api/requests";
import bookmarkLogo from "../../assets/bookmark.svg";
import filledBookmarkLogo from "../../assets/bookmark-filled.svg";
import { useBookmarks } from "../../contexts/bookmark-context";
import Skeleton from "../UI/Skeleton";
import fallbackImg from "../../assets/pokeball.png";
import { useNavigate } from "react-router-dom";

const ImageCard = (props) => {
	const navigate = useNavigate();
	const id = props.id;
	const name = props.name || "";
	const types = props.types || [];
	const { bookmarks } = useBookmarks();

	function handleFallback(e) {
		e.target.src = fallbackImg;
	}

	function handleTypeNavigation(type) {
		const id = type.type.url.split("/").at(-2);
		navigate(`/filter/types/${id}`);
	}

	return (
		<section className={classes.image_card}>
			{id && name && types ? (
				<>
					<div className={classes.logo_wrapper}>
						<div
							className={classes.logo}
							onClick={props.addToBookmark}
						>
							<img
								loading="lazy"
								src={
									bookmarks[id]
										? filledBookmarkLogo
										: bookmarkLogo
								}
								height={40}
								width={40}
							/>
						</div>
					</div>

					<div className={classes.info}>
						<p className={classes.name}>{name}</p>
						<small className={classes.id}>#{id}</small>
					</div>

					<ul className={classes.types}>
						{types.map((type) => (
							<li
								className={classes.type}
								key={type.slot}
								onClick={handleTypeNavigation.bind(null, type)}
							>
								{type.type.name}
							</li>
						))}
					</ul>

					<div className={classes.pokemon}>
						<div
							className={classes.img_wrapper}
							style={
								props.color
									? {
											backgroundImage: `radial-gradient(transparent, transparent, ${props.color.name})`,
									  }
									: {}
							}
						>
							<img
								className={classes.pokemon_img}
								width="200"
								height="200"
								src={`${imageBaseUrl}/${name}.png`}
								onError={handleFallback}
								alt={name}
							/>
						</div>
					</div>
				</>
			) : (
				<Skeleton />
			)}
		</section>
	);
};

export default ImageCard;
