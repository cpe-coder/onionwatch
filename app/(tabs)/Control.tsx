import database from "@/utils/firebase.config";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { ref, set } from "firebase/database";
import React from "react";
import {
	Animated,
	Modal,
	PanResponder,
	Text,
	TouchableOpacity,
	View,
	ViewProps,
} from "react-native";

const SLIDER_HEIGHT = 100;
const MIN_VALUE = 1000;
const MAX_VALUE = 2000;
const MID_VALUE = 1500;

function Trootle(props: {
	panHandlers: React.JSX.IntrinsicAttributes &
		React.JSX.IntrinsicClassAttributes<View> &
		Readonly<ViewProps>;
	position: number;
}) {
	return (
		<View className="bg-background/70 items-center justify-center py-2 rounded-lg px-4 mx-6">
			<View className="relative items-center justify-center h-[150px] w-16 bg-background2 rounded-lg overflow-hidden">
				<View
					className="absolute w-6 rounded-md h-[100px] my-4"
					{...props.panHandlers}
				>
					<View
						className="absolute w-12 h-8 bg-white rounded-md -left-3"
						style={{
							bottom: props.position - 10,
						}}
					/>
				</View>
			</View>
		</View>
	);
}

function Wheel(props: {
	panHandlers: React.JSX.IntrinsicAttributes &
		React.JSX.IntrinsicClassAttributes<View> &
		Readonly<ViewProps>;
	position: number;
}) {
	const SLIDER_WIDTH = 100;
	const handleLeft = (props.position / 180) * SLIDER_WIDTH;

	return (
		<View className="bg-background/70 items-center justify-center py-2 rounded-lg px-4 mx-6">
			<View className="relative items-center justify-center w-[150px] h-16 bg-background2 rounded-lg overflow-hidden">
				<View
					className="absolute h-6 rounded-md w-[100px] my-4 left-6 top-4"
					{...props.panHandlers}
				>
					<View
						className="absolute h-12 w-8 bg-white rounded-md -top-3"
						style={{
							left: handleLeft - 10,
						}}
					/>
				</View>
			</View>
		</View>
	);
}

export default function Control() {
	const navigation = useNavigation();
	const [isVisible, setIsVisible] = React.useState(false);
	const router = useRouter();
	const [power, setPower] = React.useState(MID_VALUE);
	const [position, setPosition] = React.useState(SLIDER_HEIGHT / 2);
	const rotation = React.useRef(new Animated.Value(90)).current;
	const [wheelDegree, setWheelDegree] = React.useState(90);
	const [gestureStartRotation, setGestureStartRotation] = React.useState(90);
	const [lastRotation, setLastRotation] = React.useState(90);
	const SLIDER_WIDTH = 100;

	React.useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			try {
				ScreenOrientation.lockAsync(
					ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
				);
				setIsVisible(true);
			} catch (error) {
				console.log(error);
			}
		});

		return unsubscribe;
	}, [navigation]);

	React.useEffect(() => {
		console.log("Wheel: ", rotation);
		console.log("Wheel: ", wheelDegree);

		setActivePower();
		setActiveWheel();
	});

	const handleBackPress = () => {
		router.push("/Home");
		setIsVisible(false);
	};

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onMoveShouldSetPanResponder: () => true,
		onPanResponderMove: (_, gestureState) => {
			let newY = position + gestureState.dy * -1;
			newY = Math.max(0, Math.min(SLIDER_HEIGHT, newY));
			setPosition(newY);

			const newValue = Math.round(
				MIN_VALUE + (newY / SLIDER_HEIGHT) * (MAX_VALUE - MIN_VALUE)
			);
			setPower(newValue);
		},
		onPanResponderGrant: () => {},
		onPanResponderRelease: () => {},
	});

	const steeringWheelResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onMoveShouldSetPanResponder: () => true,
		onPanResponderGrant: () => {
			setGestureStartRotation(lastRotation);
		},
		onPanResponderMove: (_, gestureState) => {
			const { dx } = gestureState;
			let newRotation = Math.round(
				Math.max(
					0,
					Math.min(180, gestureStartRotation + (dx / SLIDER_WIDTH) * 180)
				)
			);
			setWheelDegree(newRotation);
		},
		onPanResponderRelease: (_, gestureState) => {
			const { dx } = gestureState;
			let newRotation = Math.round(
				Math.max(
					0,
					Math.min(180, gestureStartRotation + (dx / SLIDER_WIDTH) * 180)
				)
			);
			setLastRotation(newRotation);
		},
	});

	const setActivePower = async () => {
		try {
			const valueRef = ref(database, "Controls/esc");
			await set(valueRef, power);
		} catch (error) {
			console.log("Error setting power value:", error);
		}
	};
	const setActiveWheel = async () => {
		try {
			const valueRef = ref(database, "Controls/wheel");
			await set(valueRef, wheelDegree);
		} catch (error) {
			console.log("Error setting wheel value:", error);
		}
	};

	const handleReset = () => {
		setPower(MID_VALUE);
		setPosition(SLIDER_HEIGHT / 2);
	};

	return (
		<>
			<View className="bg-background h-screen w-screen"></View>
			<Modal visible={isVisible} animationType="fade">
				<View className="bg-background h-full w-full px-8 flex-row">
					<View className="h-full w-52 flex-col justify-between items-center py-6">
						<View className="w-full flex justify-start">
							<TouchableOpacity
								onPress={handleBackPress}
								className="p-2  bg-background rounded-full"
							>
								<Ionicons name="arrow-back" size={24} color="white" />
							</TouchableOpacity>
						</View>
						<View className="w-40 h-40 flex items-end justify-center">
							<Wheel
								position={wheelDegree}
								panHandlers={steeringWheelResponder.panHandlers}
							/>
						</View>
					</View>
					<View className="flex-1 h-full bg-background2"></View>
					<View className="h-full w-52 flex-col justify-end items-center py-6">
						<View className=" right-0">
							<TouchableOpacity
								className="bg-green-500 rounded-md px-3 py-2"
								onPress={handleReset}
							>
								<Text className="font-bold text-xl text-white">N</Text>
							</TouchableOpacity>
						</View>
						<Trootle
							position={position}
							panHandlers={panResponder.panHandlers}
						></Trootle>
					</View>
				</View>
			</Modal>
		</>
	);
}
