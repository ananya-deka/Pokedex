import AboutContent from "./AboutContent";
import classes from "./DetailsCard.module.css";
import { useState } from "react";
import StatsContent from "./StatsContent";
import MovesContent from "./MovesContent";

const DetailsCard = (props) => {
	const [selectedTab, setSelectedTab] = useState("about");

	const description = props.species.flavor_text_entries
		? props.species.flavor_text_entries.find(
				(text) => text.language.name === "en"
		  ).flavor_text
		: "";

	function handleTabClick(tab) {
		setSelectedTab(tab);
	}

	return (
		<section className={classes.details}>
			<ul className={classes.tabs}>
				<li
					className={`${classes.tab} ${
						selectedTab === "about" ? classes.selected : null
					}`}
					onClick={handleTabClick.bind(null, "about")}
				>
					About
				</li>
				<li
					className={`${classes.tab} ${
						selectedTab === "stats" ? classes.selected : null
					}`}
					onClick={handleTabClick.bind(null, "stats")}
				>
					Base Stats
				</li>
				<li
					className={`${classes.tab} ${
						selectedTab === "moves" ? classes.selected : null
					}`}
					onClick={handleTabClick.bind(null, "moves")}
				>
					Moves
				</li>
			</ul>
			<div className={classes.content}>
				{selectedTab === "about" ? (
					<AboutContent
						description={description}
						height={props.height}
						weight={props.weight}
						abilities={props.abilities}
						experience={props.exp || 0}
					/>
				) : selectedTab === "stats" ? (
					<StatsContent stats={props.stats} />
				) : (
					<MovesContent moves={props.moves} />
				)}
			</div>
		</section>
	);
};

export default DetailsCard;
