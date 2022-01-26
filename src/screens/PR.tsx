import { useEffect, useState } from 'react';
import {
	Box,
	Container,
	Flex,
	Heading,
	TabList,
	Tabs,
	Tab,
	TabPanels,
	TabPanel,
	Text,
	VStack,
	HStack,
	useColorModeValue,
	Skeleton,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useApi } from '../hooks/useApi';
import { isEmptyArray } from '../util/validators';
import { parsedPullRequests } from '../util/appUtil';
import { PRClosed, PROpen } from '../components/Icons';
import Error from '../screens/Error';

function PR() {
	const bgColor = useColorModeValue('white', 'gray.800');
	const colorIconOpen = useColorModeValue('flatGreen500', 'flatGreen300');
	const colorIconClosed = useColorModeValue('flatRed500', 'flatRed200');
	const { isLoading, isSuccess, isError, data, executeQuery } = useApi();
	const [pullRequests, setPullRequests] = useState<any>([]);
	useEffect(() => {
		executeQuery({ path: 'repos', subpath: 'pulls', params: '?state=all' });
	}, []);

	useEffect(() => {
		if (isSuccess && !isEmptyArray(data)) {
			handlePulls();
		}
	}, [isSuccess, data]);

	const handlePulls = () => {
		const pulls = parsedPullRequests(data);
		setPullRequests(pulls);
	};
	if (!isLoading && isError) {
		return <Error />;
	}
	return (
		<Box as="section" maxW="full">
			<Container maxW="6xl" mx="auto">
				<Heading mb={8}>Requests</Heading>
				<Tabs variant="enclosed" colorScheme="flatRed" isLazy>
					<TabList>
						<Tab>Open</Tab>
						<Tab>Closed</Tab>
					</TabList>
					<TabPanels>
						{pullRequests && !isLoading ? (
							pullRequests?.map((prList: any) => (
								<TabPanel key={prList?.id} display="flex" w="full" flexDirection="column" gap={2}>
									{prList?.pullRequests.map((singlePullRequest: any) => (
										<VStack
											key={singlePullRequest.id}
											alignItems="flex-start"
											bg={bgColor}
											boxShadow="lg"
											rounded="lg"
											px={4}
											py={2}
											border="1px"
											borderColor="flatBlack0"
										>
											<HStack>
												{singlePullRequest.state === 'open' ? (
													<PROpen color={colorIconOpen} />
												) : (
													<PRClosed color={colorIconClosed} />
												)}
												<Text>{singlePullRequest.title}</Text>
											</HStack>
											<HStack>
												<Box as="span">
													<Box as="span">#{singlePullRequest.number}</Box>{' '}
													<Box as="span">
														{singlePullRequest.state === 'open' ? 'opened' : 'closed'}{' '}
														{format(new Date(singlePullRequest.created_at), 'LLL dd, yyyy')}
													</Box>{' '}
													by {singlePullRequest.user}
												</Box>
											</HStack>
										</VStack>
									))}
								</TabPanel>
							))
						) : (
							<VStack gap={4}>
								{Array.from(new Array(6)).map((item, index) => (
									<Skeleton key={index} h={16} w="full">
										<Box />
									</Skeleton>
								))}
							</VStack>
						)}
					</TabPanels>
				</Tabs>
				<Flex
					gap={4}
					justify="space-around"
					flexWrap="wrap"
					direction={{ base: 'column', md: 'row' }}
				>
					{/* {data?.map((branch: BranchesResponseProps) => (
						<Box
							key={branch?.commit?.sha}
							bg="white"
							boxShadow="lg"
							rounded="lg"
							p={4}
							cursor="pointer"
						>
							<Text fontSize="2xl">{branch.name}</Text>
						</Box>
					))} */}
				</Flex>
			</Container>
		</Box>
	);
}

export default PR;
