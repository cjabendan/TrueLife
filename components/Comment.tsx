import { Colors } from '@/constants/Colors';
import { styles } from '@/styles/feed.styles';
import { formatDistanceToNow } from "date-fns";
import React from 'react';
import { Image, Text, useColorScheme, View } from 'react-native';

interface Comment {
    content: string;
    _creationTime: number;
    user: {
        fullname: string;
        image: string;
    };
}

export default function Comment({ comment }: { comment: Comment }) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];    
  
  return (
    <View style={styles.commentContainer}>
        <Image source={{ uri: comment.user.image }} style={styles.commentAvatar}/>
        <View style={styles.commentContent}>
            <Text style={[styles.commentUsername, { color: theme.text}]}>{ comment.user.fullname }</Text>
            <Text style={[styles.commentText, { color: theme.text}]}>{ comment.content }</Text>
            <Text style={[styles.commentTime, { color: theme.icon} ]}>
                {formatDistanceToNow(comment._creationTime, { addSuffix: true })}
            </Text>
        </View>
    </View>
  )
}