import { useState, useEffect, useRef } from 'react'
import {
  View, Text, FlatList, TextInput,
  TouchableOpacity, ActivityIndicator,
  StyleSheet, Image
} from 'react-native'
import SkeletonTarjeta from '../../Componentes/SkeletonTarjeta'
import TarjetaAnimada from '../../Componentes/TarjetaAnimada'
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
  const [paginaActual, setPaginaActual] = useState(1)
  const [hayMasPaginas, setHayMasPaginas] = useState(true)
  const [cargandoMas, setCargandoMas] = useState(false)


  // Llamar a la API cuando la pantalla aparece
  useEffect(() => {
    cargarPersonajes()
  }, [])

  // Funcion que llama a la API y guarda los personajes en el estado
  async function cargarPersonajes(pagina = 1) {
  try {
    if (pagina === 1) { setCargando(true) } else { setCargandoMas(true) }
    setError(null)
    const respuesta = await fetch(`${API_URL}?limit=20&page=${pagina}`)
    if (!respuesta.ok) throw new Error('Error al conectar con la API')
    const datos = await respuesta.json()
    if (pagina === 1) {
      setPersonajes(datos.items)
    } else {
      setPersonajes(prev => [...prev, ...datos.items]) // agregar a la lista existente
    }
    setHayMasPaginas(pagina < datos.meta.totalPages)
    setPaginaActual(pagina)
  } catch (err) {
    setError('No se pudo cargar la lista de personajes.')
  } finally {
    setCargando(false)
    setCargandoMas(false)
  }
}

// Agrega esta funcion para cargar la siguiente pagina:
function cargarMas() {
  if (!cargandoMas && hayMasPaginas) {
    cargarPersonajes(paginaActual + 1)
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

  if (cargando) {
  return (
    <View style={estilos.pantalla}>
      {[1, 2, 3, 4, 5, 6].map(i => (
        <SkeletonTarjeta key={i} />
      ))}
    </View>
  )
}


// Reemplaza el bloque 'if (error)' por este:
if (error) {
  return (
    <View style={estilos.centrado}>
      <Text style={{ fontSize: 40, marginBottom: 16 }}>⚠️</Text>
      <Text style={estilos.textoError}>{error}</Text>
      <Text style={[estilos.textoError, { fontSize: 12, marginTop: 8 }]}>
        Verifica tu conexion a internet
      </Text>
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
         
          renderItem={({ item, index }) => (
         <TarjetaAnimada index={index}>
         <TarjetaPersonaje item={item} />
         </TarjetaAnimada>
         )}

          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          onEndReached={cargarMas}
          onEndReachedThreshold={0.5}
          ListFooterComponent={cargandoMas ?
             <ActivityIndicator color="#F59E0B" style={{ padding: 16 }} /> : null}

        />
      )}
    </View>
  )
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: 'rgb(20, 33, 61)', padding: 16 },
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#03204f', padding: 2 },
  busqueda: {
    backgroundColor: 'rgb(255, 140, 0)', borderRadius: 8, padding: 12,
    color: '#E2E8F0', fontSize: 16, borderWidth: 1, borderColor: '#334155',
    marginBottom: 12,
  },
  filtrosContenedor: { marginBottom: 8, flexGrow: 0 },
  chip: {
    paddingHorizontal: 14, paddingVertical: 14, borderRadius: 20,
    backgroundColor: '#03204f', marginRight: 8,
    borderWidth: 1, borderColor: '#03204f',
  },
  chipActivo: { backgroundColor: '#F59E0B', borderColor: '#2a284d' },
  chipTexto: { color: '#94A3B8', fontSize: 15 },
  chipTextoActivo: { color: '#0F172A', fontWeight: 'bold' },
  contador: { color: '#475569', fontSize: 15, marginBottom: 6, marginLeft: 8 },
  tarjeta: {
    flexDirection: 'row', backgroundColor: 'rgb(30, 40, 75)',
    borderRadius: 10, marginBottom: 10, overflow: 'hidden',
    borderWidth: 1, borderColor: '#334155',
  },
  imagen: { width: 80, height: 80, backgroundColor: '#141a23' },
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
