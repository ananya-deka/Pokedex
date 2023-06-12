import { Input, Container } from "@chakra-ui/react";

const SearchPage = () => {
	return (
		<Container mt={10}>
			<Input
				type="search"
				placeholder="Search for your favourite pokemon"
			/>
		</Container>
	);
};

export default SearchPage;
