import { Route, Routes } from 'react-router-dom';
import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import Commits from './screens/Commits';
import Branches from './screens/Branches';
import PR from './screens/PR';
import CommitDetail from './screens/CommitDetail';
import SidebarContent from './components/SidebarContent';
import Header from './components/Header';

function App() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			<Header onOpen={onOpen} />
			<Box as="main" h="inherit" pl={{ base: 'initial', md: 60 }} py={{ base: 4, sm: 6, md: 8 }}>
				<Routes>
					<Route path="/">
						<Route path="branches" element={<Branches />} />
						<Route path="branches/:branchName" element={<Commits />} />
						<Route path="branches/:branchName/:sha" element={<CommitDetail />} />
					</Route>
					<Route path="/pr" element={<PR />} />
				</Routes>
			</Box>
		</>
	);
}

export default App;
