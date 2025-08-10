import { memo } from 'react';
import { Pressable, View, Text } from 'react-native';
import { Image } from 'expo-image';
import type { Exercise } from '@/src/data/exercises'; // <-- alias corretto

type Props = {
    item: Exercise;
    onPress: () => void;
};

function ExerciseCardBase({ item, onPress }: Props) {
    // preferisci l’asset locale, altrimenti l’URL; se nulla, lascia undefined
    const source = item.gifAsset ?? (item.gifUrl ? { uri: item.gifUrl } : undefined);

    return (
        <Pressable
            onPress={onPress}
            style={{
                backgroundColor: '#121212',
                borderRadius: 16,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#2a2a2a'
            }}
        >
            {source ? (
                <Image
                    source={source as any}
                    contentFit="cover"
                    style={{ width: '100%', height: 160 }}
                    transition={100}
                />
            ) : (
                // fallback semplice se non c'è immagine
                <View style={{ width: '100%', height: 160, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f0f0f' }}>
                    <Text style={{ color: '#777' }}>Nessuna GIF</Text>
                </View>
            )}

            <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>{item.name}</Text>
                <Text style={{ marginTop: 4, color: '#bbb' }}>
                    {item.primaryMuscle} • {item.equipment ?? 'bodyweight'}
                </Text>
            </View>
        </Pressable>
    );
}

export const ExerciseCard = memo(ExerciseCardBase);
