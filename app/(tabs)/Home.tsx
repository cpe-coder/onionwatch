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
			<View className="flex flex-col justify-center">
				<Text>Onionwatch</Text>
				<Image
					source={images.Logo}
					resizeMode="contain"
					className="w-36 h-36"
				/>
			</View>
		</View>
	);
}
