// pantallas/Busqueda.js
// Historia de usuario: buscar cualquier elemento de la wiki por nombre
import { useState, useEffect } from 'react'
import {
  View, Text, SectionList, TextInput, Image,
  TouchableOpacity, ActivityIndicator, StyleSheet
} from 'react-native'

const API_PERSONAJES = 'https://dragonball-api.com/api/characters?limit=50'
const API_TECNICAS = 'https://dragonball-api.com/api/transformations'

// Mismo array de sagas que en pantallas/Sagas.js
const SAGAS = [
  { id: 1, nombre: 'Saga del Origen (Dragon Ball)', emoji: '🐉' },
  { id: 2, nombre: 'Saga Saiyan', emoji: '👊' },
  { id: 3, nombre: 'Saga de Namek', emoji: '⚡' },
  { id: 4, nombre: 'Saga de los Androides y Celula', emoji: '🧬' },
  { id: 5, nombre: 'Saga de Majin Buu', emoji: '🍬' },
  { id: 6, nombre: 'Saga de la Batalla de los Dioses', emoji: '🐱' },
  { id: 7, nombre: 'Saga del Torneo del Poder', emoji: '🏆' },
]

export default function Busqueda({ navigation }) {
  const [busqueda, setBusqueda] = useState('')
  const [personajes, setPersonajes] = useState([])
  const [tecnicas, setTecnicas] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    cargarDatos()
  }, [])

  async function cargarDatos() {
    try {
      const [respPersonajes, respTecnicas] = await Promise.all([
        fetch(API_PERSONAJES),
        fetch(API_TECNICAS),
      ])
      const datosPersonajes = await respPersonajes.json()
      const datosTecnicas = await respTecnicas.json()
      setPersonajes(datosPersonajes.items || [])
      setTecnicas(datosTecnicas.items || datosTecnicas)
    } catch (error) {
      console.log('Error al cargar datos de busqueda:', error)
    } finally {
      setCargando(false)
    }
  }

  // Si no hay texto de busqueda, no mostramos secciones
  const textoBusqueda = busqueda.trim().toLowerCase()
  const hayBusqueda = textoBusqueda.length > 0

  const personajesFiltrados = hayBusqueda
    ? personajes.filter(p => p.name.toLowerCase().includes(textoBusqueda))
    : []
  const sagasFiltradas = hayBusqueda
    ? SAGAS.filter(s => s.nombre.toLowerCase().includes(textoBusqueda))
    : []
  const tecnicasFiltradas = hayBusqueda
    ? tecnicas.filter(t => t.name.toLowerCase().includes(textoBusqueda))
    : []

  // Armar las secciones solo con los grupos que tienen resultados
  const secciones = []
  if (personajesFiltrados.length > 0) {
    secciones.push({ title: 'Personajes', tipo: 'personaje', data: personajesFiltrados })
  }
  if (sagasFiltradas.length > 0) {
    secciones.push({ title: 'Sagas', tipo: 'saga', data: sagasFiltradas })
  }
  if (tecnicasFiltradas.length > 0) {
    secciones.push({ title: 'Técnicas', tipo: 'tecnica', data: tecnicasFiltradas })
  }

  const totalResultados = personajesFiltrados.length + sagasFiltradas.length + tecnicasFiltradas.length

  function irAResultado(tipo, item) {
    if (tipo === 'personaje') {
      navigation.navigate('Personajes', { screen: 'FichaPersonaje', params: { personaje: item } })
    } else if (tipo === 'saga') {
      navigation.navigate('Sagas', { screen: 'DetalleSaga', params: { saga: item } })
    } else if (tipo === 'tecnica') {
      navigation.navigate('Tecnicas', { screen: 'DetalleTecnica', params: { tecnica: item } })
    }
  }

  if (cargando) {
    return (
      <View style={estilos.centrado}>
        <ActivityIndicator size="large" color="#F59E0B" />
        <Text style={estilos.textoCarga}>Preparando búsqueda global...</Text>
      </View>
    )
  }

  return (
    <View style={estilos.pantalla}>
      <TextInput
        style={estilos.busqueda}
        placeholder="Buscar en toda la wiki..."
        placeholderTextColor="#475569"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {!hayBusqueda && (
        <View style={estilos.centrado}>
          <Text style={{ fontSize: 40, marginBottom: 12 }}>🔍</Text>
          <Text style={estilos.textoVacio}>
            Escribe el nombre de un personaje, saga o técnica
          </Text>
        </View>
      )}

      {hayBusqueda && totalResultados === 0 && (
        <View style={estilos.centrado}>
          <Text style={estilos.textoVacio}>No se encontraron resultados para '{busqueda}'</Text>
        </View>
      )}

      {hayBusqueda && totalResultados > 0 && (
        <SectionList
          sections={secciones}
          keyExtractor={(item, index) => item.id.toString() + index}
          renderSectionHeader={({ section }) => (
            <Text style={estilos.tituloSeccion}>{section.title}</Text>
          )}
          renderItem={({ item, section }) => (
            <TouchableOpacity
              style={estilos.resultado}
              onPress={() => irAResultado(section.tipo, item)}
            >
              {section.tipo === 'saga' ? (
                <Text style={estilos.emojiResultado}>{item.emoji}</Text>
              ) : (
                <Image source={{ uri: item.image }} style={estilos.imagenResultado} resizeMode="contain" />
              )}
              <Text style={estilos.nombreResultado}>
                {section.tipo === 'saga' ? item.nombre : item.name}
              </Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  )
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#0F172A', padding: 16 },
  centrado: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#0F172A', padding: 32,
  },
  textoCarga: { color: '#94A3B8', marginTop: 12, fontSize: 16 },
  textoVacio: { color: '#64748B', fontSize: 14, textAlign: 'center', lineHeight: 20 },
  busqueda: {
    backgroundColor: '#1E293B', borderRadius: 8, padding: 12,
    color: '#E2E8F0', fontSize: 16, borderWidth: 1,
    borderColor: '#334155', marginBottom: 12,
  },
  tituloSeccion: {
    color: '#F59E0B', fontSize: 13, fontWeight: 'bold',
    letterSpacing: 1, textTransform: 'uppercase',
    marginTop: 12, marginBottom: 6,
  },
  resultado: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E293B',
    borderRadius: 8, padding: 10, marginBottom: 6,
    borderWidth: 1, borderColor: '#334155',
  },
  imagenResultado: { width: 36, height: 36, marginRight: 12 },
  emojiResultado: { fontSize: 28, marginRight: 12, width: 36, textAlign: 'center' },
  nombreResultado: { color: '#F1F5F9', fontSize: 14, flex: 1 },
})
