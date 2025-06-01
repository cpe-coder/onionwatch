import { images } from "@/constant/images";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, View } from "react-native";
export default function Welcome() {
	const router = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			router.replace("/Home");
		}, 2000);

		return () => clearTimeout(timer);
	});

	return (
		<View className="flex-1 items-center justify-center bg-white px-8">
			<Image
				className="w-64 h-64  rounded-md"
				source={images.Logo}
				resizeMode="contain"
			/>
		</View>
	);
}
