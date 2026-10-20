import { useState } from 'react'
import './LluviaMargaritas.css'

const CANTIDAD = 14

const aleatorio = (min, max) => Math.random() * (max - min) + min

function crearFlores() {
  return Array.from({ length: CANTIDAD }, (_, i) => ({
    id: i,
    tipo: i % 3 === 0 ? 'petalo' : 'margarita',
    izquierda: aleatorio(0, 95),
    tamanio: aleatorio(16, 30),
    duracion: aleatorio(14, 24),
    retraso: aleatorio(-24, 0),        // negativo = ya están cayendo al abrir
    balanceo: aleatorio(2.5, 5),
    retrasoBalanceo: aleatorio(-5, 0),
    opacidad: aleatorio(0.65, 0.95),
  }))
}

function Margarita() {
  return (
    <svg viewBox="-10 -10 20 20" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse
          key={i}
          cx="0"
          cy="-5"
          rx="2"
          ry="4.5"
          transform={`rotate(${i * 45})`}
          className="lluvia__petalo-margarita"
        />
      ))}
      <circle r="2.6" className="lluvia__centro" />
    </svg>
  )
}

function Petalo() {
  return (
    <svg viewBox="-4 -7 8 14" aria-hidden="true">
      <ellipse rx="3" ry="6" className="lluvia__petalo-suelto" />
    </svg>
  )
}

export default function LluviaMargaritas() {
  const [flores] = useState(crearFlores)

  return (
    <div className="lluvia" aria-hidden="true">
      {flores.map((flor) => (
        <span
          key={flor.id}
          className="lluvia__flor"
          style={{
            left: `${flor.izquierda}%`,
            width: `${flor.tipo === 'petalo' ? flor.tamanio * 0.5 : flor.tamanio}px`,
            height: `${flor.tamanio}px`,
            opacity: flor.opacidad,
            animationDuration: `${flor.duracion}s`,
            animationDelay: `${flor.retraso}s`,
          }}
        >
          <span
            className="lluvia__balanceo"
            style={{
              animationDuration: `${flor.balanceo}s`,
              animationDelay: `${flor.retrasoBalanceo}s`,
            }}
          >
            {flor.tipo === 'petalo' ? <Petalo /> : <Margarita />}
          </span>
        </span>
      ))}
    </div>
  )
}