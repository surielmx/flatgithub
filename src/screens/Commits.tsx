import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
	Avatar,
	Badge,
	Box,
	Container,
	Flex,
	Heading,
	HStack,
	Stack,
	Tag,
	TagLabel,
	Text,
	Skeleton,
	VStack,
	useColorModeValue,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useApi } from '../hooks/useApi';
import { isEmptyArray } from '../util/validators';
import { parsedCommits } from '../util/appUtil';
import { CleanCommitsProps } from '../types/types';
import Error from '../screens/Error';

function Commits() {
	const location = useLocation();
	const navigate = useNavigate();
	const { branchName } = useParams();
	const { isLoading, isSuccess, isError, data, executeQuery } = useApi();
	const [mainCommits, setMainCommits] = useState<CleanCommitsProps[]>([]);
	const bgColor = useColorModeValue('white', 'gray.800');

	useEffect(() => {
		executeQuery({ path: 'repos', subpath: 'commits', params: `?sha=${branchName}` });
	}, []);

	useEffect(() => {
		const handleCommits = () => {
			const commits = parsedCommits(data);
			setMainCommits(commits);
		};
		if (isSuccess && !isEmptyArray(data)) {
			handleCommits();
		}
	}, [isSuccess, data]);

	const onCommitDetail = (commitSha: string) => {
		navigate(`${location.pathname}/${commitSha}`);
	};

	if (!isLoading && isError) {
		return <Error />;
	}

	return (
		<Box as="section" maxW="full">
			<Container maxW="6xl" mx="auto">
				<Heading mb={8}>Commits {branchName}</Heading>
				<Flex
					gap={4}
					justify="space-around"
					flexWrap="wrap"
					direction={{ base: 'column', md: 'row' }}
				>
					{mainCommits?.map((commitsList: any) => (
						<Stack key={commitsList.id} w="full">
							<Heading as="h6" variant="h6">
								Commits on {format(new Date(commitsList.commitDate), 'LLL dd, yyyy')}
							</Heading>
							{commitsList && !isLoading ? (
								commitsList?.commits?.map((commit: any) => (
									<HStack
										key={commit.sha}
										rounded="lg"
										bg={bgColor}
										border="1px"
										borderColor="flatBlack0"
										p={4}
										gap={0}
										w="full"
										justifyContent="space-between"
									>
										<VStack>
											<Text fontSize="md" fontWeight="bold" mb={0}>
												{commit.commit.message}
											</Text>
											<HStack alignItems="center" alignSelf="flex-start">
												<Avatar
													name={commit.author.login}
													src={commit.author.avatar_url}
													size="xs"
												/>
												<Text fontSize="md" m={0} wordBreak="break-all">
													{commit.author.login}
												</Text>
											</HStack>
										</VStack>
										<HStack>
											{commit.commit.verification.verified ? (
												<Tag size="md" rounded="lg" variant="solid" colorScheme="green">
													<TagLabel>{commit.commit.verification.verified && 'Verfied'}</TagLabel>
												</Tag>
											) : null}
											<Badge
												p={1}
												cursor="pointer"
												rounded="lg"
												variant="outline"
												colorScheme="flatRed"
												onClick={() => onCommitDetail(commit.sha)}
											>
												{String(commit.sha).substring(0, 7)}
											</Badge>
										</HStack>
									</HStack>
								))
							) : (
								<VStack gap={4}>
									{Array.from(new Array(2)).map((item, index) => (
										<Skeleton key={index} h={16} w="full">
											<Box />
										</Skeleton>
									))}
								</VStack>
							)}
						</Stack>
					))}
				</Flex>
			</Container>
		</Box>
	);
}

export default Commits;
