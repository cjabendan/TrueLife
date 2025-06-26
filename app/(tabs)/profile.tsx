import { Loader } from "@/components/Loader";
import NoLikesFound from "@/components/NoLikesFound";
import NoPostsFound from "@/components/NoPostsFound";
import { Colors } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useAuth } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation, useQuery } from "convex/react";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { styles } from "../../styles/profile.styles";

export default function profile() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const { signOut, userId } = useAuth();
  const [isEditModalVisibile, setIsEditModalVisible] = useState(false);
  const currentUser = useQuery(
    api.users.getUserByClerkId,
    userId ? { clerkId: userId } : "skip"
  );

  const [editedProfile, setEditedProfile] = useState({
    fullname: currentUser?.fullname || "",
    bio: currentUser?.bio || "",
  });

  const [selectedPost, setSelectedPost] = useState<Doc<"posts"> | null>(null);

  const [activeTab, setActiveTab] = useState<"posts" | "likes">("posts");

  const posts = useQuery(api.posts.getUserPosts, {});
  const likedPosts = useQuery(api.posts.getLikedPosts);

  const updateProfile = useMutation(api.users.updatePfofile);

  const handleSaveProfile = async () => {
    await updateProfile(editedProfile);
    setIsEditModalVisible(false);
  };

  if (!currentUser || posts === undefined) return <Loader />;

  // Profile info as header
  const renderProfileHeader = () => (
    <View style={styles.profileInfo}>
      <View style={styles.avatarAndStats}>
        <View style={styles.avatarContainer}>
          <Image
            source={currentUser.image}
            style={[styles.avatar, { borderColor: theme.grey }]}
            contentFit="cover"
            transition={200}
          />
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.text }]}>
              {currentUser.posts}
            </Text>
            <Text style={[styles.statLabel, { color: theme.text }]}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.text }]}>
              {currentUser.followers}
            </Text>
            <Text style={[styles.statLabel, { color: theme.text }]}>
              Followers
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.text }]}>
              {currentUser.following}
            </Text>
            <Text style={[styles.statLabel, { color: theme.text }]}>
              Following
            </Text>
          </View>
        </View>
      </View>
      <Text style={[styles.name, { color: theme.text }]}>
        {currentUser.fullname}
      </Text>
      {currentUser.bio && currentUser.bio.trim().length > 0 ? (
        <Text style={[styles.bio, { color: theme.text }]}>
          {currentUser.bio}
        </Text>
      ) : (
        <Text style={[styles.bio, { color: theme.icon, fontStyle: "italic" }]}>
          This user is too lazy to add a bio. 😴
        </Text>
      )}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.editButton, { backgroundColor: theme.grey }]}
          onPress={() => setIsEditModalVisible(true)}
        >
          <Text style={[styles.editButtonText, { color: theme.text }]}>
            Edit Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.shareButton, { backgroundColor: theme.grey }]}
        >
          <Ionicons name="share-outline" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>
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
        <View style={styles.headerLeft}>
          <Text style={[styles.username, { color: theme.text }]}>
            {currentUser.username}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon} onPress={() => signOut()}>
            <Ionicons
              name="log-out-outline"
              size={24}
              color={theme.icon}
            ></Ionicons>
          </TouchableOpacity>
        </View>
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

      {/* Edit Post Modal */}
       <Modal
        visible={isEditModalVisibile}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[styles.modalConainter, ]}
        >

          <View style={[styles.modalContent, { backgroundColor: theme.background}]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                Edit Profile
              </Text>
              <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
                <Ionicons name="close" size={24} color={theme.icon}/>
              </TouchableOpacity>
            </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: theme.text}]}>Name</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.grey, color: theme.text}]}
              value={editedProfile.fullname}
              onChangeText={(text) => setEditedProfile((prev) => ({...prev, fullname: text }))}
              placeholderTextColor={theme.lines}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: theme.text}]}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput, { backgroundColor: theme.grey, color: theme.text }]}
              value={editedProfile.bio}
              onChangeText={(text) => setEditedProfile((prev) => ({...prev, bio: text }))}
              multiline
              numberOfLines={4}
              placeholderTextColor={theme.lines}
            />
          </View>

          <TouchableOpacity style={[styles.saveButton, {backgroundColor: theme.tint}]} onPress={handleSaveProfile}>
              <Text style={[styles.saveButtonText, { color: theme.text }]}>Save Changes</Text>
          </TouchableOpacity>

          </View>
        </KeyboardAvoidingView>

      </TouchableWithoutFeedback>
      </Modal>

      {/* View Selected Post Modal */}
      <Modal
        visible={!!selectedPost}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSelectedPost(null)}
      >
        <View style={styles.modalBackfrop}>
          {selectedPost && (
            <View
              style={[
                styles.postDetailContainer,
                { backgroundColor: theme.background },
              ]}
            >
              <View style={styles.postDetailHeader}>
                <TouchableOpacity onPress={() => setSelectedPost(null)}>
                  <Ionicons name="close" size={24} color={theme.icon} />
                </TouchableOpacity>
              </View>

              <Image
                source={selectedPost.imageUrl}
                cachePolicy={"memory-disk"}
                style={styles.postDetailImage}
              />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}
