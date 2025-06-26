import { Colors } from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { styles } from "../../styles/create.styles";

import { Image } from "expo-image";

import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

export default function CreateScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const router = useRouter();
  const { user } = useUser();

  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) setSelectedImage(result.assets[0].uri);
  };

  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
  const createPost = useMutation(api.posts.createPost);

  // Handle Post
  
  const handleShare = async () => {
    if (!selectedImage) return;

    try {
      setIsSharing(true);
      const uploadUrl = await generateUploadUrl();

      const uploadResult = await FileSystem.uploadAsync(
        uploadUrl,
        selectedImage,
        {
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
          mimeType: "image/jpeg",
        }
      );

      if (uploadResult.status !== 200) throw new Error("Upload failed!");

      const { storageId } = JSON.parse(uploadResult.body);
      await createPost({ storageId, caption });

      setSelectedImage(null);
      setCaption("");
      router.push("/(tabs)");
    } catch (error) {
      console.log("Error sharing post");
    } finally {
      setIsSharing(false);
    }
  };

  if (!selectedImage) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={[styles.header, { borderColor: theme.lines }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={theme.tint} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.tint }]}>
            New Post
          </Text>
          <View style={{ width: 34 }} />
        </View>
        <TouchableOpacity
          style={styles.emptyImageContainer}
          onPress={pickImage}
        >
          <Ionicons name="image-outline" size={48} color={theme.icon} />
          <Text style={[styles.emptyImageText, { color: theme.icon }]}>
            Tap to select an image
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.content}>
          <View style={[styles.header, { borderColor: theme.lines }]}>
            <TouchableOpacity
              onPress={() => {
                setSelectedImage(null);
                setCaption("");
              }}
              disabled={isSharing}
            >
              <Ionicons name="close-outline" size={28} color={theme.tint} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.tint, marginLeft: 34, }]}>
              New Post
            </Text>
            <TouchableOpacity
              style={[
                styles.shareButton,
                isSharing && styles.shareButtonDisabled,
              ]}
              disabled={isSharing || !selectedImage}
              onPress={handleShare}
            >
              {isSharing ? (
                <ActivityIndicator size="small" color={theme.tint} />
              ) : (
                <Text style={[styles.shareText, { color: theme.tint }]}>
                  Share
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            bounces={false}
            keyboardShouldPersistTaps="handled"
            contentOffset={{ x: 0, y: 100 }}
          >
            <View style={[styles.content, isSharing && styles.contentDisabled]}>
              {/* PREVIEW IMAGE SECTION*/}
              <View style={styles.imageSection}>
                <Image
                  source={selectedImage}
                  style={styles.previewImage}
                  contentFit="cover"
                  transition={200}
                />
                <TouchableOpacity
                  style={[styles.changeImageButton]}
                  onPress={pickImage}
                  disabled={isSharing}
                >
                  <Ionicons name="image-outline" size={28} color={"#fff"} />
                  <Text style={[styles.changeImageText]}>Change</Text>
                </TouchableOpacity>
              </View>

              {/* INPUT SECTION*/}
              <View style={styles.inputSection}>
                <View style={styles.captionContainer}>
                  <Image
                    source={user?.imageUrl}
                    style={styles.userAvatar}
                    contentFit="cover"
                    transition={200}
                  />
                  <TextInput
                    style={[styles.captionInput, { color: theme.text }]}
                    placeholder="Write a caption..."
                    placeholderTextColor={theme.icon}
                    multiline
                    value={caption}
                    onChangeText={setCaption}
                    editable={!isSharing}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
