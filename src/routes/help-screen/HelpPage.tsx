import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';

const helpTitleText = 'Game Information';
const helpIntroParagraph =
	'\tWelcome to Explore Campus! This game is designed to encourage the exploration of the wonderful University of Michigan Dearborn. The premise of the game is simple: go to different places on campus, unlock awards and get achievements!';
const helpStarterParagraph =
	'\tTo start enable locations permissions for this app. When you reach reward locations, you will automatically recieve awards. When the right combinations of locations are found, you will then unlock an achievement!';
const navigationTitleText = 'Navigation';
const helpNavigationBasicsParagraph = `\tMost navigation for Explore Campus is done using the bottom bar. There you will see four icons. The first, the podium, takes you too the leaderboards where you can see your ranking compared to other players. The next, the map, takes  you to a map of campus where you can see some locations to be discovered and what locations you\'ve already been too. The next, the house, takes you to another screen where you can easily see what locations you\'ve found. Clicking on one of these locations will take you to another page where you can view more information about that specific location and, if applicable, when you found it.`;
const helpNavigationAchievementsParagraph = `\tThe final icon on the navigation bar, the trophy, will take you to the achivements page. This will show you a list of all possible achievements. The achivements you\'ve unlocked will appear in red, while the rest will appear in gray. Clicking on one fo these achievements will show you more information about the conditions needed to unlock the achievement, and, if applicable, when it was unlocked.`;
const helpNavigationSettingsParagraph = `\tYou will also notice in the upper right corner of most pages of the app a question mark icon and a gear icon. The question mark takes you to this page, the help page, where you can find useful information on how the app works. The gear icon takes you to settings where you can update your username and password.`;
const locationsTitleText = 'Locations';
const helpLocationsInfoParagraph = `\tLocations can be unlocked by walking around campus to different buildings, rooms, and locations. Many locations are listed on the locations page. Others are hidden, and will only be revealed when you find them.`;

const achievementsTitleText = 'Achivements';
const helpAchivementsInfoParagraph = `\tAchivements can be earned by finding specific combinations of locations, or traveling to different locations at different times. Similar to locations, some achievements list what you need to do to get them, while others are mysteries that you will only uncover once you meet their conditions.`;

export function HelpPage() {
	return (
		<ScrollView contentContainerStyle={styles.viewSettings}>
			<Text style={styles.baseText}>
				<Text style={styles.titleText}>
					{helpTitleText}
					{'\n'}
				</Text>

				<Text>
					{helpIntroParagraph}
					{'\n'}
					{helpStarterParagraph}
					{'\n'}
				</Text>

				<Text style={styles.subTitleText}>
					{'\n'}
					{navigationTitleText}
					{'\n'}
				</Text>

				<Text>
					{helpNavigationBasicsParagraph}
					{'\n'}

					{helpNavigationAchievementsParagraph}
					{'\n'}

					{helpNavigationSettingsParagraph}
					{'\n'}
				</Text>

				<Text style={styles.subTitleText}>
					{'\n'}
					{locationsTitleText}
					{'\n'}
				</Text>

				<Text>
					{helpLocationsInfoParagraph}
					{'\n'}
				</Text>

				<Text style={styles.subTitleText}>
					{'\n'}
					{achievementsTitleText}
					{'\n'}
				</Text>

				<Text>
					{helpAchivementsInfoParagraph}
					{'\n'}
				</Text>
			</Text>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	baseText: {
		fontSize: 15,
	},
	titleText: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	subTitleText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	viewSettings: {
		paddingTop: 30,
	},
});

export default HelpPage;
