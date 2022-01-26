import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Container,
	Heading,
} from '@chakra-ui/react';
import DOMPurify from 'dompurify';
import { useApi } from '../hooks/useApi';
import { isEmptyObject } from '../util/validators';
import { parsedCommit } from '../util/appUtil';
import Error from '../screens/Error';

function CommitDetail() {
	const { sha } = useParams();
	const { isLoading, isSuccess, isError, data, executeQuery } = useApi();
	const [commitDetail, setCommitDetail] = useState<any>();

	useEffect(() => {
		executeQuery({ path: 'repos', subpath: 'commits', params: `/${sha}` });
	}, []);

	useEffect(() => {
		if (isSuccess && !isEmptyObject(data)) {
			handleCommits();
		}
	}, [isSuccess, data]);

	const handleCommits = () => {
		const commit = parsedCommit(data);
		setCommitDetail(commit);
	};

	if (!isLoading && isError) {
		return <Error />;
	}

	return (
		<Box as="section" maxW="full">
			<Container maxW="6xl" mx="auto">
				<Heading mb={8}>Commit detail</Heading>
				<Accordion allowToggle>
					{commitDetail?.files.map((file: any) => {
						const sanitizedData = () => ({
							__html: DOMPurify.sanitize(file.patch),
						});
						return (
							<AccordionItem key={file.sha}>
								<AccordionButton>
									<Heading as="h6" variant="h6" flex="1" textAlign="left">
										{file.filename}
									</Heading>
									<AccordionIcon />
								</AccordionButton>
								<AccordionPanel>
									<Box key={file.sha} dangerouslySetInnerHTML={sanitizedData()} />
								</AccordionPanel>
							</AccordionItem>
						);
					})}
				</Accordion>
			</Container>
		</Box>
	);
}

export default CommitDetail;
