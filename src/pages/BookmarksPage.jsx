import List from "../components/Browse/List";
import Header from "../components/UI/Header";
import { useBookmarks } from "../contexts/bookmark-context";

const BookmarksPage = () => {
	const { bookmarks } = useBookmarks();
	return (
		<>
			<Header title="My Bookmarks" />
			<List pokemons={Object.values(bookmarks)} />
		</>
	);
};

export default BookmarksPage;
