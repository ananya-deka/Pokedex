import { useCallback } from "react";
import { useRef } from "react";

export const useDetectLastNode = (isLoading, hasMore, setCurrentPage) => {
	const observer = useRef();

	const lastNodeObserver = useCallback(
		(node) => {
			if (isLoading || !hasMore) {
				return;
			}

			if (observer.current) {
				observer.current.disconnect();
			}

			observer.current = new IntersectionObserver((items) => {
				if (items[0].isIntersecting) {
					setCurrentPage((current) => current + 1);
				}
			});

			if (node) {
				observer.current.observe(node);
			}
		},
		[isLoading, hasMore, observer, setCurrentPage]
	);

	return { lastNodeObserver };
};
