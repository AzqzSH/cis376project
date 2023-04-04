import { LeaderboardEntryType, useLeaderboard } from "@/api/leaderboard";
import { useAuth } from "@/context/AuthProvider";
import { ThemeColors } from "@/lib/theme";
import LoadingOverlay from "@/shared-components/loading-overlay/LoadingOverlay";
import { StatusBar } from "expo-status-bar";
import React, { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Avatar, Divider, Text, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomTabScreenProps } from "../BottomTabNavigator";

interface LeaderboardScreenProps extends BottomTabScreenProps<"Leaderboard"> {}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
	navigation,
}) => {
	const [limit, setLimit] = React.useState(50);
	const [offset, setOffset] = React.useState(0);

	const { data, isLoading } = useLeaderboard(limit, offset);

	return (
		<SafeAreaView style={styles.container}>
			{isLoading && <LoadingOverlay visible />}
			<StatusBar style="light" />
			<View style={styles.header}>
				<Title style={styles.headerTitle}>Leaderboard</Title>
			</View>

			<View style={styles.content}>
				<FlatList
					data={data?.entries}
					renderItem={({ item }) => (
						<LeaderboardListEntry
							entry={item}
							idx={data?.entries.indexOf(item) || 0}
						/>
					)}
					keyExtractor={(item) => item.id + ""}
					ItemSeparatorComponent={() => (
						<Divider
							style={{
								marginHorizontal: 20,
								backgroundColor: ThemeColors.primary,
							}}
						/>
					)}
					onEndReachedThreshold={0.5}
					onEndReached={() => {
						if (data?.hasMore) {

							setOffset(offset + limit);
							setLimit(limit + 3);
						}
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

function LeaderboardListEntry({
	entry,
	idx,
}: {
	entry: LeaderboardEntryType;
	idx: number;
}) {
	const {user} = useAuth()

	const username = useMemo(() => {
		const [email, domain] = entry.email.split("@");
		return email;
	}, [entry.email]);

	const backgroundColor = useMemo(() => {
		switch (idx) {
			case 0:
				return ThemeColors.secondary;
			case 1:
				return "#C0C0C0";
			case 2:
				return "#CD7F32";
			default:
				return ThemeColors.primary;
		}
	}, [idx]);

	return (
		<View
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				paddingHorizontal: 20,
				paddingVertical: 10,
				opacity: entry.email === user?.email ? 0.5 : 1,
			}}
		>
			

			<View
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<Text
					style={{
						fontSize: 16,
						color: ThemeColors.primary,
						marginRight: 16,
					}}
				>
					{idx + 1}
				</Text>

				<Avatar.Text
					style={{
						marginRight: 16,
						backgroundColor,
					}}
					labelStyle={{
						color: "white",
					}}
					size={32}
					label={`${username.toUpperCase()[0]}${username.toUpperCase()[1]}`}
				/>

				<Text
					style={{
						fontSize: 16,
						fontWeight: "bold",
						color: ThemeColors.primary,
					}}
				>
					{username} {entry.email === user?.email && "(you)"}
				</Text>
			</View>

			<View
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<View
					style={{
						display: "flex",
						backgroundColor: ThemeColors.primary,
						alignItems: "center",
						justifyContent: "center",
						width: 64,
						paddingVertical: 5,
						borderRadius: 20,
					}}
				>
					<Text
						style={{
							fontSize: 12,
							fontWeight: "bold",
							color: "white",
						}}
					>
						{entry.score}
					</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: ThemeColors.primary,
	},
	header: {
		alignItems: "center",
		paddingHorizontal: 20,
		backgroundColor: ThemeColors.primary,
		display: "flex",
		flexDirection: "row",
		paddingBottom: 20,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: ThemeColors.secondary,
	},
	content: {
		height: "100%",
		backgroundColor: "white",
	},
});
