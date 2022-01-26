import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Flex, Heading, Skeleton, Text, useColorModeValue } from '@chakra-ui/react';
import { useApi } from '../hooks/useApi';
import { BranchesProps } from '../types/responses';
import Error from '../screens/Error';

function Branches() {
	const navigate = useNavigate();
	const { isLoading, isError, data, executeQuery } = useApi();
	const bgColor = useColorModeValue('white', 'gray.800');
	useEffect(() => {
		executeQuery({ path: 'repos', subpath: 'branches' });
	}, []);

	const onBranchClicked = (branchName: string) => {
		navigate(`${branchName}`);
	};
	if (!isLoading && isError) {
		return <Error />;
	}
	return (
		<Box as="section" maxW="full">
			<Container maxW="6xl" mx="auto">
				<Heading mb={8}>Branches</Heading>
				<Flex
					gap={4}
					justify="space-around"
					flexWrap="wrap"
					direction={{ base: 'column', md: 'row' }}
				>
					{data && !isLoading
						? data?.map((branch: BranchesProps) => (
								<Box
									key={branch.commit.sha}
									bg={bgColor}
									boxShadow="lg"
									rounded="lg"
									border="1px"
									borderColor="flatBlack0"
									p={4}
									w={{ base: 'full', md: '30%' }}
									cursor="pointer"
									textAlign="center"
									onClick={() => onBranchClicked(branch.name)}
								>
									<Text fontSize="2xl">{branch.name}</Text>
								</Box>
						  ))
						: Array.from(new Array(4)).map((item, index) => (
								<Skeleton key={index} h={16} w={{ base: 'full', md: '30%' }}>
									<Box />
								</Skeleton>
						  ))}
				</Flex>
			</Container>
		</Box>
	);
}

export default Branches;
