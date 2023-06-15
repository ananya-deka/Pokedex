import Skeleton from "../UI/Skeleton";
import classes from "./AboutContent.module.css";
import { useEffect, useState } from "react";

const AboutContent = ({
	description,
	height,
	weight,
	abilities,
	experience,
}) => {
	const [abilityDetails, setAblityDetails] = useState([]);
	const [selectedAbility, setSelectedAbility] = useState({});
	const [selectedAbilityDetails, setSelectedAbilityDetails] = useState([]);

	useEffect(() => {
		async function getAbilities() {
			const currentAbilities = [];
			for (let i = 0; i < abilities.length; i++) {
				const response = await fetch(abilities[i].ability.url);
				const abilityDetails = await response.json();
				currentAbilities.push(abilityDetails);
			}
			setAblityDetails(currentAbilities);
		}

		if (abilities) {
			getAbilities();
		}
	}, [abilities]);

	useEffect(() => {
		if (abilityDetails.length > 0) {
			setSelectedAbilityDetails(abilityDetails[0].effect_entries);
			setSelectedAbility(abilityDetails[0]);
		}
	}, [abilityDetails]);

	function handleAbilitySelection(ability) {
		setSelectedAbility(ability);
		setSelectedAbilityDetails(ability.effect_entries);
	}

	return (
		<div className={classes.about}>
			{description ? (
				<p className={classes.description}>
					{description.replace("\f", " ")}
				</p>
			) : (
				<Skeleton text={true} />
			)}

			<ul className={`${classes.list} ${classes.measurements}`}>
				{height && weight && experience >= 0 ? (
					<>
						<li className={classes.list__item}>
							<p>Height</p>
							<p>{(height / 10).toFixed(1)}m</p>
						</li>
						<li className={classes.list__item}>
							<p>Weight</p>
							<p>{(weight / 10).toFixed(1)}kg</p>
						</li>
						<li className={classes.list__item}>
							<p>Base Experience</p>
							<p>{experience}</p>
						</li>
					</>
				) : (
					<Skeleton />
				)}
			</ul>

			<section className={classes.abilities}>
				<header className={classes.abilities__header}>Abilities</header>
				<div className={classes.abilities__info}>
					<ul className={classes.list}>
						{abilityDetails.map((ability) => (
							<li
								key={ability.id}
								onClick={handleAbilitySelection.bind(
									null,
									ability
								)}
								className={`${classes.ability} ${
									selectedAbility.id === ability.id
										? classes.selected
										: null
								}`}
							>
								{ability.name}
							</li>
						))}
					</ul>
					<div className={classes.ability_details}>
						{selectedAbilityDetails.length > 0 &&
							selectedAbilityDetails.find(
								(detail) => detail.language.name === "en"
							).effect}
					</div>
				</div>
			</section>
		</div>
	);
};

export default AboutContent;
