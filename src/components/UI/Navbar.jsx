import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
import pokemonLogo from "../../assets/pokemon-logo-png-1447.png";

const Navbar = () => {
	return (
		<nav className={classes.navbar}>
			<div className={classes.logo}>
				<Link to={"/"}>
					<img src={pokemonLogo} width={50} height={50} />
				</Link>
			</div>
			<ul className={classes.navbar__options}>
				<li className={classes.navbar__option}>
					<Link to={"/"}>Home</Link>
				</li>
				<li className={classes.navbar__option}>
					<Link to={"/bookmarks"}>Bookmarks</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
