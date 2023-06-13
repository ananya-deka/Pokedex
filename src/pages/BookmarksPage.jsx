import List from "../components/Browse/List";
import { useBookmarks } from "../contexts/bookmark-context";

const BookmarksPage = () => {
	const { bookmarks } = useBookmarks();
	return <List pokemons={Object.values(bookmarks)} />;
};

export default BookmarksPage;
