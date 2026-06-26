import { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CLAVE_STORAGE = 'kipedia_favoritos'

// Crear el contexto
const FavoritosContext = createContext()

// Componente Provider que envuelve toda la app
export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([])
  const [cargando, setCargando] = useState(true)

  // Cargar favoritos guardados cuando la app inicia
  useEffect(() => {
    cargarFavoritos()
  }, [])

  async function cargarFavoritos() {
    try {
      const guardados = await AsyncStorage.getItem(CLAVE_STORAGE)
      if (guardados) {
        setFavoritos(JSON.parse(guardados))
      }
    } catch (error) {
      console.log('Error al cargar favoritos:', error)
    } finally {
      setCargando(false)
    }
  }

  // Guardar el array completo en AsyncStorage cada vez que cambia
  async function guardarEnStorage(nuevaLista) {
    try {
      await AsyncStorage.setItem(CLAVE_STORAGE, JSON.stringify(nuevaLista))
    } catch (error) {
      console.log('Error al guardar favoritos:', error)
    }
  }

  // Verificar si un personaje ya esta en favoritos
  function esFavorito(personajeId) {
    return favoritos.some(p => p.id === personajeId)
  }

  // Agregar o quitar un personaje de favoritos
  function alternarFavorito(personaje) {
    let nuevaLista
    if (esFavorito(personaje.id)) {
      nuevaLista = favoritos.filter(p => p.id !== personaje.id)
    } else {
      nuevaLista = [...favoritos, personaje]
    }
    setFavoritos(nuevaLista)
    guardarEnStorage(nuevaLista)
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, cargando, esFavorito, alternarFavorito }}>
      {children}
    </FavoritosContext.Provider>
  )
}

// Hook personalizado para usar el contexto facilmente
export function useFavoritos() {
  return useContext(FavoritosContext)
}
