import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function IconButton({ icon, color, size, onPress }) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.buttonContainer}>
                <Ionicons
                    name={icon}
                    size={size}
                    color={color}
                />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        marginHorizontal: 8,
        marginVertical: 2,
        padding: 6,
        // alignSelf: 'center',
    },
    pressed: {
        opacity: 0.75,
    }
})