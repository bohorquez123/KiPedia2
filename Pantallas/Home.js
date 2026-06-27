import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { MotiView } from 'moti'
import { Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'

export default function Home({ navigation }) {

  function irA(tab) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    navigation.navigate(tab)
  }

  return (
    <ScrollView style={estilos.pantalla}>

      {/* Logo y bienvenida */}
      <MotiView
        from={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400 }}
        style={estilos.encabezado}
      >
        <Text style={estilos.logo}>KiPedia 🐉</Text>
        <Text style={estilos.subtitulo}>La enciclopedia del universo Dragon Ball</Text>
      </MotiView>

      {/* Personaje destacado */}
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 500, delay: 150 }}
        style={estilos.destacado}
      >
        <Text style={estilos.tituloDestacado}>Personaje destacado</Text>
        <Image
          source={{ uri: 'https://dragonball-api.com/characters/goku_normal.webp' }}
          style={estilos.imagenDestacada}
          resizeMode="contain"
        />
        <Text style={estilos.nombreDestacado}>Goku</Text>
        <Text style={estilos.razaDestacada}>Saiyan · Protagonista de la saga</Text>
      </MotiView>

      {/* Accesos rapidos */}
      <View style={estilos.accesos}>
        <MotiView
          from={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'timing', duration: 350, delay: 250 }}
        >
          <TouchableOpacity style={estilos.boton} onPress={() => irA('Personajes')}>
            <Ionicons name="people" size={22} color="#F59E0B" />
            <Text style={estilos.textoBoton}>Explorar Personajes</Text>
            <Ionicons name="chevron-forward" size={18} color="#475569" />
          </TouchableOpacity>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'timing', duration: 350, delay: 320 }}
        >
          <TouchableOpacity style={estilos.boton} onPress={() => irA('Sagas')}>
            <Ionicons name="book" size={22} color="#F59E0B" />
            <Text style={estilos.textoBoton}>Ver Sagas</Text>
            <Ionicons name="chevron-forward" size={18} color="#475569" />
          </TouchableOpacity>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'timing', duration: 350, delay: 390 }}
        >
          <TouchableOpacity style={estilos.boton} onPress={() => irA('Tecnicas')}>
            <Ionicons name="flash" size={22} color="#F59E0B" />
            <Text style={estilos.textoBoton}>Catálogo de Técnicas</Text>
            <Ionicons name="chevron-forward" size={18} color="#475569" />
          </TouchableOpacity>
        </MotiView>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  )
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#0F172A' },
  encabezado: { padding: 24, alignItems: 'center' },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#F59E0B', marginBottom: 6 },
  subtitulo: { fontSize: 13, color: '#64748B', textAlign: 'center' },
  destacado: {
    backgroundColor: '#1E293B', borderRadius: 16, margin: 16, padding: 20,
    alignItems: 'center', borderWidth: 1, borderColor: '#334155',
  },
  tituloDestacado: {
    fontSize: 11, fontWeight: 'bold', color: '#64748B',
    letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12,
  },
  imagenDestacada: { width: 140, height: 140, marginBottom: 8 },
  nombreDestacado: { fontSize: 22, fontWeight: 'bold', color: '#F1F5F9' },
  razaDestacada: { fontSize: 13, color: '#94A3B8', marginTop: 2 },
  accesos: { paddingHorizontal: 16 },
  boton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E293B',
    borderRadius: 10, padding: 14, marginBottom: 10,
    borderWidth: 1, borderColor: '#334155',
  },
  textoBoton: { flex: 1, color: '#F1F5F9', fontSize: 15, fontWeight: '600', marginLeft: 12 },
})
