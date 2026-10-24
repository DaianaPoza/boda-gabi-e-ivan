import fondo from '../../assets/portada-fondo.webp'
import './Portada.css'

export default function Portada({ abierta, onEnter }) {
  return (
    <section className={`portada ${abierta ? 'portada--abierta' : ''}`}>
      <div
        className="portada__fondo"
        style={{ backgroundImage: `url(${fondo})` }}
      />

      <div className="portada__contenido">
       <p className="texto manuscrita fade-up delay-1">
  Algo muy lindo está por comenzar
</p>

        <h1 className="nombres portada__nombres fade-up delay-2">
          Gaby e Iván
        </h1>

      <p className="texto manuscrita fade-up delay-3">
  Y queremos compartirlo con vos.
</p>

        <button
          type="button"
          className="boton portada__boton fade-up delay-4"
          onClick={onEnter}
        >
          Bienvenidos
          
        </button>
      </div>
    </section>
  )
}