import { BoxProps } from '@chakra-ui/react';
import { CommitsProps } from './responses';

export interface SidebarProps extends BoxProps {
	onClose: () => void;
}

export type FetchProps = {
	path: string;
	method?: string;
	data?: any;
	subpath?: string;
	params?: string | null;
};
export type QueryProps = {
	isLoading: boolean;
	isLoadingPage?: boolean;
	isError: boolean;
	isSuccess: boolean;
	error: any | null;
	data: any | null;
};
export type CleanCommitsProps = {
	id: string;
	commits: CommitsProps[] | unknown;
};
export type ShortedCommitsProps = {
	[key: string]: CommitsProps[] | unknown;
};
