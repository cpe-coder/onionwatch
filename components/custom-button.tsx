import {
	ActivityIndicator,
	GestureResponderEvent,
	Text,
	TouchableOpacity,
} from "react-native";

interface CustomButtonProp {
	title?: string;
	handlePress?: (event: GestureResponderEvent) => void;
	containerStyles?: string;
	textStyles?: string;
	disable?: boolean;
	submitting?: boolean;
}

const CustomButton: React.FC<CustomButtonProp> = ({
	title,
	handlePress,
	containerStyles,
	textStyles,
	disable,
	submitting,
}) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`bg-slate-500 rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
				disable ? "opacity-50" : ""
			}`}
			disabled={disable}
		>
			<Text className={`text-background font-psemibold text-lg ${textStyles}`}>
				{title}
			</Text>

			{submitting && (
				<ActivityIndicator
					animating={submitting}
					color="#64748b"
					size="small"
					className="ml-2"
				/>
			)}
		</TouchableOpacity>
	);
};

export default CustomButton;
