// pantallas/DetalleSaga.js
import { View, Text, ScrollView, StyleSheet } from 'react-native'

export default function DetalleSaga({ route }) {
  // Recibir la saga enviada desde la pantalla Sagas
  const { saga } = route.params

  return (
    <ScrollView style={estilos.pantalla}>

      {/* Header con color de la saga */}
      <View style={[estilos.header, { backgroundColor: saga.color }]}>
        <Text style={estilos.emoji}>{saga.emoji}</Text>
        <Text style={estilos.nombre}>{saga.nombre}</Text>
        <Text style={estilos.anime}>{saga.anime} · {saga.anios}</Text>
        <Text style={estilos.episodios}>{saga.episodios} episodios</Text>
      </View>

      {/* Sinopsis */}
      <View style={estilos.seccion}>
        <Text style={estilos.tituloSeccion}>Sinopsis</Text>
        <Text style={estilos.descripcion}>{saga.descripcion}</Text>
      </View>

      {/* Personajes clave */}
      <View style={estilos.seccion}>
        <Text style={estilos.tituloSeccion}>Personajes clave</Text>
        <View style={estilos.chips}>
          {saga.personajesClave.map((personaje, i) => (
            <View key={i} style={estilos.chip}>
              <Text style={estilos.chipTexto}>{personaje}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Villanos principales */}
      <View style={estilos.seccion}>
        <Text style={estilos.tituloSeccion}>Villanos principales</Text>
        <View style={estilos.chips}>
          {saga.villanosPrincipales.map((villano, i) => (
            <View key={i} style={[estilos.chip, estilos.chipVillano]}>
              <Text style={[estilos.chipTexto, estilos.chipTextoVillano]}>{villano}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#0F172A' },
  header: { padding: 24, alignItems: 'center' },
  emoji: { fontSize: 48, marginBottom: 8 },
  nombre: {
    fontSize: 22, fontWeight: 'bold', color: '#F1F5F9',
    textAlign: 'center', marginBottom: 4,
  },
  anime: { fontSize: 14, color: '#F59E0B', marginBottom: 4 },
  episodios: { fontSize: 13, color: '#94A3B8' },
  seccion: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#1E293B' },
  tituloSeccion: {
    fontSize: 12, fontWeight: 'bold', color: '#64748B',
    letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10,
  },
  descripcion: { fontSize: 14, color: '#CBD5E1', lineHeight: 22 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: '#1E293B', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
    borderWidth: 1, borderColor: '#334155',
  },
  chipVillano: { borderColor: '#EF4444', backgroundColor: '#1C1010' },
  chipTexto: { color: '#94A3B8', fontSize: 13 },
  chipTextoVillano: { color: '#EF4444' },
})
