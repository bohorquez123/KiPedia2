import { View, StyleSheet } from 'react-native'
import { MotiView } from 'moti'

// Una sola barra animada con efecto de brillo pulsante
function Barra({ ancho, alto }) {
  return (
    <MotiView
      style={[estilos.barra, { width: ancho, height: alto }]}
      from={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{
        type: 'timing',
        duration: 800,
        loop: true,
        repeatReverse: true,
      }}
    />
  )
}

// Skeleton con forma de tarjeta de personaje (imagen + dos lineas de texto)
export default function SkeletonTarjeta() {
  return (
    <View style={estilos.tarjeta}>
      <Barra ancho={80} alto={80} />
      <View style={estilos.textos}>
        <Barra ancho={'70%'} alto={16} />
        <View style={{ height: 8 }} />
        <Barra ancho={'40%'} alto={12} />
      </View>
    </View>
  )
}

const estilos = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row', backgroundColor: '#1E293B',
    borderRadius: 10, marginBottom: 10, padding: 12,
    borderWidth: 1, borderColor: '#334155',
  },
  textos: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  barra: { backgroundColor: '#334155', borderRadius: 6 },
})
