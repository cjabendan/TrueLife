import { Loader } from "@/components/Loader";
import NoBookmarksFound from "@/components/NoBookmarksFound";
import Post from "@/components/Post";
import { Colors } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feed.styles";
import { useQuery } from "convex/react";
import React from "react";
import { FlatList, Text, View, useColorScheme } from "react-native";

export default function Bookmarks() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const bookmarkedPosts = useQuery(api.bookmarks.getBookmarkedPosts);

  if (bookmarkedPosts === undefined) return <Loader />;
  if (bookmarkedPosts.length === 0) return <NoBookmarksFound />;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.lines }]}>
        <Text style={[styles.headerTitle, { color: theme.tint }]}>
          Bookmarks
        </Text>
      </View>

      <FlatList
        data={bookmarkedPosts.filter(
          (item): item is NonNullable<typeof item> => item !== null
        )}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </View>
  );
}
