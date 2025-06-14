import { images } from "@/constant/images";
import { useNavigation } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";
import { Image, Text, View } from "react-native";

export default function Home() {
	const navigation = useNavigation();
	React.useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			try {
				ScreenOrientation.lockAsync(
					ScreenOrientation.OrientationLock.PORTRAIT_UP
				);
			} catch (error) {
				console.log(error);
			}
		});

		return unsubscribe;
	}, [navigation]);

	return (
		<View className="bg-background h-full w-full px-8 bg-slate-200">
			<View className="flex flex-col items-center w-full py-8">
				<Text className="text-3xl font-bold text-slate-500">
					Welcome to Onionwatch
				</Text>
			</View>
			<View className="flex-1 gap-2">
				<Text className="text-slate-700 font-bold text-xl">Results</Text>
				<View className="flex flex-row justify-between items-center rounded-md border border-slate-500 p-2">
					<View>
						<View className="flex flex-row items-center gap-1">
							<Text className="text-slate-700 font-bold text-xl">Insect: </Text>
							<Text className="text-slate-500 font-medium text-lg">Bangag</Text>
						</View>
						<View className="flex flex-row items-center gap-1">
							<Text className="text-slate-700 font-bold text-xl">Date: </Text>
							<Text className="text-slate-500 font-medium text-lg">
								April 3, 2025, 5:00 AM
							</Text>
						</View>
					</View>
					<Image source={images.Bangag} className="w-14 h-14 rounded-md" />
				</View>
				<View className="flex flex-row justify-between items-center rounded-md border border-slate-500 p-2">
					<View>
						<View className="flex flex-row items-center gap-1">
							<Text className="text-slate-700 font-bold text-xl">Insect: </Text>
							<Text className="text-slate-500 font-medium text-lg">Bangag</Text>
						</View>
						<View className="flex flex-row items-center gap-1">
							<Text className="text-slate-700 font-bold text-xl">Date: </Text>
							<Text className="text-slate-500 font-medium text-lg">
								April 3, 2025, 5:00 AM
							</Text>
						</View>
					</View>
					<Image source={images.Bangag} className="w-14 h-14 rounded-md" />
				</View>
			</View>
		</View>
	);
}
