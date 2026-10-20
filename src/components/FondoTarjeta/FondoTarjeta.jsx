import fondo from '../../assets/fondo-tarjeta.webp'
import './FondoTarjeta.css'

export default function FondoTarjeta() {
  return (
    <div className="fondo-tarjeta" aria-hidden="true">
      <div
        className="fondo-tarjeta__imagen"
        style={{ backgroundImage: `url(${fondo})` }}
      />
      <div className="fondo-tarjeta__luz" />
    </div>
  )
}