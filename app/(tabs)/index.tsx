import { Loader } from "@/components/Loader";
import NoPostsFound from "@/components/NoPostsFound";
import Post from "@/components/Post";
import StoriesSection from "@/components/StoriesSection";
import { Colors } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "convex/react";
import React from "react";

import {
  FlatList,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { styles } from "../../styles/feed.styles";

export default function Index() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const { signOut } = useAuth();

  const posts = useQuery(api.posts.getFeedPosts);

  if (posts === undefined) return <Loader />;

 
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.lines }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          True
          <Text style={{ color: theme.tint }}>Life</Text>
        </Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={22} color={theme.icon} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60, flexGrow: 1 }}
        ListHeaderComponent={<StoriesSection />}
        ListEmptyComponent={<NoPostsFound />}
      />
    </View>
  );
}
