import Select from "react-select";
import classes from "./Select.module.css";

const customStyles = {
	option: (defaultStyles, state) => ({
		...defaultStyles,
		color: "#fff",
		backgroundColor:
			state.isSelected || state.isFocused ? "#759FBC" : "#1F5673",
	}),

	control: (defaultStyles) => ({
		...defaultStyles,
		backgroundColor: "#1F5673",
		padding: "10px",
		border: "none",
		color: "#fff",
		boxShadow: "0 2px 5px #333",
	}),
	singleValue: (defaultStyles) => ({
		...defaultStyles,
		color: "whitesmoke",
	}),
	placeholder: (defaultStyles) => {
		return {
			...defaultStyles,
			color: "whitesmoke",
		};
	},
};

const CustomSelect = ({
	onChange,
	options,
	placeholder,
	defaultValue,
	value,
}) => {
	return (
		<div className={classes.select_wrapper}>
			<Select
				placeholder={placeholder}
				onChange={onChange}
				options={options}
				styles={customStyles}
				value={value}
				defaultValue={defaultValue}
			/>
		</div>
	);
};

export default CustomSelect;
