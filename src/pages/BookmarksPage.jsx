import List from "../components/Browse/List";
import Header from "../components/UI/Header";
import { useBookmarks } from "../contexts/bookmark-context";

const BookmarksPage = () => {
	const { bookmarks } = useBookmarks();
	return (
		<>
			<Header title="My Bookmarks" />
			<div style={{ marginBottom: `${2}rem` }}></div>
			<List pokemons={Object.values(bookmarks)} />
			{!bookmarks ||
				(Object.values(bookmarks).length === 0 && (
					<p style={{ color: "grey" }}>
						You have not added anything here yet.
					</p>
				))}
		</>
	);
};

export default BookmarksPage;
