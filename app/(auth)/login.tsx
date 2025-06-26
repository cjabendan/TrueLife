import { Colors } from "@/constants/Colors";
import { useSSO } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import styles from "../../styles/auth.styles";

export default function login() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const router = useRouter();
  const { startSSOFlow } = useSSO();
  const handleGoogleSignin = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("Oauth error: ", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <View style={{ paddingHorizontal: 40 }}>
          <View style={[styles.iconBackground]}>
            <Ionicons name="leaf" size={32} color={theme.tint} />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>
            True
            <Text style={{ color: theme.tint }}>Life</Text>
          </Text>
          <Text style={[styles.description, { color: theme.description }]}>
            Every life has a story. {"\n"}This is yours.
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <Image
            source={require("../../assets/images/1.png")}
            style={styles.icon}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: theme.btn }]}
            onPress={handleGoogleSignin}
          >
            <View style={styles.buttonContent}>
              <View>
                <Ionicons
                  name="logo-google"
                  size={22}
                  color={theme.btn_text}
                  style={styles.google}
                />
              </View>
              <View>
                <Text style={[styles.startText, { color: theme.btn_text }]}>
                  Continue with Google
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <Text style={[styles.text, { color: theme.description }]}>
            By continuing, you agree to our Terms and Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
}
