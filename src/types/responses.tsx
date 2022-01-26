type FilesCommitProps = {
	sha: string;
	filename: string;
	status: string;
	additions: number;
	deletions: number;
	changes: number;
	blob_url: string;
	raw_url: string;
	contents_url: string;
	patch: string;
};

type AuthorCommiterProps = {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
};

export type BranchesProps = {
	name: string;
	commit: {
		sha: string;
		url: string;
	};
	protected: boolean;
};

export type CommitsProps = {
	sha: string;
	node_id: string;
	commit: {
		author: {
			name: string;
			email: string;
			date: string;
		};
		committer: {
			name: string;
			email: string;
			date: string;
		};
		message: string;
		tree: {
			sha: string;
			url: string;
		};
		url: string;
		comment_count: number;
		verified: boolean;
		reason: string;
		signature: string;
		payload: string;
	};
	url: string;
	html_url: string;
	comments_url: string;
	author: AuthorCommiterProps;
	committer: AuthorCommiterProps;
	parents: {
		sha: string;
		url: string;
		html_url: string;
	}[];
};
export type CommitProps = {
	stats: {
		total: number;
		additions: number;
		deletions: number;
	};
	files: FilesCommitProps[];
};
type BranchesResponseProps = BranchesProps[] | [];
type CommitsResponseProps = CommitsProps[] | [];
export type CommitResponseProps = CommitsProps & CommitProps;
export type ResponseQuery = BranchesResponseProps | CommitsResponseProps;
