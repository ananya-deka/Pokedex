import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./FilterCard.module.css";
import { useEffect, useState } from "react";

const FilterCard = ({ filter }) => {
	const [info, setInfo] = useState({});
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		async function getInfo(url) {
			const response = await fetch(url);
			const data = await response.json();

			setInfo(data);
		}

		if (filter.url) {
			getInfo(filter.url);
		}
	}, [filter]);

	async function showPokemon() {
		navigate(`/filter/${params.filterType}/${info.id}`);
	}

	return (
		<Card showDetails={showPokemon}>
			<div className={classes.filter_card}>
				<header>
					<h2>{info.name && info.name.toUpperCase()}</h2>
				</header>
			</div>
		</Card>
	);
};

export default FilterCard;
