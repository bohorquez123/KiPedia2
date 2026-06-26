// pantallas/Tecnicas.js
// Historia de usuario: consultar técnicas y transformaciones del universo Dragon Ball
import { useState, useEffect } from 'react'
import {
  View, Text, FlatList, Image, TouchableOpacity,
  TextInput, ActivityIndicator, StyleSheet
} from 'react-native'

const API_URL = 'https://dragonball-api.com/api/transformations'

export default function Tecnicas({ navigation }) {
  const [tecnicas, setTecnicas] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Llamar a la API cuando la pantalla aparece
  useEffect(() => {
    cargarTecnicas()
  }, [])

  async function cargarTecnicas() {
    try {
      setCargando(true)
      setError(null)
      const respuesta = await fetch(API_URL)
      if (!respuesta.ok) throw new Error('Error al cargar tecnicas')
      const datos = await respuesta.json()
      // La API puede devolver datos.items o datos directamente
      setTecnicas(datos.items || datos)
    } catch (err) {
      setError('No se pudieron cargar las tecnicas. Verifica tu conexion.')
    } finally {
      setCargando(false)
    }
  }

  // Filtrar tecnicas segun busqueda en tiempo real
  const tecnicasFiltradas = tecnicas.filter(t =>
    t.name.toLowerCase().includes(busqueda.toLowerCase())
  )

  // Pantalla de carga
  if (cargando) {
    return (
      <View style={estilos.centrado}>
        <ActivityIndicator size="large" color="#F59E0B" />
        <Text style={estilos.textoCarga}>Cargando técnicas...</Text>
        <Text style={[estilos.textoCarga, { fontSize: 12, marginTop: 4 }]}>
          Conectando con la API de Dragon Ball
        </Text>
      </View>
    )
  }

  // Pantalla de error
  if (error) {
    return (
      <View style={estilos.centrado}>
        <Text style={{ fontSize: 40, marginBottom: 16 }}>⚠️</Text>
        <Text style={estilos.textoError}>{error}</Text>
        <TouchableOpacity style={estilos.botonReintentar} onPress={cargarTecnicas}>
          <Text style={estilos.textoBoton}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={estilos.pantalla}>

      {/* Barra de busqueda */}
      <TextInput
        style={estilos.busqueda}
        placeholder="Buscar técnica o transformación..."
        placeholderTextColor="#475569"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {/* Contador de resultados */}
      <Text style={estilos.contador}>
        {tecnicasFiltradas.length} técnica{tecnicasFiltradas.length !== 1 ? 's' : ''}
      </Text>

      {/* Grilla de tecnicas — dos columnas */}
      {tecnicasFiltradas.length === 0 ? (
        <View style={estilos.centrado}>
          <Text style={estilos.textoVacio}>No hay técnicas con ese nombre.</Text>
        </View>
      ) : (
        <FlatList
          data={tecnicasFiltradas}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={estilos.fila}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={estilos.tarjeta}
              onPress={() => navigation.navigate('DetalleTecnica', { tecnica: item })}
            >
              <Image
                source={{ uri: item.image }}
                style={estilos.imagen}
                resizeMode="contain"
              />
              <Text style={estilos.nombre} numberOfLines={2}>{item.name}</Text>
              <Text style={estilos.ki}>Ki: {item.ki || '?'}</Text>
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
  pantalla: { flex: 1, backgroundColor: '#0F172A', padding: 12 },
  centrado: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#0F172A', padding: 20,
  },
  busqueda: {
    backgroundColor: '#1E293B', borderRadius: 8, padding: 12,
    color: '#E2E8F0', fontSize: 16, borderWidth: 1,
    borderColor: '#334155', marginBottom: 10,
  },
  contador: { color: '#475569', fontSize: 12, marginBottom: 10, marginLeft: 2 },
  fila: { justifyContent: 'space-between' },
  tarjeta: {
    backgroundColor: '#1E293B', borderRadius: 10, padding: 12,
    width: '48%', marginBottom: 10, alignItems: 'center',
    borderWidth: 1, borderColor: '#334155',
  },
  imagen: { width: 90, height: 90, marginBottom: 8 },
  nombre: {
    color: '#F1F5F9', fontSize: 13, fontWeight: 'bold',
    textAlign: 'center', marginBottom: 4,
  },
  ki: { color: '#F59E0B', fontSize: 11 },
  textoCarga: { color: '#94A3B8', marginTop: 12, fontSize: 16 },
  textoError: { color: '#F87171', textAlign: 'center', fontSize: 15, marginBottom: 16 },
  textoVacio: { color: '#475569', fontSize: 15, textAlign: 'center' },
  botonReintentar: {
    backgroundColor: '#F59E0B', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8,
  },
  textoBoton: { color: '#0F172A', fontWeight: 'bold', fontSize: 15 },
})
