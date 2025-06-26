import { Colors } from "@/constants/Colors";
import { Text, useColorScheme, View } from "react-native";

export default function NoBookmarksFound() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.background}}>
        <Text
          style={{
            color: theme.icon,
            fontSize: 16,
            fontFamily: "Poppins-Regular",
          }}
        >
          No posts yet
        </Text>
      </View>
  );
}
