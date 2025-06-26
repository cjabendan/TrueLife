import { Colors } from "@/constants/Colors";
import { styles } from "@/styles/feed.styles";
import { Text, useColorScheme, View } from "react-native";

export default function NoNotifications() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.lines }]}>
        <Text style={[styles.headerTitle, { color: theme.tint }]}>
          Notifications
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            color: theme.icon,
            fontSize: 16,
            fontFamily: "Poppins-Regular",
          }}
        >
          No notifications yet
        </Text>
      </View>
    </View>
  );
}
