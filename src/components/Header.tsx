import { Link as RouteLink } from 'react-router-dom';
import {
	Avatar,
	Box,
	Container,
	Flex,
	IconButton,
	Link,
	useBoolean,
	useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Github, Moon, Sun } from './Icons';

function Header({ onOpen }: { onOpen: () => void }) {
	const [flag, setFlag] = useBoolean(localStorage.getItem('chakra-ui-color-mode') !== 'light');
	const { toggleColorMode } = useColorMode();
	return (
		<Box as="header" maxW="full" py={4} pl={{ base: 'initial', md: 60 }}>
			<Container maxW="6xl" mx="auto">
				<Flex justifyContent={{ base: 'space-between', md: 'flex-end' }}>
					<IconButton
						display={{ base: 'flex', md: 'none' }}
						onClick={onOpen}
						variant="outline"
						aria-label="open menu"
						icon={<HamburgerIcon />}
					/>
					<Link as={RouteLink} to="/" cursor="pointer">
						<Github boxSize={10} display={{ base: 'flex', md: 'none' }} />
					</Link>
					<Flex alignItems="center">
						<Box
							mx={8}
							onClick={() => {
								toggleColorMode();
								setFlag.toggle();
							}}
						>
							{flag ? (
								<Moon boxSize={8} color="bncBlack0" cursor="pointer" />
							) : (
								<Sun boxSize={8} color="bncBlack500" cursor="pointer" />
							)}
						</Box>
						<Avatar
							size={'sm'}
							src={
								'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
							}
						/>
					</Flex>
				</Flex>
			</Container>
		</Box>
	);
}

export default Header;
