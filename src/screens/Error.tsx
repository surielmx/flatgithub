import { Box, Button, Center, Container, Heading, VStack } from '@chakra-ui/react';

function Error() {
	return (
		<Box as="section" maxW="full">
			<Container maxW="6xl" mx="auto" h="85vh">
				<Center h="inherit">
					<VStack>
						<Heading mb={8}>¡Ups! Error</Heading>
						<Button
							size="lg"
							colorScheme="flatRed"
							variant="solid"
							onClick={() => window.location.reload()}
						>
							Try again
						</Button>
					</VStack>
				</Center>
			</Container>
		</Box>
	);
}

export default Error;
