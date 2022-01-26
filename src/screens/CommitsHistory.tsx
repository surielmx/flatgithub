import { Box, Container, Heading } from '@chakra-ui/react';

function CommitsHistory() {
	return (
		<Box as="section" maxW="full">
			<Container maxW="6xl" mx="auto">
				<Heading mb={8}>Commits</Heading>
			</Container>
		</Box>
	);
}

export default CommitsHistory;
