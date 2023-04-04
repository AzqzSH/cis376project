import { api } from "@/lib/api";
import { useQuery } from "react-query";
import { LeaderboardType } from "./types";

export const getLeaderboard = async (
	limit: number = 10,
	offset: number = 0
): Promise<LeaderboardType> => {
	const { data } = await api.get<LeaderboardType>(
		`/leaderboard?limit=${limit}&offset=${offset}`
	);

	


	return data;
};

export const useLeaderboard = (limit: number = 10, offset: number = 0) =>
	useQuery(
		["leaderboard", limit, offset],
		() => getLeaderboard(limit, offset),
		{ keepPreviousData: true }
	);
