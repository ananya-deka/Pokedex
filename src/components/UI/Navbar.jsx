import classes from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import pokemonLogo from "../../assets/pokemon-icon.png";

const Navbar = () => {
	const location = useLocation();
	const currentPage =
		location.pathname === "/"
			? "home"
			: location.pathname === "/bookmarks"
			? "bookmarks"
			: "";

	return (
		<nav className={classes.navbar}>
			<div className={classes.logo}>
				<Link className={classes.link} to={"/"}>
					<img src={pokemonLogo} width={50} height={50} />
				</Link>
			</div>
			<ul className={classes.navbar__options}>
				<li
					className={`${classes.navbar__option} ${
						currentPage === "home" ? classes.selected : null
					}`}
				>
					<Link className={classes.link} to={"/"}>
						Home
					</Link>
				</li>
				<li
					className={`${classes.navbar__option} ${
						currentPage === "bookmarks" ? classes.selected : null
					}`}
				>
					<Link className={classes.link} to={"/bookmarks"}>
						Bookmarks
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
