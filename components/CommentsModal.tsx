import { Colors } from '@/constants/Colors';
import { api } from '@/convex/_generated/api';
import type { Id } from "@/convex/_generated/dataModel";
import { styles } from '@/styles/feed.styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMutation, useQuery } from 'convex/react';
import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import Comment from './Comment';
import { Loader } from './Loader';


type CommentsModal = {
  postId: Id<"posts">;
  visible: boolean;
  onClose: () => void;
  onCommentAdded: () => void;
}

export default function CommentsModal({onClose, onCommentAdded, postId, visible}: CommentsModal) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];  
  
  const [ newComment, setNewComment] = useState("");
  const comments = useQuery(api.comments.getComments, {postId});
  const addComment = useMutation(api.comments.addCommment);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await addComment({
        content: newComment,
        postId,
      })

      setNewComment("");
      onCommentAdded();
    } catch (error) {
      console.log("Error adding comment:", error);
    }
  }


  return (
  <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
    <KeyboardAvoidingView
     behavior={Platform.OS === "ios" ? "padding" : "height"}
     style={[styles.modalContainer, { backgroundColor: theme.background }]}
    >
      <View style={[styles.modalHeader, { borderBottomColor: theme.lines }]}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color={theme.icon} />
        </TouchableOpacity>
        <Text style={[styles.modalTitle, { color: theme.text }]}>Comments</Text>
        <View style={{ width: 24}} />
      </View>

      { comments === undefined ? (
        <Loader />
      ) : (
        <FlatList
          data={comments}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => <Comment comment={item} />}
          contentContainerStyle={styles.commentsList}
        />
      ) }

      <View style={styles.commentInput}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.grey, color: theme.text }]}
          placeholder="Add a comment..."
          placeholderTextColor={theme.icon}
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />

        <TouchableOpacity onPress={handleAddComment} disabled={!newComment.trim()}>
          <Text style={[styles.postButton, !newComment.trim() && styles.postButtonDisabled, { color: theme.tint }]}>
            Post
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  </Modal>
  );
}