import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
  headerRight: {
    flexDirection: "row",
    gap: 16,
  },
  headerIcon: {
    padding: 4,
  },
  profileInfo: {
    padding: 16,
  },
  avatarAndStats: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 1.5,
  },
  statsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },

  name: {
    fontSize: 15.5,
    marginBottom: 4,
    letterSpacing: 0.2,
    fontFamily: "Poppins-Bold",
  },

  bio: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Poppins-Regular",
    marginBottom: 6,
  },

  actionButtons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },

  editButton: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  editButtonText: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    letterSpacing: 0.5,
  },

  shareButton: {
    padding: 8,
    borderRadius: 8,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  actionText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -14,
    paddingTop: 10,
    paddingBottom: 4,
  },

  postAction: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  likeAction: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  postsText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginBottom: 6,
  },

  likesText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginBottom: 6,
  },

  gridItem: {
    flex: 1 / 3,
    aspectRatio: 1,
    padding: 1,
  },

  gridImage: {
    flex: 1,
  },

  modalConainter: {
    flex: 1,
    justifyContent: "flex-end",
  },

  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 400,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold"
  },

  inputContainer: {
    marginBottom: 20,
  },

  inputLabel: {
    marginBottom: 8,
    fontSize: 14,
    fontFamily: "Poppins-Regular"
  },

  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    fontFamily: "Poppins-Regular"
  },

  bioInput: {
    height: 120,
    textAlignVertical: "top",
  },

  saveButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  saveButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-Bold"
  },

  modalBackfrop: {
    flex: 1,
    justifyContent: "center",
  },

  postDetailContainer: {
    maxHeight: height * 0.9,
  },

  postDetailHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 12,
    borderBottomWidth: 0.5,
  },

  postDetailImage: {
    width: width,
    height: width,
  },

  followButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 16,
  },

  followingButton: {
    borderWidth: 1,
  },

  followButtonText: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    textAlign: "center"
  },

  noPostsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    gap: 12,
  },

  noPostsText: {
    fontSize: 16,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  postsGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
});
