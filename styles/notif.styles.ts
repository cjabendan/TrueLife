import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    paddingTop: 4,
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  notificationContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
  },
  iconBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  notificationInfo: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: -4,
    fontFamily: "Poppins-Bold",
    letterSpacing: 0.5,
  },
  action: {
    fontSize: 12,
    marginBottom: -3.5,
    fontFamily: "Poppins-Regular",
  },
  timeAgo: {
    fontSize: 11,
  },
  postImage: {
    width: 44,
    height: 44,
    borderRadius: 6,
  },
  centered: {
    justifyContent: "center",
    alignContent: "center",
  },
});
