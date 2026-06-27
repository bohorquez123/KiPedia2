import { MotiView } from 'moti'

// children: el contenido real de la tarjeta (la tarjeta de personaje, saga, etc.)
// index: la posicion del elemento en la lista, usado para calcular el retraso
export default function TarjetaAnimada({ children, index = 0 }) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: 'timing',
        duration: 350,
        delay: Math.min(index * 50, 400), // tope de 400ms para listas largas
      }}
    >
      {children}
    </MotiView>
  )
}
