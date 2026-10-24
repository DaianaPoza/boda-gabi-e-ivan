import { useState } from 'react'
import useReveal from '../../hooks/useReveal'
import './Regalos.css'

const ALIAS = 'boda.ivanygabi'
const TITULAR = 'María Gabriela Piñeiro'

// Copia el texto (con alternativa para celulares viejos)
async function copiarTexto(texto) {
  try {
    await navigator.clipboard.writeText(texto)
  } catch {
    const campo = document.createElement('textarea')
    campo.value = texto
    document.body.appendChild(campo)
    campo.select()
    document.execCommand('copy')
    document.body.removeChild(campo)
  }
}

export default function Regalos() {
  const ref = useReveal()
  const [visible, setVisible] = useState(false)
  const [copiado, setCopiado] = useState(false)

  const handleCopiar = async () => {
    await copiarTexto(ALIAS)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <section ref={ref} className="seccion regalos">
      <span className="regalos__icono aparecer delay-1" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M3 9h18v4H3zM5 13v8h14v-8M12 9v12M12 9c-1.5-3-5-4-6-2s2 2 6 2zM12 9c1.5-3 5-4 6-2s-2 2-6 2z" />
        </svg>
      </span>

      <h2 className="titulo aparecer delay-1">Regalos</h2>

   <p className="texto manuscrita regalos__texto aparecer delay-2">
  ¡Nos hace mucha ilusión <br /> celebrar con vos!
</p>
<p className="texto manuscrita regalos__texto aparecer delay-2">
  Si querés tener un detalle <br /> con nosotros, te dejamos <br /> nuestro alias
</p>

      <button
        type="button"
        className="boton aparecer delay-3"
        onClick={() => setVisible(!visible)}
        aria-expanded={visible}
      >
        {visible ? 'Ocultar alias' : 'Ver alias'}
      </button>

      <div className={`regalos__desplegable ${visible ? 'regalos__desplegable--abierto' : ''}`}>
        <div className="regalos__interior">
          <div className="regalos__tarjeta">
            <span className="regalos__cinta" aria-hidden="true" />

            <p className="texto-chico regalos__etiqueta">Alias</p>

          <div className="regalos__fila-alias">
  <span className="regalos__alias">{ALIAS}</span>
  <button
    type="button"
    className="boton regalos__copiar"
    onClick={handleCopiar}
  >
    {copiado ? '¡Copiado!' : 'Copiar'}
  </button>
</div>

            <p className="texto-chico regalos__etiqueta regalos__etiqueta--titular">
              Titular
            </p>
            <p className="texto manuscrita regalos__titular">{TITULAR}</p>
          </div>
        </div>
      </div>
    </section>
  )
}