import { CommitResponseProps, CommitsProps } from '../types/responses';
import { CleanCommitsProps, ShortedCommitsProps } from '../types/types';

const getShortedCommits = (commits: CommitsProps[]) => {
	return commits.reduce((acc, comm) => {
		const dateKey: string = comm?.commit?.author?.date.split('T')[0];
		const keyCommit = acc[dateKey as keyof typeof acc];
		const value = keyCommit ? [...keyCommit, comm] : [comm];
		(acc as any)[dateKey] = value;
		return acc;
	}, {});
};

const getCleanedCommits = (shortedCommits: ShortedCommitsProps) => {
	return Object.values(shortedCommits).map((commit, index) => ({
		id: Math.random().toString(36).slice(2),
		commitDate: Object.keys(shortedCommits)[index],
		commits: commit,
	}));
};
const getCleanedPulls = (shortedPullRequest: any) => {
	return Object.values(shortedPullRequest).map((pullRequest, index) => ({
		id: Math.random().toString(36).slice(2),
		state: Object.keys(shortedPullRequest)[index],
		pullRequests: pullRequest,
	}));
};
const handleSinglePatch = (singlePatch: string) => {
	if (singlePatch.startsWith('+')) {
		return `<p style='font-size:1rem; background:#99dfd7; color:#202028;'>${singlePatch}</p>`;
	}
	if (singlePatch.startsWith('-')) {
		return `<p style='font-size:1rem; background:#ffbdbd; color:#202028;'>${singlePatch}</p>`;
	}
	return `<p>${singlePatch}</p>`;
};
const handleCleandedPullRequest = (acc: any, current: any) => {
	acc[current.state] = acc[current.state] ? [...acc[current.state], current] : [current];
	return acc;
};
export const parsedCommits = (commits: CommitsProps[]): CleanCommitsProps[] => {
	const shortedCommits = getShortedCommits(commits);
	const cleanedCommits = getCleanedCommits(shortedCommits);
	return cleanedCommits;
};
export const parsedCommit = (data: CommitResponseProps) => {
	const patchSplited = data.files.map(({ patch }: { patch: string }) => patch.split('\n'));
	const parsedPatch = patchSplited.map((mainPatch: string[], index: number) => ({
		...data.files[index],
		patch: mainPatch.map(handleSinglePatch).join('\n'),
	}));

	return {
		...data,
		files: parsedPatch,
	};
};

export const parsedPullRequests = (pulls: any) => {
	const pullRequest = pulls.map((pull: any) => {
		return {
			id: pull.node_id,
			title: pull.title,
			state: pull.state,
			created_at: pull.created_at,
			number: pull.number,
			user: pull.user.login,
		};
	});

	const shortedPullRequest = pullRequest.reduce(handleCleandedPullRequest, {});
	const cleanedPullRequest = getCleanedPulls(shortedPullRequest);
	const shortByStatePulls = cleanedPullRequest.sort((a: any, b: any) => {
		if (a.state > b.state) return -1;
		return 0;
	});
	return shortByStatePulls;
};
