import { images } from "@/constant/images";
import database from "@/utils/firebase.config";
import { useNavigation } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { onValue, orderByChild, query, ref } from "firebase/database";
import React from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	SafeAreaView,
	Text,
	View,
} from "react-native";

interface InsectDetection {
	id: string;
	predicted_class: string;
	timestamp: string;
}
export default function Home() {
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = React.useState(true);
	const [detections, setDetections] = React.useState<InsectDetection[]>([]);
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

	React.useEffect(() => {
		const detectionRef = query(
			ref(database, "insect-detections"),
			orderByChild("timestamp")
		);

		onValue(detectionRef, (snapshot) => {
			const result: InsectDetection[] = [];

			snapshot.forEach((childSnapshot) => {
				const val = childSnapshot.val();
				result.push({
					id: childSnapshot.key ?? "",
					predicted_class: val.predicted_class,
					timestamp: val.timestamp,
				});
			});

			setDetections(result.reverse());
			setIsLoading(false);
		});
	}, []);

	const formatDate = (timestamp: string) => {
		const date = new Date(timestamp);
		return date.toLocaleString("en-PH", {
			month: "long",
			day: "numeric",
			year: "numeric",
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		});
	};

	const renderItem = ({ item }: { item: InsectDetection }) => (
		<View className="flex-row justify-between mt-4 border-b pb-2 border-gray-500">
			<View>
				<Text className="text-lg text-secondary font-bold">
					Insect: {item.predicted_class}
				</Text>
				<Text className="text-sm text-gray-400">
					Date: {formatDate(item.timestamp)}
				</Text>
			</View>
			<Image
				source={images.Bangag}
				className="w-14 h-14 rounded-md"
				resizeMode="cover"
			/>
		</View>
	);

	return (
		<SafeAreaView className="flex-1 bg-slate-200">
			<View className="px-4 py-4">
				<Text className="text-2xl font-bold text-slate-700">
					Onionwatch – Insect Detection
				</Text>
			</View>

			<View className="flex-1 px-4">
				{isLoading ? (
					<View className="flex-1 items-center justify-center">
						<ActivityIndicator size="large" color="#ff5757" />
						<Text className="text-gray-500 mt-4 text-lg">Fetching data...</Text>
					</View>
				) : detections.length === 0 ? (
					<View className="flex-1 items-center justify-center">
						<Text className="text-gray-500 mt-4 text-lg">
							No insect detections found
						</Text>
						<Image
							className="w-28 h-28 mt-4"
							resizeMode="contain"
							source={images.Bangag}
						/>
					</View>
				) : (
					<FlatList
						data={detections}
						keyExtractor={(item) => item.id}
						renderItem={renderItem}
						contentContainerStyle={{ paddingBottom: 20 }}
					/>
				)}
			</View>
		</SafeAreaView>
	);
}
