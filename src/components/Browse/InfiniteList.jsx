import Grid from "../Layout/Grid";
import { useDetectLastNode } from "../../hooks/useDetectLastNode";

const InfiniteList = ({ isLoading, hasMore, setCurrentPage, children }) => {
	const { lastNodeObserver } = useDetectLastNode(
		isLoading,
		hasMore,
		setCurrentPage
	);

	function addRef(child) {
		return { ...child, ref: lastNodeObserver };
	}

	return (
		<Grid>
			{children.map((child, index) =>
				children.length === index + 1 ? addRef(child) : child
			)}
		</Grid>
	);
};

export default InfiniteList;
