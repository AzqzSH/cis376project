export type LeaderboardEntryType = {
    id: number;
    email: string;
    score: number;
};

export type LeaderboardType = {
	hasMore: boolean;
	entries: LeaderboardEntryType[];
};