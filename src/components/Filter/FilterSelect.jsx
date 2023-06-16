import Select from "../UI/Select";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import requests from "../../api/requests";

const FilterSelect = () => {
	const [options, setOptions] = useState([]);
	const [selectedType, setSelectedType] = useState();
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		async function getTypes() {
			const response = await fetch(requests.getAllTypes);
			const data = await response.json();

			const types = data.results;

			const typeOptions = types.map((type) => ({
				value: type.name,
				label: type.name,
				id: type.url.split("/").at(-2),
			}));

			setOptions(typeOptions);
		}

		getTypes();
	}, []);

	useEffect(() => {
		if (selectedType) {
			navigate(`/filter/types/${selectedType.id}`, {
				replace: params.filterId ? true : false,
			});
		}
	}, [selectedType, navigate, params.filterId]);

	function switchTypes(selectedOption) {
		setSelectedType(selectedOption);
	}

	return (
		<Select
			placeholder={"Filter By Type"}
			onChange={switchTypes}
			options={options}
			value={selectedType}
		/>
	);
};

export default FilterSelect;
