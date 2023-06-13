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
			console.log(currentAbilities);
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
		<div className={classes.details}>
			<div className={classes.pokemon_info}>
				<header className={classes.header}>
					<h2>{name.toUpperCase()}</h2>
				</header>
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
			</div>
		</div>
	);
};

export default DetailsCard;
