import classes from "./DetailsCard.module.css";
import { useState, useEffect } from "react";

const DetailsCard = (props) => {
	const [abilityDetails, setAblityDetails] = useState([]);
	const [selectedAbility, setSelectedAbility] = useState({});
	const [selectedAbilityDetails, setSelectedAbilityDetails] = useState([]);

	const name = props.name || "";
	const abilities = props.abilities;

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
		<section className={classes.details}>
			<header className={classes.header}>
				<h2>{name.toUpperCase()}</h2>
			</header>
			<section className={classes.abilities}>
				<header className={classes.abilities__header}>Abilities</header>
				<ul className={classes.types}>
					{abilityDetails.map((ability) => (
						<li
							key={ability.id}
							onClick={handleAbilitySelection.bind(null, ability)}
							className={`${classes.type} ${
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
			</section>
			<div>
				<div>
					<span>Height</span>
					{props.height}
				</div>
				<div>
					<span>Weight</span>
					{props.weight}
				</div>
				<div>
					<span>Base Experience</span>
					{props.exp}
				</div>
			</div>
			<div>
				{props.stats &&
					props.stats.map((stat, idx) => (
						<div key={idx}>
							<span>{stat.stat.name}</span>
							<span>{stat.base_stat}</span>
						</div>
					))}
			</div>
		</section>
	);
};

export default DetailsCard;
