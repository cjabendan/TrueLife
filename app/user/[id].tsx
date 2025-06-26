import { Loader } from "@/components/Loader";
import NoLikesFound from "@/components/NoLikesFound";
import NoPostsFound from "@/components/NoPostsFound";
import { Colors } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/profile.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation, useQuery } from "convex/react";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const profile = useQuery(api.users.getUserProfile, { id: id as Id<"users"> });
  const posts = useQuery(api.posts.getUserPosts, { userId: id as Id<"users"> });
  const likedPosts = useQuery(api.posts.getLikedPosts);
  const isFollowing = useQuery(api.users.isFollowing, {
    followingId: id as Id<"users">,
  });

  const toggleFollow = useMutation(api.users.toggleFollow);

  const [selectedPost, setSelectedPost] = useState<Doc<"posts"> | null>(null);

  const [activeTab, setActiveTab] = useState<"posts" | "likes">("posts");

  if (profile === undefined || posts === undefined || isFollowing === undefined)
    return <Loader />;

  const renderProfileHeader = () => (
    <View style={styles.profileInfo}>
      <View style={styles.avatarAndStats}>
        <View style={styles.avatarContainer}>
          <Image
            source={profile.image}
            style={[styles.avatar, { borderColor: theme.grey }]}
            contentFit="cover"
            transition={200}
          />
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.text }]}>
              {profile.posts}
            </Text>
            <Text style={[styles.statLabel, { color: theme.text }]}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.text }]}>
              {profile.followers}
            </Text>
            <Text style={[styles.statLabel, { color: theme.text }]}>
              Followers
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.text }]}>
              {profile.following}
            </Text>
            <Text style={[styles.statLabel, { color: theme.text }]}>
              Following
            </Text>
          </View>
        </View>
      </View>
      <Text style={[styles.name, { color: theme.text }]}>
        {profile.fullname}
      </Text>
      {profile.bio && profile.bio.trim().length > 0 ? (
        <Text style={[styles.bio, { color: theme.lines }]}>{profile.bio}</Text>
      ) : (
        <Text style={[styles.bio, { color: theme.icon, fontStyle: "italic" }]}>
          This user is too lazy to add a bio. 😴
        </Text>
      )}
      <TouchableOpacity
        style={[
          styles.followButton,
          isFollowing ? styles.followingButton : null,
          { backgroundColor: isFollowing ? theme.background : theme.tint },
        ]}
        onPress={() => toggleFollow({ followingId: id as Id<"users"> })}
      >
        <Text
          style={[
            styles.followButtonText,
            { color: isFollowing ? theme.text : "#fff" },
          ]}
        >
          {isFollowing ? "Following" : "Follow"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderTabs = () => (
    <View style={[styles.actionText]}>
      <TouchableOpacity
        style={[
          styles.postAction,
          activeTab === "posts" && {
            borderBottomWidth: 2,
            borderBottomColor: theme.text,
          },
        ]}
        onPress={() => setActiveTab("posts")}
      >
        <Text
          style={[
            styles.postsText,
            { color: activeTab === "posts" ? theme.text : theme.text },
          ]}
        >
          Posts
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.likeAction,
          activeTab === "likes" && {
            borderBottomWidth: 2,
            borderBottomColor: theme.text,
          },
        ]}
        onPress={() => setActiveTab("likes")}
      >
        <Text
          style={[
            styles.likesText,
            { color: activeTab === "likes" ? theme.text : theme.text },
          ]}
        >
          Likes
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Choose which data to show
  const dataToShow = activeTab === "posts" ? posts : likedPosts;

  // Choose which empty component to show
  const EmptyComponent = activeTab === "posts" ? NoPostsFound : NoLikesFound;

  const filteredData = (dataToShow ?? []).filter(
    (item): item is Doc<"posts"> => !!item
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.lines }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.icon} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          {profile.fullname}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {renderProfileHeader()}

      <FlatList
        data={filteredData}
        numColumns={3}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ flexGrow: 1 }}
        ListHeaderComponent={renderTabs}
        ListEmptyComponent={<EmptyComponent />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => setSelectedPost(item)}
          >
            <Image
              source={item.imageUrl}
              style={styles.gridImage}
              contentFit="cover"
              transition={200}
            />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
