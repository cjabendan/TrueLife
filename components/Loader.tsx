import { Colors } from '@/constants/Colors';
import { ActivityIndicator, useColorScheme, View } from 'react-native';


export function Loader(){
    
const colorScheme = useColorScheme();
const theme = Colors[colorScheme ?? 'light'];
    
    return (
        <View 
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.background,
            }}
        >
            <ActivityIndicator size="large" color={theme.tint} />
        </View>
    )
}