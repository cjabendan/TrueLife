import { Colors } from "@/constants/Colors";
import { styles } from "@/styles/notif.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatDistanceToNow } from "date-fns";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";

export default function NotificationItem({ notification }: any) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Link
          href={{
            pathname: "/user/[id]",
            params: { id: notification.sender._id },
          }}
          asChild
        >
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={notification.sender.image}
              style={[styles.avatar, { borderColor: theme.grey }]}
              contentFit="cover"
              transition={200}
            />
            <View
              style={[
                styles.iconBadge,
                { backgroundColor: theme.background, borderColor: theme.grey },
              ]}
            >
              {notification.type === "like" ? (
                <Ionicons name="heart" size={14} color={theme.tint} />
              ) : notification.type === "follow" ? (
                <Ionicons name="person-add" size={14} color={theme.tint} />
              ) : (
                <Ionicons name="chatbubble" size={14} color={theme.tint} />
              )}
            </View>
          </TouchableOpacity>
        </Link>

        <View style={styles.notificationInfo}>
          <Link
            href={{
              pathname: "/user/[id]",
              params: { id: notification.sender._id },
            }}
            asChild
          >
            <TouchableOpacity>
              <Text style={[styles.username, { color: theme.text }]}>
                {notification.sender.username}
              </Text>
            </TouchableOpacity>
          </Link>
          <Text style={[styles.action, { color: theme.icon }]}>
            {notification.type === "like"
              ? "liked your post"
              : notification.type === "follow"
                ? "started following you"
                : `commented: "${notification.comment}"`}
          </Text>
          <Text style={[styles.timeAgo, { color: theme.icon }]}>
            {formatDistanceToNow(notification._creationTime, {
              addSuffix: true,
            })}
          </Text>
        </View>
      </View>

      {notification.post && (
        <Image
          source={notification.post.imageUrl}
          style={styles.postImage}
          contentFit="cover"
          transition={200}
        />
      )}
    </View>
  );
}
