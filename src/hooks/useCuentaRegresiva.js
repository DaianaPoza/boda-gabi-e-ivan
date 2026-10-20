import { useEffect, useState } from 'react'

function calcularTiempo(fechaObjetivo) {
  const diferencia = fechaObjetivo.getTime() - Date.now()
  if (diferencia <= 0) return null

  return {
    dias: Math.floor(diferencia / 86400000),
    horas: Math.floor((diferencia / 3600000) % 24),
    minutos: Math.floor((diferencia / 60000) % 60),
    segundos: Math.floor((diferencia / 1000) % 60),
  }
}

export default function useCuentaRegresiva(fechaObjetivo) {
  const [tiempo, setTiempo] = useState(() => calcularTiempo(fechaObjetivo))

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempo(calcularTiempo(fechaObjetivo))
    }, 1000)
    return () => clearInterval(intervalo)
  }, [fechaObjetivo])

  return tiempo
}