import Grid from "../Layout/Grid";
import { useDetectLastNode } from "../../hooks/useDetectLastNode";
import Spinner from "../UI/Spinner";

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
		<section>
			<Grid>
				{children &&
					children.map((child, index) =>
						children.length === index + 1 ? addRef(child) : child
					)}
				<div>{isLoading && <Spinner />}</div>
			</Grid>
		</section>
	);
};

export default InfiniteList;
