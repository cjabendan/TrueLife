import { Colors } from '@/constants/Colors';
import { styles } from '@/styles/feed.styles';
import { Image, Text, useColorScheme, View } from 'react-native';

type Story = {
    id: string;
    username: string;
    avatar: string;
    hasStory: boolean;
};

export default function Story({ story }: { story: Story}) {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];
    
    return (
        <View style={styles.storyWrapper}>
            <View style={[styles.storyRing, !story.hasStory && styles.noStory, { borderColor: theme.tint}]}>
                <Image source={{  uri: story.avatar }} style={[styles.storyAvatar, { borderColor: theme.tint}]} />
            </View>
            <Text style={[styles.storyUsername, { color: theme.text }]}>{story.username}</Text>
        </View>
    )
}