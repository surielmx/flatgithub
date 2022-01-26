import { NavLink, useLocation } from 'react-router-dom';
import { Box, CloseButton, Link, Flex, useColorModeValue, VStack } from '@chakra-ui/react';
import { SidebarProps } from '../types/types';
import { Github } from './Icons';

function SidebarContent({ onClose, ...rest }: SidebarProps) {
	const location = useLocation();
	return (
		<Box
			as="aside"
			bg={useColorModeValue('white', 'gray.900')}
			borderRight="1px"
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos="fixed"
			p={4}
			h="full"
			{...rest}
		>
			<Flex alignItems="center" justifyContent="space-between" mb={8}>
				<Link as={NavLink} to="/" cursor="pointer">
					<Github boxSize={10} />
				</Link>
				<CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
			</Flex>
			<VStack gap={2}>
				<Link
					as={(props) => (
						<NavLink
							{...props}
							style={({ isActive }) => {
								return {
									background: location.pathname.includes('branches') ? '#ff6b6b' : '',
									color: location.pathname.includes('branches') ? '#ffffff' : '',
								};
							}}
						/>
					)}
					w="full"
					end
					to="/branches"
					textAlign="center"
					p={4}
					mx={4}
					borderRadius="lg"
					role="group"
					fontWeight="bold"
					cursor="pointer"
					_hover={{
						bg: 'flatRed.400',
						color: 'white',
					}}
					onClick={onClose}
				>
					Branches
				</Link>
				<Link
					as={(props) => (
						<NavLink
							{...props}
							style={({ isActive }) => {
								return {
									background: location.pathname.includes('pr') ? '#ff6b6b' : '',
									color: location.pathname.includes('pr') ? '#ffffff' : '',
								};
							}}
						/>
					)}
					to="/pr"
					w="full"
					textAlign="center"
					p={4}
					mx={4}
					end={false}
					borderRadius="lg"
					role="group"
					fontWeight="bold"
					cursor="pointer"
					_hover={{
						bg: 'flatRed.400',
						color: 'white',
					}}
					onClick={onClose}
				>
					PR
				</Link>
			</VStack>
		</Box>
	);
}

export default SidebarContent;
