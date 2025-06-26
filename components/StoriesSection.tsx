import Story from "@/components/Story";
import { Colors } from "@/constants/Colors";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feed.styles";
import { useQuery } from "convex/react";
import { Link } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity, useColorScheme } from "react-native";

function getRandomItems<T>(arr: T[], n: number): T[] {
  const shuffled = arr.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, n);
}

export default function StoriesSection() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const followingUsers = useQuery(api.users.getFollowingUsers);

  const currentUser = useQuery(api.users.getUserByClerkId, {
    clerkId:
      typeof window !== "undefined" && window.Clerk && window.Clerk.user
        ? window.Clerk.user.id
        : "",
  });

  if (followingUsers === undefined || !currentUser) return null;

  let storiesToShow = getRandomItems(
    followingUsers.filter((user) => user !== null),
    10
  );

  // Ensure current user is always visible in stories
  const alreadyIncluded = storiesToShow.some(
    (user) => user._id === currentUser._id
  );
  if (!alreadyIncluded) {
    storiesToShow = [currentUser, ...storiesToShow];
  }

return (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={[styles.storiesContainer, { borderBottomColor: theme.lines }]}
    contentContainerStyle={{ flexDirection: "row", alignItems: "center" }}
  >
    {storiesToShow.map((user) =>
      user._id === currentUser._id ? (
        <Link
          key={user._id}
          href="/profile"
          asChild
        >
          <TouchableOpacity>
            <Story
              story={{
                id: user._id,
                username: "Me",
                avatar: user.image,
                hasStory: false,
              }}
            />
          </TouchableOpacity>
        </Link>
      ) : (
        <Link
          key={user._id}
          href={{
            pathname: "/user/[id]",
            params: { id: user._id },
          }}
          asChild
        >
          <TouchableOpacity>
            <Story
              story={{
                id: user._id,
                username: user.username,
                avatar: user.image,
                hasStory: false,
              }}
            />
          </TouchableOpacity>
        </Link>
      )
    )}
  </ScrollView>
);
}