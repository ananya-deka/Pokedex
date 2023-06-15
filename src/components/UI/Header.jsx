import classes from "./Header.module.css";

const Header = ({ title }) => {
	return (
		<header className={classes.page__header}>
			<h2>{title}</h2>
		</header>
	);
};

export default Header;
