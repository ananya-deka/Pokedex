import classes from "./InfiniteList.module.css";
import Grid from "../Layout/Grid";
import { useDetectLastNode } from "../../hooks/useDetectLastNode";

const InfiniteList = ({
	title,
	isLoading,
	hasMore,
	setCurrentPage,
	children,
}) => {
	const { lastNodeObserver } = useDetectLastNode(
		isLoading,
		hasMore,
		setCurrentPage
	);

	function addRef(child) {
		return { ...child, ref: lastNodeObserver };
	}

	return (
		<section className={classes.page}>
			<header className={classes.page__header}>
				<h2>{title && title.toUpperCase()}</h2>
			</header>
			<Grid>
				{children.map((child, index) =>
					children.length === index + 1 ? addRef(child) : child
				)}
			</Grid>
		</section>
	);
};

export default InfiniteList;
