import { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, Modal, ScrollView, Pressable } from 'react-native';
import { EXERCISES, Exercise } from '@/src/data/exercises';
import { ExerciseCard } from '@/src/components/ExerciseCard';

export default function ExercisesScreen() {
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<Exercise | null>(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return EXERCISES;
    return EXERCISES.filter(e =>
        e.name.toLowerCase().includes(query) ||
        e.primaryMuscle.toLowerCase().includes(query) ||
        (e.equipment ?? '').toLowerCase().includes(query)
    );
  }, [q]);

  return (
      <View style={{ flex: 1, padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 22, fontWeight: '700' }}>🏋️ لیست تمرین‌ها / Catalogo Esercizi</Text>

        <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Cerca / جستجو (nome, muscolo, attrezzatura)"
            placeholderTextColor="#888"
            style={{
              backgroundColor: '#0f0f0f',
              color: '#fff',
              borderRadius: 12,
              paddingHorizontal: 14,
              paddingVertical: 12,
              borderWidth: 1,
              borderColor: '#2a2a2a'
            }}
        />

        <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ gap: 12 }}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            renderItem={({ item }) => (
                <View style={{ flex: 1 }}>
                  <ExerciseCard item={item} onPress={() => setSelected(item)} />
                </View>
            )}
            contentContainerStyle={{ paddingBottom: 24, gap: 12 }}
        />

        {/* Modale dettagli */}
        <Modal
            visible={!!selected}
            transparent
            animationType="slide"
            onRequestClose={() => setSelected(null)}
        >
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'flex-end'
          }}>
            <View style={{
              maxHeight: '85%',
              backgroundColor: '#111',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 16
            }}>
              <View style={{ alignItems: 'center', marginBottom: 8 }}>
                <View style={{ width: 48, height: 4, backgroundColor: '#333', borderRadius: 2 }} />
              </View>

              <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>
                  {selected?.name}
                </Text>
                <Text style={{ marginTop: 6, color: '#bbb' }}>
                  Muscolo: {selected?.primaryMuscle} • Attrezzatura: {selected?.equipment ?? '—'} • Livello: {selected?.level ?? '—'}
                </Text>

                <View style={{ height: 12 }} />

                {selected?.instructions?.length ? (
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>Istruzioni / مراحل</Text>
                      {selected.instructions.map((s, i) => (
                          <Text key={i} style={{ color: '#ddd', marginTop: 6 }}>• {s}</Text>
                      ))}
                    </View>
                ) : null}

                <View style={{ height: 10 }} />

                {selected?.safetyTips?.length ? (
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>Sicurezza / نکات ایمنی</Text>
                      {selected.safetyTips.map((s, i) => (
                          <Text key={i} style={{ color: '#ddd', marginTop: 6 }}>• {s}</Text>
                      ))}
                    </View>
                ) : null}
              </ScrollView>

              <Pressable
                  onPress={() => setSelected(null)}
                  style={{
                    backgroundColor: '#1f7aed',
                    paddingVertical: 12,
                    borderRadius: 12,
                    alignItems: 'center'
                  }}
              >
                <Text style={{ color: '#fff', fontWeight: '700' }}>Chiudi / بستن</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
  );
}
