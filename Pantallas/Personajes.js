import { useState, useEffect } from 'react'
import {
  View, Text, FlatList, TextInput,
  TouchableOpacity, ActivityIndicator,
  StyleSheet, Image
} from 'react-native'

const API_URL = 'https://dragonball-api.com/api/characters'

export default function Personajes({ navigation }) {

  // Estado: lista de personajes recibida de la API
  const [personajes, setPersonajes] = useState([])
  // Estado: texto que escribe el usuario en la barra de busqueda
  const [busqueda, setBusqueda] = useState('')
  // Estado: raza seleccionada como filtro ('Todas' por defecto)
  const [filtroRaza, setFiltroRaza] = useState('Todas')
  // Estado: true mientras estamos esperando la respuesta de la API
  const [cargando, setCargando] = useState(true)
  // Estado: mensaje de error si la API falla
  const [error, setError] = useState(null)

  // Razas disponibles para filtrar
  const razas = ['Todas', 'Saiyan', 'Namekian', 'Human', 'Frieza Race', 'Android']

  // Llamar a la API cuando la pantalla aparece
  useEffect(() => {
    cargarPersonajes()
  }, [])

  // Funcion que llama a la API y guarda los personajes en el estado
  async function cargarPersonajes() {
    try {
      setCargando(true)
      setError(null)
      const respuesta = await fetch(`${API_URL}?limit=50&page=1`)
      if (!respuesta.ok) throw new Error('Error al conectar con la API')
      const datos = await respuesta.json()
      setPersonajes(datos.items)
    } catch (err) {
      setError('No se pudo cargar la lista de personajes. Verifica tu conexion.')
    } finally {
      setCargando(false)
    }
  }

  // Filtrar personajes segun busqueda y raza seleccionada
  const personajesFiltrados = personajes.filter(p => {
    const coincideNombre = p.name.toLowerCase().includes(busqueda.toLowerCase())
    const coincideRaza = filtroRaza === 'Todas' || p.race === filtroRaza
    return coincideNombre && coincideRaza
  })

  // Componente para cada tarjeta de personaje en la lista
  function TarjetaPersonaje({ item }) {
    return (
      <TouchableOpacity
        style={estilos.tarjeta}
        onPress={() => navigation.navigate('FichaPersonaje', { personaje: item })}
      >
        <Image
          source={{ uri: item.image }}
          style={estilos.imagen}
          resizeMode="contain"
        />
        <View style={estilos.infoPersonaje}>
          <Text style={estilos.nombrePersonaje}>{item.name}</Text>
          <Text style={estilos.razaPersonaje}>{item.race}</Text>
          <Text style={estilos.afiliacion}>{item.affiliation}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  // Pantalla de carga
  if (cargando) {
    return (
      <View style={estilos.centrado}>
        <ActivityIndicator size="large" color="#F59E0B" />
        <Text style={estilos.textoCarga}>Cargando personajes...</Text>
      </View>
    )
  }

  // Pantalla de error
  if (error) {
    return (
      <View style={estilos.centrado}>
        <Text style={estilos.textoError}>{error}</Text>
        <TouchableOpacity style={estilos.botonReintentar} onPress={cargarPersonajes}>
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
        placeholder="Buscar personaje..."
        placeholderTextColor="#475569"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {/* Filtros de raza */}
      <FlatList
        data={razas}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        style={estilos.filtrosContenedor}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[estilos.chip, filtroRaza === item && estilos.chipActivo]}
            onPress={() => setFiltroRaza(item)}
          >
            <Text style={[estilos.chipTexto, filtroRaza === item && estilos.chipTextoActivo]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Contador de resultados */}
      <Text style={estilos.contador}>
        {personajesFiltrados.length} personaje{personajesFiltrados.length !== 1 ? 's' : ''}
      </Text>

      {/* Lista de personajes o mensaje si no hay resultados */}
      {personajesFiltrados.length === 0 ? (
        <View style={estilos.centrado}>
          <Text style={estilos.textoVacio}>
            No hay personajes con ese nombre o raza.
          </Text>
        </View>
      ) : (
        <FlatList
          data={personajesFiltrados}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <TarjetaPersonaje item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  )
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#0F172A', padding: 16 },
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#0F172A', padding: 20 },
  busqueda: {
    backgroundColor: '#1E293B', borderRadius: 8, padding: 12,
    color: '#E2E8F0', fontSize: 16, borderWidth: 1, borderColor: '#334155',
    marginBottom: 12,
  },
  filtrosContenedor: { marginBottom: 8, flexGrow: 0 },
  chip: {
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20,
    backgroundColor: '#1E293B', marginRight: 8,
    borderWidth: 1, borderColor: '#334155',
  },
  chipActivo: { backgroundColor: '#F59E0B', borderColor: '#F59E0B' },
  chipTexto: { color: '#94A3B8', fontSize: 13 },
  chipTextoActivo: { color: '#0F172A', fontWeight: 'bold' },
  contador: { color: '#475569', fontSize: 12, marginBottom: 8, marginLeft: 2 },
  tarjeta: {
    flexDirection: 'row', backgroundColor: '#1E293B',
    borderRadius: 10, marginBottom: 10, overflow: 'hidden',
    borderWidth: 1, borderColor: '#334155',
  },
  imagen: { width: 80, height: 80, backgroundColor: '#0F172A' },
  infoPersonaje: { flex: 1, padding: 12, justifyContent: 'center' },
  nombrePersonaje: { color: '#F1F5F9', fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  razaPersonaje: { color: '#F59E0B', fontSize: 13, marginBottom: 2 },
  afiliacion: { color: '#64748B', fontSize: 12 },
  textoCarga: { color: '#94A3B8', marginTop: 12, fontSize: 16 },
  textoError: { color: '#F87171', textAlign: 'center', fontSize: 15, marginBottom: 16 },
  textoVacio: { color: '#475569', fontSize: 15, textAlign: 'center' },
  botonReintentar: {
    backgroundColor: '#F59E0B', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8,
  },
  textoBoton: { color: '#0F172A', fontWeight: 'bold', fontSize: 15 },
})
