import Grid from "../Layout/Grid";
import { useDetectLastNode } from "../../hooks/useDetectLastNode";
import Header from "../UI/Header";

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
		<section>
			<Header title={title} />
			<Grid>
				{children.map((child, index) =>
					children.length === index + 1 ? addRef(child) : child
				)}
			</Grid>
		</section>
	);
};

export default InfiniteList;
