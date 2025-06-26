import { Loader } from "@/components/Loader";
import NoNotifications from "@/components/NoNotifications";
import NotificationItem from "@/components/NotificationItem";
import { Colors } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/notif.styles";
import { useQuery } from "convex/react";
import React from "react";
import { FlatList, Text, View, useColorScheme } from "react-native";

export default function notifications() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const notifications = useQuery(api.notifications.getNotifications);

  if (notifications === undefined) return <Loader />;

  if (notifications.length === 0) return <NoNotifications />;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.lines }]}>
        <Text style={[styles.headerTitle, { color: theme.tint }]}>
          Notifications
        </Text>
      </View>

      <FlatList
        data={notifications}   
        renderItem={({ item }) => <NotificationItem notification={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}
