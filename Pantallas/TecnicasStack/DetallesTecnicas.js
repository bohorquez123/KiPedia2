import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'

export default function DetalleTecnica({ route }) {
  // Recibir la tecnica enviada desde la pantalla Tecnicas
  const { tecnica } = route.params

  return (
    <ScrollView style={estilos.pantalla}>

      {/* Imagen grande de la transformacion */}
      <View style={estilos.header}>
        <Image
          source={{ uri: tecnica.image }}
          style={estilos.imagen}
          resizeMode="contain"
        />
      </View>

      {/* Nombre y stats */}
      <View style={estilos.seccion}>
        <Text style={estilos.nombre}>{tecnica.name}</Text>
        <View style={estilos.filaStat}>
          <Text style={estilos.labelStat}>Nivel de Ki:</Text>
          <Text style={estilos.valorStat}>{tecnica.ki || 'Desconocido'}</Text>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#0F172A' },
  header: {
    backgroundColor: '#1E293B', alignItems: 'center',
    paddingVertical: 32, borderBottomWidth: 2, borderBottomColor: '#F59E0B',
  },
  imagen: { width: 200, height: 200 },
  seccion: { padding: 20 },
  nombre: { fontSize: 26, fontWeight: 'bold', color: '#F59E0B', marginBottom: 16 },
  filaStat: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#1E293B',
  },
  labelStat: { color: '#64748B', fontSize: 15 },
  valorStat: { color: '#E2E8F0', fontSize: 15, fontWeight: '600' },
})
